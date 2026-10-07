#!/usr/bin/env python3
"""Render every page in English with headless Chrome and report untranslated keys.

Needs `pnpm dev` running.  Usage: python3 tools/verify_pages.py [base-url]
"""
import json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = (sys.argv[1] if len(sys.argv) > 1 else "http://localhost:5173").rstrip("/")
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# keys deliberately left in Spanish: brand marks, social handles, the logo glyph
ALLOWED = re.compile(
    r"^(Eddie Would Go|Eddie<br>Would<br>Go|<strong>The Eddie</strong>|The Eddie|"
    r"@eddiewouldgo|@eddiewgpolicy|Instagram|Podcast|X / Twitter|- @eddiewouldgopolicy|"
    r"EWG Policy|PDF|Tres urnas para la primavera|Las Urnas Contra las Encuestas|"
    r"<span style=\"display:inline-flex.*|<a class=\"twitter-timeline\".*|"
    r"<a href=\"/\" class=\"nav-logo\">.*|"
    r"<a href=\"#\">Twitter</a>.*|<a href=\"https://x\.com.*)$"
)

pages = [("index", "/"), ("informes", "/informes.html"), ("sobre-nosotros", "/sobre-nosotros.html")] + [
    (f[:-5], "/articles/" + f)
    for f in sorted(os.listdir(os.path.join(ROOT, "articles"))) if f.endswith(".html")
]

total_bad = 0
for slug, path in pages:
    url = f"{BASE}{path}?lang=en&i18ndebug=1"
    dom = subprocess.run(
        [CHROME, "--headless=new", "--disable-gpu", "--no-sandbox",
         "--virtual-time-budget=9000", "--dump-dom", url],
        capture_output=True, text=True, timeout=120).stdout

    m = re.search(r'<script id="i18n-misses" type="application/json">(.*?)</script>', dom, re.S)
    if not m:
        print(f"{slug:42s} !! i18n never ran")
        total_bad += 1
        continue

    misses = [x for x in json.loads(m.group(1)) if not ALLOWED.match(x)]
    spanish = re.search(r'lang="en"', dom) is not None
    status = "ok" if not misses else f"{len(misses)} MISSING"
    print(f"{slug:42s} {status}{'' if spanish else '  (lang attr not set!)'}")
    for x in misses[:6]:
        print("      -", x[:110])
    total_bad += len(misses)

print(f"\n{'ALL PAGES CLEAN' if total_bad == 0 else str(total_bad) + ' untranslated key(s)'}")
sys.exit(1 if total_bad else 0)
