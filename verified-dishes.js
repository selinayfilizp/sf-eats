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

  // TODO: research the remaining catalog dishes against the live spot list
  // once `generate-data.js` has run (it needs billing enabled). Use the exact
  // most-likely-top spots the generator returns, then follow MENTIONS-METHOD.md.
};
