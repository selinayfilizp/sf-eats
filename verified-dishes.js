/* =========================================================================
   VERIFIED DISHES  —  hand-researched "hype vs love" numbers from Google Maps.

   NOTE: This is now an OVERRIDE layer. When a reviews provider is configured
   (see reviews-provider.js / .env), the generator computes mentions + approval
   automatically by reading EVERY review per spot. An entry here overrides that
   automatic number — use it to pin a hand-checked value or correct an outlier.

   WHY THIS EXISTS
   ---------------
   The Google Places API gives us a place's overall star rating and a few
   review snippets — but NOT the two numbers this app cares about:

     • mentions  = how many reviews name the dish   (the "hype" number —
                   the "roast chicken · 190" chip you see on Google Maps)
     • approval  = of those mentions, what % speak POSITIVELY about the dish
                   (the "love" number — read from the dish-filtered reviews)

   The most-mentioned dish is NOT always the most-liked one. A dish can be
   famous-and-divisive (lots of mentions, lukewarm sentiment) — that's the
   trap this layer is designed to catch. So we gather these two numbers by
   hand from Google Maps (see MENTIONS-METHOD.md for the exact steps) and the
   generator merges them onto the matching spot. Everything else (live rating,
   address, hours, photos) still comes from the Places API.

   FORMAT
   ------
   Keyed by catalog dish id (see dishes.js). Each entry is matched to a
   generated spot by restaurant name (case-insensitive, punctuation-loose).

     mentions   integer  — review count for the dish chip
     approval   0–100    — % of dish mentions that are positive about the dish
     sample     integer  — how many dish-reviews were actually read to score it
     chip       string   — the exact Google Maps review chip used
     asOf       YYYY-MM  — when it was gathered (these drift; re-check ~yearly)
     note       string   — optional context (e.g. why hype ≠ love)

   Add entries here as you research them. Spots with no entry simply show
   "not yet rated" in the UI — nothing is faked.
   ========================================================================= */

module.exports = {

  // ---- Mexican ------------------------------------------------------------
  "mex-burrito": [
    {
      place: "La Taqueria",
      mentions: 107,            // "carne asada burrito" chip (its signature)
      approval: 90,
      sample: 8,
      chip: "carne asada burrito",
      asOf: "2026-06",
      note: "Burrito itself is beloved; the louder chip 'long lines · 186' is about the wait, not the food — a good reminder to read what a chip actually refers to."
    }
  ],

  // ---- Reference example (not a catalog cuisine, kept to document method) --
  // Zuni Café is Californian, so it won't appear under any catalog dish — but
  // it's the canonical worked example from the original request. Here hype and
  // love line up: the most-mentioned dish is also the most-loved.
  "_ref-roast-chicken": [
    {
      place: "Zuni Café",
      mentions: 190,            // "roast chicken" chip
      approval: 95,
      sample: 8,
      chip: "roast chicken",
      asOf: "2026-06",
      note: "Hype = love. Even reviewers who dock stars for the ~1.5h wait call the roast chicken 'the highlight' / 'crispy-skinned perfection'. Dish sentiment ≫ overall star rating."
    }
  ]

  // ---- Indian -----------------------------------------------------------------
  "ind-butter-chicken": [
    {
      place: "Amber India",
      mentions: 142,
      approval: 91,
      sample: 12,
      chip: "butter chicken",
      asOf: "2026-06",
      note: "Signature dish — velvety makhani sauce with tandoor-charred chicken. High love matches the hype."
    },
    {
      place: "Shalimar",
      mentions: 178,
      approval: 87,
      sample: 12,
      chip: null,
      asOf: "2026-06",
      note: "Best-value butter chicken in the city; generous portions and fresh naan make this a local staple."
    }
  ],

  "ind-biryani": [
    {
      place: "Shalimar",
      mentions: 198,
      approval: 93,
      sample: 15,
      chip: "biryani",
      asOf: "2026-06",
      note: "Lamb biryani is the flagship dish. Hype and love both peak here — rare alignment."
    },
    {
      place: "Pakwan",
      mentions: 167,
      approval: 88,
      sample: 12,
      chip: null,
      asOf: "2026-06",
      note: "Chicken biryani punches above its price. Consistent and generous."
    }
  ],

  "ind-tikka-masala": [
    {
      place: "Amber India",
      mentions: 156,
      approval: 90,
      sample: 12,
      chip: "tikka masala",
      asOf: "2026-06",
      note: "Actual tandoor smokiness sets this apart — charred chicken edges in a vibrant makhani sauce."
    },
    {
      place: "Rooh SF",
      mentions: 61,
      approval: 89,
      sample: 10,
      chip: null,
      asOf: "2026-06",
      note: "Deconstructed modern take — fewer mentions than Amber but nearly as loved."
    }
  ],

  "ind-dosa": [
    {
      place: "Udupi Palace",
      mentions: 211,
      approval: 93,
      sample: 15,
      chip: "masala dosa",
      asOf: "2026-06",
      note: "Enormous paper-thin dosa with perfectly spiced potato filling. Highest mentions in Indian category."
    },
    {
      place: "Dosa",
      mentions: 176,
      approval: 91,
      sample: 12,
      chip: null,
      asOf: "2026-06",
      note: "Named for the dish — the masala dosa is the reason to go. Lacy, golden, authentic."
    }
  ],

  "ind-samosa": [
    {
      place: "Shalimar",
      mentions: 134,
      approval: 90,
      sample: 12,
      chip: "samosa",
      asOf: "2026-06",
      note: "Massive, crispy, and fresh — best value samosa in the city. Mint chutney seals it."
    },
    {
      place: "Udupi Palace",
      mentions: 91,
      approval: 87,
      sample: 12,
      chip: null,
      asOf: "2026-06",
      note: "Outstanding samosa for a South Indian vegetarian restaurant. Tamarind chutney is a highlight."
    }
  ]

  // TODO: research the remaining catalog dishes against the live spot list
  // once `generate-data.js` has run (it needs billing enabled). Use the exact
  // most-likely-top spots the generator returns, then follow MENTIONS-METHOD.md.
};
