# Hype vs. Love — how the two numbers are sourced

The app shows two signals per spot, because the **most-mentioned dish is not always the most-liked one**:

- **🗣 Mentions** — how many reviews name the dish. This is the "hype" number, the
  `roast chicken · 190` chip you see on a Google Maps listing.
- **💛 Loved** — of those mentions, the share that speak *positively about the dish*.
  This is the "love" number, read from the dish-filtered reviews.

The Google Places API exposes neither chip counts nor per-dish sentiment (it caps at 5
reviews per place). There are two ways to source the two numbers:

## Method A — automatic, reads ALL reviews (recommended)

`reviews-provider.js` pulls the **full** review list for each spot from a reviews data
provider (SerpAPI by default), filters to the reviews that mention the dish, and computes:

- `mentions` = number of reviews that name the dish
- `approval` = % of those rated **4★ or 5★** — scored over *every* mention, no sampling
- `sample`   = mentions (we read all of them)

Setup: add `SERPAPI_KEY` (and optionally `REVIEWS_PROVIDER`, `REVIEWS_MAX`,
`APPROVAL_MIN_STARS`) to `.env`, then:

```
node test-reviews.js <place_id> "carne asada" burrito   # cheap sanity check, one place
node generate-data.js                                    # full run; fills every spot
```

Cost: providers charge per request (often a fraction of a cent); `REVIEWS_MAX` caps pages
per place so a full run stays cheap.

Provider options: `REVIEWS_PROVIDER=serpapi` (default) or `outscraper` — both return
the full review list; pick whichever you have a key for.

### How approval is scored (`APPROVAL_MODE`)

Each dish-mentioning review is judged positive/negative, and approval = % positive. There
are three modes because the overall star and the dish sentiment don't always agree:

- `hybrid` (default) — reads the sentence(s) that mention the dish (`sentiment.js`, with
  negation handling) and uses that when it's clearly positive or negative; falls back to
  the star rating when the dish text is neutral. **This reflects how loved the *dish* is,
  not just the place.** A 3★ review that calls the dish "crispy perfection" counts as
  approval; a 4★ review that calls it "just okay, nothing special" does not.
- `text` — purely the dish-sentence sentiment.
- `stars` — purely the overall rating ≥ `APPROVAL_MIN_STARS` (objective, ignores dish text).

`test-reviews.js` prints all three side by side so you can see how much they diverge for a
given spot before committing to a mode.

## Method B — manual, by hand from Google Maps (fallback / override)

Used when you have no provider key, or to pin/correct a specific value in
`verified-dishes.js` (a manual entry overrides the automatic number). Steps:

1. Open the restaurant on Google Maps (desktop or mobile) → **Reviews** tab.
2. Below the rating histogram is a row of **dish/topic chips**, each with a count, e.g.
   `carne asada burrito · 107`. **Read what the chip refers to** — some loudest chips are
   not dishes (`long lines · 186`, `cash only · 38`) and should be ignored.
3. The **mention count** for the dish = the number on its chip. Record it.
4. **Click the chip** to filter reviews to only those naming the dish.
5. Read the filtered reviews and judge each one's sentiment *about the dish* (not the
   overall star — a 3★ review can still call the dish "the highlight"). Record:
   - `approval` = % of the read reviews that are positive about the dish
   - `sample`   = how many you actually read (be honest; 8–20 is a reasonable sample)
6. Add an entry to `verified-dishes.js` under the matching catalog dish id.

## Why approval ≠ stars

At Zuni Café, several reviewers dock a star for the ~1.5-hour wait but still call the
roast chicken "the highlight" / "crispy-skinned perfection." Scoring the *dish* sentiment
(not the overall rating) is the whole point — it's what separates a genuinely loved dish
from a merely famous one.

## Worked examples (gathered Jun 2026)

| Restaurant   | Dish (chip)            | 🗣 Mentions | 💛 Loved | Read |
|--------------|------------------------|------------:|---------:|-----:|
| Zuni Café    | roast chicken          | 190         | ~95%     | 8    |
| La Taqueria  | carne asada burrito    | 107         | ~90%     | 8    |

Both are "hype = love" cases. The trap to watch for is the opposite: a high mention
count with a low approval — the app flags those automatically with a ⚠️ banner.

## Refresh cadence

Chip counts and sentiment drift. Re-check entries roughly yearly (the `asOf` field tracks
when each was gathered). Spots with no entry simply show "not yet rated" — nothing is faked.
