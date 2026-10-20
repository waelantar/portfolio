import tempfile
import unittest
from pathlib import Path

from scripts.publication_guard import inspect_tree


class PublicationGuardTests(unittest.TestCase):
    def test_clean_tree(self):
        with tempfile.TemporaryDirectory() as tmp:
            Path(tmp, "README.md").write_text("A reviewed public page.\n", encoding="utf-8")
            self.assertEqual(inspect_tree(Path(tmp)), [])

    def test_flags_secret_and_private_file_without_returning_secret(self):
        with tempfile.TemporaryDirectory() as tmp:
            secret = "sk" + "-or-" + "A" * 24  # Synthetic value, never a real credential.
            Path(tmp, ".env").write_text(secret, encoding="utf-8")
            private_dir = Path(tmp, "contract")
            private_dir.mkdir()
            Path(private_dir, "notes.txt").write_text("synthetic", encoding="utf-8")
            findings = inspect_tree(Path(tmp))
            rules = {rule for rule, _ in findings}
            self.assertIn("environment-file", rules)
            self.assertIn("OpenRouter-key", rules)
            self.assertIn("private-source-directory", rules)
            self.assertNotIn(secret, repr(findings))

    def test_flags_private_workflow_disclosure_without_echoing_text(self):
        phrases = (
            "job" + "-hunt",
            "job" + " search",
            "application" + " tracker",
            "looking" + " for a job",
            "open" + " to work",
            "recruit" + "er",
        )
        with tempfile.TemporaryDirectory() as tmp:
            page = Path(tmp, "page.md")
            for phrase in phrases:
                with self.subTest(phrase=phrase):
                    page.write_text(phrase, encoding="utf-8")
                    findings = inspect_tree(Path(tmp))
                    self.assertIn("private-workflow-disclosure", {rule for rule, _ in findings})
                    self.assertNotIn(phrase, repr(findings))

    def test_flags_absolute_home_path(self):
        with tempfile.TemporaryDirectory() as tmp:
            home_path = "C:" + "/" + "Users/example/work/file.txt"
            Path(tmp, "page.md").write_text(home_path, encoding="utf-8")
            self.assertIn("Windows-home-path", {rule for rule, _ in inspect_tree(Path(tmp))})

    def test_changed_reviewed_portrait_is_blocked(self):
        with tempfile.TemporaryDirectory() as tmp:
            image = Path(tmp, "apps/web/public/images/wael-antar-portrait.webp")
            image.parent.mkdir(parents=True)
            image.write_bytes(b"replacement image pending review")
            self.assertIn(
                "reviewed-binary-changed",
                {rule for rule, _ in inspect_tree(Path(tmp))},
            )

    def test_flags_opaque_asset_for_review(self):
        with tempfile.TemporaryDirectory() as tmp:
            Path(tmp, "unreviewed.bin").write_bytes(bytes([0xFF, 0x00, 0xFE]))
            self.assertIn(
                "binary-or-unknown-encoding-needs-review",
                {rule for rule, _ in inspect_tree(Path(tmp))},
            )


if __name__ == "__main__":
    unittest.main()
