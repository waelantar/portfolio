"""Catch obvious private files and credential strings before a public push.

This is a heuristic preflight, not a confidentiality or security certification.
It prints rule names and relative file paths, never the matched content.
"""

from __future__ import annotations

import argparse
import os
import re
import sys
from pathlib import Path


SKIP_DIRS = {".git", "node_modules", ".next", ".cache", ".turbo", "coverage", "__pycache__", ".venv"}
BLOCKED_PARTS = {"contract", "contracts", "mailbox", "private", "secrets", "records"}
BLOCKED_NAMES = {".npmrc", "id_rsa", "id_ed25519", "credentials.json", "service-account.json"}
BLOCKED_SUFFIXES = {".pem", ".p12", ".pfx", ".sqlite", ".sqlite3", ".db"}
MAX_FILE_BYTES = 2_000_000

# Assemble token prefixes so this scanner does not flag its own source text.
CONTENT_RULES = {
    "OpenRouter-key": re.compile(re.escape("sk" + "-or-") + r"[A-Za-z0-9_-]{12,}"),
    "GitHub-token": re.compile(re.escape("gh" + "p_") + r"[A-Za-z0-9]{20,}"),
    "GitHub-fine-grained-token": re.compile(re.escape("github" + "_pat_") + r"[A-Za-z0-9_]{20,}"),
    "private-key-block": re.compile("-" * 5 + r"BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY" + "-" * 5),
    "Windows-home-path": re.compile(r"[A-Za-z]:[\\/]+Users[\\/]+[^\\/\s]+", re.IGNORECASE),
    "Unix-home-path": re.compile(r"/(?:Users|home)/[^/\s]+/"),
}


def inspect_tree(root: Path) -> list[tuple[str, str]]:
    findings: list[tuple[str, str]] = []
    for directory, dirnames, filenames in os.walk(root, followlinks=False):
        kept_dirs = []
        for dirname in sorted(dirnames):
            path = Path(directory, dirname)
            if dirname.lower() in SKIP_DIRS:
                continue
            if path.is_symlink():
                findings.append(("symlink-needs-review", path.relative_to(root).as_posix()))
                continue
            kept_dirs.append(dirname)
        dirnames[:] = kept_dirs
        for filename in sorted(filenames):
            path = Path(directory, filename)
            rel = path.relative_to(root)
            if path.is_symlink():
                findings.append(("symlink-needs-review", rel.as_posix()))
                continue

            name = path.name.lower()
            parts = {part.lower() for part in rel.parts[:-1]}
            if name == ".env" or (name.startswith(".env.") and name != ".env.example"):
                findings.append(("environment-file", rel.as_posix()))
            if name in BLOCKED_NAMES or path.suffix.lower() in BLOCKED_SUFFIXES:
                findings.append(("sensitive-file-type", rel.as_posix()))
            if parts & BLOCKED_PARTS:
                findings.append(("private-source-directory", rel.as_posix()))

            try:
                size = path.stat().st_size
            except OSError:
                findings.append(("unreadable-file", rel.as_posix()))
                continue
            if size > MAX_FILE_BYTES:
                findings.append(("large-file-needs-manual-review", rel.as_posix()))
                continue
            try:
                content = path.read_text(encoding="utf-8")
            except (UnicodeDecodeError, OSError):
                findings.append(("binary-or-unknown-encoding-needs-review", rel.as_posix()))
                continue
            if any(ord(char) < 32 and char not in "\t\r\n" for char in content):
                findings.append(("binary-or-unknown-encoding-needs-review", rel.as_posix()))
                continue
            for rule, pattern in CONTENT_RULES.items():
                if pattern.search(content):
                    findings.append((rule, rel.as_posix()))
    return findings


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--tree", type=Path, default=Path(__file__).resolve().parents[1])
    args = parser.parse_args()
    root = args.tree.resolve()
    if not root.is_dir():
        print("Publication guard: tree does not exist", file=sys.stderr)
        return 2
    findings = inspect_tree(root)
    if findings:
        for rule, path in findings:
            print(f"{rule}: {path}")
        print(f"Publication guard: {len(findings)} finding(s); review before publication.")
        return 1
    print("Publication guard: no obvious findings. Human review is still required.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
