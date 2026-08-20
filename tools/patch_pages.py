#!/usr/bin/env python3
"""Wire i18n/i18n.js into every page.

Idempotent: the injected regions are delimited by markers, so re-running
replaces them rather than stacking copies.
"""
import os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

HEAD = """  <!-- i18n:head -->
  <style>html.i18n-loading body{visibility:hidden}</style>
  <script>try{var q=new URLSearchParams(location.search).get('lang');var l=(q==='en'||q==='es')?q:localStorage.getItem('ewg-lang');if(l==='en')document.documentElement.className+=' i18n-loading';}catch(e){}</script>
  <!-- /i18n:head -->
"""

TAIL = """  <!-- i18n:script -->
  <script src="/i18n/i18n.js" defer></script>
  <!-- /i18n:script -->
"""

HEAD_RE = re.compile(r"[ \t]*<!-- i18n:head -->.*?<!-- /i18n:head -->[ \t]*\n", re.S)
TAIL_RE = re.compile(r"[ \t]*<!-- i18n:script -->.*?<!-- /i18n:script -->[ \t]*\n", re.S)
# the first, marker-less version of the injection
LEGACY = re.compile(
    r"[ \t]*<!-- i18n: hide the page[^\n]*\n"
    r"[ \t]*<style>html\.i18n-loading[^\n]*\n"
    r"[ \t]*<script>try\{if\(localStorage[^\n]*\n"
    r"|[ \t]*<script src=\"/i18n/i18n\.js\" defer></script>[ \t]*\n"
)

files = [os.path.join(ROOT, "index.html")] + [
    os.path.join(ROOT, "articles", f)
    for f in sorted(os.listdir(os.path.join(ROOT, "articles"))) if f.endswith(".html")
]

for path in files:
    src = original = open(path, encoding="utf-8").read()
    src = HEAD_RE.sub("", src)
    src = TAIL_RE.sub("", src)
    src = LEGACY.sub("", src)

    m = re.search(r'^[ \t]*<meta name="viewport"[^>]*>[ \t]*\n', src, re.M) or \
        re.search(r"^[ \t]*<meta charset=[^>]*>[ \t]*\n", src, re.M)
    if not m:
        raise SystemExit("no <meta> anchor in " + path)
    src = src[:m.end()] + HEAD + src[m.end():]

    if "</body>" not in src:
        raise SystemExit("no </body> in " + path)
    src = re.sub(r"([ \t]*</body>)", TAIL + r"\1", src, count=1)

    if src != original:
        open(path, "w", encoding="utf-8").write(src)
        print("patched:", os.path.relpath(path, ROOT))
    else:
        print("unchanged:", os.path.relpath(path, ROOT))
