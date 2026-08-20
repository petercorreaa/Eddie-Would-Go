#!/usr/bin/env python3
"""Extract the translatable units of every page.

The walk here mirrors walk()/isLeaf()/norm() in i18n/i18n.js exactly: whatever
key this script emits is the key the browser will look up at runtime. If you
change one, change the other.

Usage:  python3 tools/extract.py [outdir]
"""
import json, os, re, sys
from bs4 import BeautifulSoup, NavigableString, Tag
from bs4.formatter import HTMLFormatter
from bs4.dammit import EntitySubstitution


class SourceOrder(HTMLFormatter):
    """bs4 sorts attributes alphabetically; innerHTML in the browser keeps the
    source order. Without this the keys for any multi-attribute tag never match."""

    def attributes(self, tag):
        return list(tag.attrs.items())


# entity_substitution must be passed explicitly: a bare HTMLFormatter() escapes
# nothing, while the browser escapes & < > when serialising innerHTML.
FMT = SourceOrder(entity_substitution=EntitySubstitution.substitute_xml)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "tools", "extracted")

BLOCK = {"p","h1","h2","h3","h4","h5","h6","li","blockquote","div","section","article",
         "aside","header","footer","nav","main","ul","ol","figure","figcaption",
         "td","th","tr","table","thead","tbody","form","hr"}
MEDIA = {"img","iframe","svg","script","style","video","audio","canvas","picture","source"}
MEDIA_TAGS = MEDIA | {"br"}
ATTRS = ["alt", "title", "placeholder", "aria-label"]
VOID = "br|hr|img|input|source|wbr|col|embed|area|base|link|meta|param|track"


def norm(s):
    s = str(s).replace("&nbsp;", " ").replace(" ", " ")
    return " ".join(s.split())


def canon(html):
    """Match the browser's innerHTML serialisation of void elements."""
    return re.sub(r"<(" + VOID + r")((?:\s[^>]*?)?)\s*/>", r"<\1\2>", html)


def inner(el):
    parts = []
    for c in el.contents:
        if isinstance(c, Tag):
            parts.append(c.decode(formatter=FMT))
        elif type(c) is NavigableString:
            # output_ready(), not str(): the browser escapes & < > inside text
            # nodes when serialising innerHTML, and str() would not.
            parts.append(c.output_ready(formatter=FMT))
        else:
            parts.append(str(c))
    return canon("".join(parts))


def is_leaf(el):
    for d in el.find_all(True):
        if d.name in BLOCK or d.name in MEDIA:
            return False
    return True


def has_words(s):
    return bool(re.search(r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ¿¡]", s))


def collect(path):
    soup = BeautifulSoup(open(path, encoding="utf-8").read(), "html.parser")

    title = norm(soup.title.get_text()) if soup.title else ""
    for t in soup.find_all(["script", "style"]):
        t.decompose()

    units, seen = [], set()

    def add(s):
        s = norm(s)
        if s and s not in seen and has_words(s):
            seen.add(s)
            units.append(s)

    def walk(el):
        for child in [c for c in el.children if isinstance(c, Tag)]:
            if child.name in MEDIA_TAGS:
                continue
            if is_leaf(child):
                add(inner(child))
                continue
            walk(child)
        for n in el.children:
            # `type is` on purpose: Comment/Doctype subclass NavigableString but
            # are not text nodes, and the browser walk never sees them.
            if type(n) is NavigableString and norm(n):
                add(str(n))

    body = soup.body or soup
    walk(body)

    attrs, aseen = [], set()
    for el in soup.find_all(True):
        for a in ATTRS:
            v = el.get(a)
            if v and norm(v) not in aseen and has_words(norm(v)):
                aseen.add(norm(v))
                attrs.append(norm(v))

    return {"title": title, "units": units, "attrs": attrs}


def main():
    os.makedirs(OUT, exist_ok=True)
    files = ["index.html"] + sorted(
        "articles/" + f for f in os.listdir(os.path.join(ROOT, "articles")) if f.endswith(".html")
    )
    total = 0
    for f in files:
        data = collect(os.path.join(ROOT, f))
        slug = "index" if f == "index.html" else os.path.basename(f)[:-5]
        with open(os.path.join(OUT, slug + ".json"), "w", encoding="utf-8") as fh:
            json.dump(data, fh, ensure_ascii=False, indent=1)
        w = sum(len(re.sub(r"<[^>]+>", " ", u).split()) for u in data["units"])
        total += w
        print(f"{slug:42s} units={len(data['units']):4d} attrs={len(data['attrs']):3d} words={w}")
    print(f"{'TOTAL':42s} words={total}")


if __name__ == "__main__":
    main()
