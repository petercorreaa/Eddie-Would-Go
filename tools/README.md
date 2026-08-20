# Language toggle (ES / EN)

Spanish lives in the HTML and stays the source of truth. English is applied at
runtime from JSON dictionaries, so no page is duplicated.

```
i18n/i18n.js          the runtime: builds the ES|EN toggle, swaps the text
i18n/en/_common.json  chrome shared by every page (nav, footer, back link)
i18n/en/<slug>.json   generated per-page dictionary the browser fetches
tools/extract.py      pulls the translatable units out of every page
tools/en_raw/         the English, authored as index-aligned arrays
tools/build_translations.py   en_raw + extracted -> i18n/en/
tools/patch_pages.py  wires i18n.js into every page (idempotent)
tools/verify_pages.py renders every page in English, reports anything missed
tools/roundtrip-test.html     ES -> EN -> ES must restore the DOM exactly
```

## How the matching works

There are no translation ids in the markup. The runtime walks the DOM, and for
every "leaf block" (an element with no block-level or media descendant) it uses
the whitespace-normalised `innerHTML` as the lookup key.

`tools/extract.py` mirrors that walk exactly so the keys it emits are the keys
the browser will look up. **If you change the walk in one, change it in the
other.** Three serialisation details had to be matched by hand, and all three
are load-bearing:

- attributes keep source order (bs4 sorts them by default)
- void elements serialise as `<br>`, not `<br/>`
- `&`, `<`, `>` are escaped inside text nodes, and `&nbsp;` normalises to a space

## Adding or editing an article

```bash
python3 tools/patch_pages.py          # only needed for a brand-new page
python3 tools/extract.py              # refresh tools/extracted/
# edit tools/en_raw/<slug>.json — same order and length as extracted; use
# null for anything that should stay in Spanish (brand names, @handles)
python3 tools/build_translations.py   # errors out if the lengths drift
python3 tools/verify_pages.py         # needs `pnpm dev` running
```

Translations are authored **by position**, not by key, so a mistyped key can
never silently orphan a string — `build_translations.py` fails loudly if the
array length no longer matches the source.

`extract.py` needs `beautifulsoup4`; `verify_pages.py` needs Google Chrome.

## Notes

- Preference is stored in `localStorage` under `ewg-lang`; `?lang=en` overrides
  it and makes English links shareable.
- A tiny inline script in each `<head>` hides the body only while a saved
  English preference is being applied, so there is no flash of Spanish.
- `?i18ndebug=1` dumps every unmatched key into `<script id="i18n-misses">`.
