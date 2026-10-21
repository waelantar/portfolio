"""Audit the static export and write deterministic Netlify response headers.

This rejects common active-content paths and hashes the export's exact inline
scripts. It cannot replace a browser check or a response-header check on a
deployed preview. Findings contain paths and rule names, not matched content.
"""

from __future__ import annotations

import argparse
import base64
import hashlib
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from xml.etree import ElementTree

from scripts.publication_guard import inspect_tree


BLOCKED_ELEMENTS = {"base", "embed", "form", "iframe", "object"}
URL_ATTRIBUTES = {"href", "src", "action", "formaction", "xlink:href"}
SOURCE_SUFFIXES = {".js", ".jsx", ".ts", ".tsx"}
SOURCE_PATTERNS = {
    "raw-html-insertion": re.compile("dangerously" + "SetInnerHTML|\\.innerHTML\\b"),
    "dynamic-code-execution": re.compile(r"\beval\s*\(|\bnew\s+Function\s*\("),
}
HEADER_FIELDS = (
    ("X-Content-Type-Options", "nosniff"),
    ("Referrer-Policy", "strict-origin-when-cross-origin"),
    ("X-Frame-Options", "DENY"),
    ("Permissions-Policy", "camera=(), microphone=(), geolocation=()"),
)


def unsafe_url(value: str) -> bool:
    normalized = re.sub(r"[\x00-\x20]+", "", value).lower()
    return normalized.startswith(("javascript:", "vbscript:", "data:text/html", "//"))


class PageAudit(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.findings: set[str] = set()
        self.inline_scripts: list[str] = []
        self.script_attributes: list[dict[str, str]] = []
        self._script_open = False
        self._script_parts: list[str] = []
        self._current_script_attributes: dict[str, str] = {}

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        tag = tag.lower()
        attributes = {key.lower(): value or "" for key, value in attrs}
        if len(attributes) != len(attrs):
            self.findings.add("duplicate-html-attribute")
        if tag in BLOCKED_ELEMENTS:
            self.findings.add("active-html-element")
        if tag == "meta" and attributes.get("http-equiv", "").lower() == "refresh":
            self.findings.add("automatic-redirect")
        for key, value in attributes.items():
            if key.startswith("on") or key == "srcdoc":
                self.findings.add("inline-event-or-document")
            if key in URL_ATTRIBUTES and unsafe_url(value):
                self.findings.add("unsafe-url")
        if tag == "script":
            source = attributes.get("src")
            if source is not None and (not source.startswith("/") or source.startswith("//")):
                self.findings.add("external-script")
            if source is not None and source != "/theme-init.js" and not re.fullmatch(
                r"/_next/static/chunks/[A-Za-z0-9_./-]+\.js", source
            ):
                self.findings.add("unreviewed-script-source")
            if source is not None and ".." in source.split("/"):
                self.findings.add("script-path-traversal")
            if source is None:
                self._script_open = True
                self._script_parts = []
                self._current_script_attributes = attributes

    def handle_data(self, data: str) -> None:
        if self._script_open:
            self._script_parts.append(data)

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.handle_starttag(tag, attrs)
        self.handle_endtag(tag)

    def handle_endtag(self, tag: str) -> None:
        if tag.lower() == "script" and self._script_open:
            self.inline_scripts.append("".join(self._script_parts))
            self.script_attributes.append(self._current_script_attributes)
            self._script_open = False
            self._script_parts = []
            self._current_script_attributes = {}


def expected_inline_script(script: str, attrs: dict[str, str]) -> bool:
    if attrs.get("id") == "_R_":
        return script.startswith('(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push(')
    if attrs.get("id"):
        return False
    return script == "(self.__next_f=self.__next_f||[]).push([0])" or script.startswith(
        'self.__next_f.push([1,"'
    )


def audit_svg(content: str) -> set[str]:
    if "<!DOCTYPE" in content.upper():
        return {"svg-doctype"}
    try:
        root = ElementTree.fromstring(content)
    except ElementTree.ParseError:
        return {"malformed-svg"}
    findings: set[str] = set()
    for element in root.iter():
        tag = element.tag.rsplit("}", 1)[-1].lower()
        if tag in BLOCKED_ELEMENTS | {"script", "foreignobject"}:
            findings.add("active-svg-element")
        for key, value in element.attrib.items():
            key = key.rsplit("}", 1)[-1].lower()
            if key.startswith("on") or (key in URL_ATTRIBUTES and unsafe_url(value)):
                findings.add("active-svg-attribute")
    return findings


def audit_source(source_root: Path) -> list[tuple[str, str]]:
    findings: list[tuple[str, str]] = []
    for path in sorted(source_root.rglob("*")):
        if not path.is_file() or path.suffix.lower() not in SOURCE_SUFFIXES:
            continue
        if any(part in {"node_modules", ".next", "out"} for part in path.parts):
            continue
        relative = path.relative_to(source_root).as_posix()
        try:
            content = path.read_text(encoding="utf-8")
        except (OSError, UnicodeDecodeError):
            findings.append(("unreadable-source", relative))
            continue
        for rule, pattern in SOURCE_PATTERNS.items():
            if pattern.search(content):
                findings.append((rule, relative))
    return findings


def audit_artifact(out_root: Path) -> tuple[list[tuple[str, str]], set[str]]:
    findings = inspect_tree(out_root)
    hashes: set[str] = set()
    html_files = sorted(out_root.rglob("*.html"))
    if not html_files:
        findings.append(("missing-html", "."))
    for path in html_files:
        relative = path.relative_to(out_root).as_posix()
        page = PageAudit()
        try:
            page.feed(path.read_text(encoding="utf-8"))
            page.close()
        except (OSError, UnicodeDecodeError):
            findings.append(("unreadable-html", relative))
            continue
        findings.extend((rule, relative) for rule in sorted(page.findings))
        for script, attributes in zip(page.inline_scripts, page.script_attributes):
            if not expected_inline_script(script, attributes):
                findings.append(("unexpected-inline-script", relative))
                continue
            digest = hashlib.sha256(script.encode("utf-8")).digest()
            hashes.add("'sha256-" + base64.b64encode(digest).decode("ascii") + "'")
    for path in sorted(out_root.rglob("*.svg")):
        relative = path.relative_to(out_root).as_posix()
        try:
            content = path.read_text(encoding="utf-8")
        except (OSError, UnicodeDecodeError):
            findings.append(("unreadable-svg", relative))
            continue
        findings.extend((rule, relative) for rule in sorted(audit_svg(content)))
    return findings, hashes


def headers_for(hashes: set[str]) -> str:
    if not hashes:
        raise ValueError("No inline scripts found; review the export before changing the policy")
    script_sources = " ".join(["'self'", *sorted(hashes)])
    policy = "; ".join(
        (
            "default-src 'none'",
            "base-uri 'none'",
            "object-src 'none'",
            "frame-ancestors 'none'",
            "form-action 'none'",
            "script-src " + script_sources,
            "script-src-attr 'none'",
            "style-src 'self' 'unsafe-inline'",
            "style-src-attr 'unsafe-inline'",
            "img-src 'self' data:",
            "font-src 'self' data:",
            "connect-src 'self'",
            "frame-src 'none'",
            "worker-src 'none'",
            "upgrade-insecure-requests",
        )
    )
    lines = ["/*", "  Content-Security-Policy: " + policy]
    lines.extend("  " + name + ": " + value for name, value in HEADER_FIELDS)
    return "\n".join(lines) + "\n"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--write", action="store_true", help="Write the checked _headers file")
    args = parser.parse_args()
    repo = args.repo.resolve()
    source = repo / "apps" / "web"
    out = source / "out"
    if not source.is_dir() or not out.is_dir():
        print("Static security: source or export is missing", file=sys.stderr)
        return 2
    findings = audit_source(source)
    artifact_findings, hashes = audit_artifact(out)
    findings.extend(artifact_findings)
    if findings:
        for rule, path in findings:
            print(f"{rule}: {path}")
        print(f"Static security: {len(findings)} finding(s); review before publication.")
        return 1
    try:
        expected = headers_for(hashes)
    except ValueError as error:
        print(f"Static security: {error}", file=sys.stderr)
        return 1
    target = out / "_headers"
    if args.write:
        target.write_text(expected, encoding="utf-8")
    elif not target.is_file() or target.read_text(encoding="utf-8") != expected:
        print("Static security: generated response headers are missing or stale")
        return 1
    print(f"Static security: {len(list(out.rglob('*.html')))} HTML files checked; response headers match export.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
