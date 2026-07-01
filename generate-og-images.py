#!/usr/bin/env python3
"""OG image generator — writes og/<dishId>.png (1200x630) for every dish.

Matches the site's dark share-card look: dark bg, subtle grid, accent bar,
dish name big, top-3 spots below. Run after generate-data.js:

    python3 generate-og-images.py
"""
import json
import os
import re

from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
W, H = 1200, 630
BG = (26, 26, 26)
CREAM = (245, 240, 232)
FONT = "/System/Library/Fonts/Helvetica.ttc"


def blend(c, alpha, bg=BG):
    """Pre-blend a color against the background — ImageDraw doesn't composite alpha."""
    return tuple(round(b + (x - b) * alpha / 255) for x, b in zip(c, bg))

ACCENTS = {
    "mexican": (138, 110, 58), "italian": (74, 110, 58), "turkish": (58, 90, 110),
    "indian": (138, 90, 42), "chinese": (110, 58, 58), "japanese": (90, 58, 110),
    "korean": (110, 90, 58), "vietnamese": (58, 110, 90),
}


def load_data():
    src = open(os.path.join(HERE, "sf-food-data.js"), encoding="utf-8").read()
    m = re.search(r"window\.SF_FOOD_DATA\s*=\s*(\{.*\})\s*;?\s*$", src, re.S)
    return json.loads(m.group(1))["cuisines"]


def font(size, bold=False):
    return ImageFont.truetype(FONT, size, index=1 if bold else 0)


def fit_title(draw, text, max_width, start=88, floor=44):
    size = start
    while size > floor:
        f = font(size, bold=True)
        if draw.textlength(text, font=f) <= max_width:
            return f
        size -= 4
    return font(floor, bold=True)


def make_card(dish, cuisine_label, accent):
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)

    for x in range(0, W, 40):
        d.line([(x, 0), (x, H)], fill=blend((255, 255, 255), 14), width=1)
    for y in range(0, H, 40):
        d.line([(0, y), (W, y)], fill=blend((255, 255, 255), 14), width=1)

    d.rectangle([0, 0, W, 5], fill=accent)

    brand = font(20, bold=True)
    d.text((60, 52), "SF EATS", font=brand, fill=blend(CREAM, 150))
    tag = font(16)
    d.text((60, 82), cuisine_label.upper(), font=tag, fill=accent)

    label = font(22)
    d.text((60, 190), "THE BEST", font=label, fill=blend(CREAM, 110))

    title_f = fit_title(d, dish["name"], W - 120)
    d.text((56, 226), dish["name"], font=title_f, fill=CREAM)

    sub = font(24)
    d.text((60, 360), "in San Francisco — ranked by what reviewers actually love",
           font=sub, fill=blend(CREAM, 130))

    spots = [s["name"] for s in dish.get("spots", [])[:3]]
    y = 452
    num_f = font(18, bold=True)
    spot_f = font(26)
    for i, name in enumerate(spots):
        d.text((60, y + 4), f"{i + 1:02d}", font=num_f, fill=accent)
        d.text((104, y), name, font=spot_f, fill=blend(CREAM, 220))
        y += 44

    d.text((W - 60, H - 46), "SFEATS.VERCEL.APP", font=font(16, bold=True),
           fill=blend(CREAM, 90), anchor="ra")

    return img


def main():
    out = os.path.join(HERE, "og")
    os.makedirs(out, exist_ok=True)
    cuisines = load_data()
    n = 0
    for cid, cu in cuisines.items():
        accent = ACCENTS.get(cid, (110, 110, 110))
        for dish in cu["dishes"]:
            make_card(dish, cu["label"], accent).save(
                os.path.join(out, f"{dish['id']}.png"), optimize=True)
            n += 1
    print(f"Wrote {n} OG images to og/")


if __name__ == "__main__":
    main()
