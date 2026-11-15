"""Dependency-free checks for the static Neo Systems website."""

from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse
import sys


ROOT = Path(__file__).resolve().parents[1]
FAILURES: list[str] = []


class PageAudit(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.title = False
        self.local_references: list[tuple[str, str]] = []
        self.images_without_alt: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        if tag == "title":
            self.title = True
        if tag == "img" and "alt" not in values:
            self.images_without_alt.append(values.get("src", "<unknown image>"))
        for attribute in ("href", "src"):
            value = values.get(attribute)
            if value:
                self.local_references.append((attribute, value))


def local_target(page: Path, value: str) -> Path | None:
    parsed = urlparse(value)
    if parsed.scheme or parsed.netloc or value.startswith(("mailto:", "tel:", "data:", "#")):
        return None
    path = unquote(parsed.path)
    if not path:
        return None
    return (ROOT / path.lstrip("/")) if value.startswith("/") else (page.parent / path)


def check_page(page: Path) -> None:
    audit = PageAudit()
    audit.feed(page.read_text(encoding="utf-8"))
    relative = page.relative_to(ROOT)
    if not audit.title:
        FAILURES.append(f"{relative}: missing <title>.")
    for source in audit.images_without_alt:
        FAILURES.append(f"{relative}: image without alt text: {source}")
    for _, value in audit.local_references:
        target = local_target(page, value)
        if target is not None and not target.exists():
            FAILURES.append(f"{relative}: missing local reference: {value}")


def main() -> int:
    pages = sorted(ROOT.glob("*.html"))
    if not pages:
        print("No HTML pages found.")
        return 1
    for page in pages:
        check_page(page)
    if FAILURES:
        print("Static-site checks failed:")
        print("\n".join(f"- {failure}" for failure in FAILURES))
        return 1
    print(f"Static-site checks passed for {len(pages)} HTML pages.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
