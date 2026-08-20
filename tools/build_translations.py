#!/usr/bin/env python3
"""Turn index-aligned English arrays into the runtime dictionaries.

  tools/extracted/<slug>.json   <- source units (from extract.py)
  tools/en_raw/<slug>.json      <- {"title":..., "units":[...], "attrs":[...]}
                                   same order/length; null = leave in Spanish
  i18n/en/<slug>.json           <- generated lookup the browser fetches

Authoring by position means a translation can never be silently orphaned by a
mistyped key: length and coverage are checked here instead.
"""
import json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "tools", "extracted")
RAW = os.path.join(ROOT, "tools", "en_raw")
DST = os.path.join(ROOT, "i18n", "en")


def build(slug, strict=True):
    src = json.load(open(os.path.join(SRC, slug + ".json"), encoding="utf-8"))
    raw_path = os.path.join(RAW, slug + ".json")
    if not os.path.exists(raw_path):
        return None
    raw = json.load(open(raw_path, encoding="utf-8"))

    for field in ("units", "attrs"):
        if len(raw.get(field, [])) != len(src[field]):
            raise SystemExit(
                f"{slug}: {field} length mismatch — source has {len(src[field])}, "
                f"translation has {len(raw.get(field, []))}. Re-run extract.py and realign."
            )

    u = {s: t for s, t in zip(src["units"], raw["units"]) if t is not None}
    a = {s: t for s, t in zip(src["attrs"], raw["attrs"]) if t is not None}
    out = {"title": raw.get("title") or None, "u": u, "a": a}

    os.makedirs(DST, exist_ok=True)
    with open(os.path.join(DST, slug + ".json"), "w", encoding="utf-8") as fh:
        json.dump(out, fh, ensure_ascii=False, indent=1)

    missing = sum(1 for t in raw["units"] if t is None)
    return len(u), len(src["units"]), missing


def main():
    slugs = sorted(f[:-5] for f in os.listdir(SRC) if f.endswith(".json"))
    done = pending = 0
    for slug in slugs:
        r = build(slug)
        if r is None:
            print(f"{slug:42s} -- no translation yet")
            pending += 1
            continue
        got, total, missing = r
        flag = "" if missing == 0 else f"  ({missing} left in Spanish)"
        print(f"{slug:42s} {got}/{total}{flag}")
        done += 1
    print(f"\n{done} translated, {pending} pending")


if __name__ == "__main__":
    main()
