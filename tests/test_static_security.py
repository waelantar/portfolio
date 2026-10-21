import tempfile
import unittest
from pathlib import Path

from scripts.static_security import audit_artifact, audit_source, audit_svg, headers_for


class StaticSecurityTests(unittest.TestCase):
    def test_rejects_active_html_and_unexpected_inline_script(self):
        with tempfile.TemporaryDirectory() as tmp:
            out = Path(tmp)
            (out / "index.html").write_text(
                '<a href="javascript:alert(1)">open</a>'
                '<img src="/a.png" onerror="alert(1)" />'
                '<a href="/safe" href="javascript:alert(1)">duplicate</a>'
                '<meta http-equiv="refresh" content="0;url=/elsewhere" />'
                '<script src="/extra.js"></script>'
                '<script>alert(1)</script>',
                encoding="utf-8",
            )
            findings, _ = audit_artifact(out)
            rules = {rule for rule, _ in findings}
            self.assertIn("unsafe-url", rules)
            self.assertIn("inline-event-or-document", rules)
            self.assertIn("unexpected-inline-script", rules)
            self.assertIn("automatic-redirect", rules)
            self.assertIn("unreviewed-script-source", rules)
            self.assertIn("duplicate-html-attribute", rules)

    def test_hashes_only_expected_export_scripts(self):
        with tempfile.TemporaryDirectory() as tmp:
            out = Path(tmp)
            (out / "index.html").write_text(
                '<script>(self.__next_f=self.__next_f||[]).push([0])</script>',
                encoding="utf-8",
            )
            findings, hashes = audit_artifact(out)
            self.assertEqual(findings, [])
            headers = headers_for(hashes)
            self.assertIn("Content-Security-Policy: ", headers)
            self.assertIn("'sha256-", headers)
            self.assertNotIn("script-src 'self' 'unsafe-inline'", headers)

    def test_rejects_active_svg(self):
        self.assertIn(
            "active-svg-element",
            audit_svg('<svg xmlns="http://www.w3.org/2000/svg"><script /></svg>'),
        )

    def test_rejects_raw_html_and_dynamic_code_in_web_source(self):
        with tempfile.TemporaryDirectory() as tmp:
            source = Path(tmp)
            (source / "page.tsx").write_text(
                "const x = dangerouslySetInnerHTML; eval('x');",
                encoding="utf-8",
            )
            self.assertEqual(
                {rule for rule, _ in audit_source(source)},
                {"raw-html-insertion", "dynamic-code-execution"},
            )


if __name__ == "__main__":
    unittest.main()
