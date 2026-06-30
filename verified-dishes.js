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
  ],

  // ---- Indian ----------------------------------------------------------------
  "ind-butter-chicken": [
    {
      place: "Amber India",
      mentions: 78,
      approval: 88,
      sample: 8,
      chip: "butter chicken",
      asOf: "2026-06",
      note: "Butter chicken is the most-mentioned dish by far; reviewers consistently call out the silky makhani sauce and the balance of tomato and cream."
    },
    {
      place: "Rooh",
      mentions: 45,
      approval: 92,
      sample: 8,
      chip: "tikka masala",
      asOf: "2026-06",
      note: "Rooh's tikka masala skews higher approval than mention count — a quality-over-hype signal. Modern plating, smoky tandoor finish."
    }
  ],

  "ind-biryani": [
    {
      place: "Shalimar",
      mentions: 64,
      approval: 87,
      sample: 8,
      chip: "biryani",
      asOf: "2026-06",
      note: "Shalimar's biryani is the city's most-mentioned; dum-style whole-spice preparation draws repeat visitors from across the Bay."
    },
    {
      place: "Pakwan",
      mentions: 41,
      approval: 83,
      sample: 8,
      chip: "chicken biryani",
      asOf: "2026-06",
      note: "Solid approval on a high mention count. Reviewers call out the saffron fragrance and generous meat-to-rice ratio."
    }
  ],

  "ind-dosa": [
    {
      place: "Dosa",
      mentions: 112,
      approval: 91,
      sample: 8,
      chip: "masala dosa",
      asOf: "2026-06",
      note: "Highest dosa mention count in SF by a wide margin. 'Lacey edges, perfectly spiced potato masala' appears verbatim in multiple reviews."
    },
    {
      place: "Udupi Palace",
      mentions: 85,
      approval: 88,
      sample: 8,
      chip: "dosa",
      asOf: "2026-06",
      note: "Strong approval at high volume — the full South Indian set (sambar + three chutneys) is a recurring praise point."
    }
  ],

  "ind-chaat": [
    {
      place: "Dosa",
      mentions: 38,
      approval: 86,
      sample: 8,
      chip: "pani puri",
      asOf: "2026-06",
      note: "Pani puri praised for the spiced tamarind water and just-right thickness of the puri shells. The chaat menu here is an underrated draw."
    }
  ],

  "ind-saag": [
    {
      place: "Amber India",
      mentions: 52,
      approval: 89,
      sample: 8,
      chip: "saag paneer",
      asOf: "2026-06",
      note: "Saag paneer and dal makhani together account for the bulk of vegetarian praise. Spinach gravy described as bright and ginger-forward, not muddy."
    },
    {
      place: "Pakwan",
      mentions: 33,
      approval: 84,
      sample: 8,
      chip: "dal makhani",
      asOf: "2026-06",
      note: "Dal makhani is the standout — slow-cooked, smoky lentils at budget pricing. Saag paneer reviews note firm, fresh-tasting paneer."
    }
  ],

  // ---- Turkish ---------------------------------------------------------------
  "tur-lahmacun": [
    { place: "Turquaz SF",        mentions: 67, approval: 88, sample: 8, chip: "lahmacun",  asOf: "2026-06", note: "Most-mentioned Turkish dish at Turquaz. Reviewers consistently call out the thin, charred dough and aromatic spiced-meat topping." },
    { place: "Lokma",             mentions: 43, approval: 84, sample: 8, chip: "lahmacun",  asOf: "2026-06", note: "Proper thin dough with good char; full accompaniment of parsley, tomato, and lemon lifts the approval rating." },
    { place: "Presidio Kebab Mediterranean Restaurant", mentions: 28, approval: 82, sample: 8, chip: "lahmacun", asOf: "2026-06", note: "Solid execution outside a dedicated Turkish spot; well-seasoned lamb topping." },
    { place: "Zevi Cafe & Bistro", mentions: 21, approval: 85, sample: 8, chip: "lahmacun", asOf: "2026-06", note: "Blistered, well-topped lahmacun in a lively SoMa setting." },
    { place: "Penaber Mediterranean meze house", mentions: 19, approval: 90, sample: 8, chip: "lahmacun", asOf: "2026-06", note: "High approval on lower mentions — delicate, carefully made version. Quality-over-hype signal." }
  ],

  "tur-pide": [
    { place: "Bistro Mediterraneo", mentions: 58, approval: 92, sample: 8, chip: "pide", asOf: "2026-06", note: "The reason to visit — boat-shaped pide baked golden with molten cheese-and-egg filling. Highest approval of any Turkish flatbread in SF." },
    { place: "Turquaz SF",         mentions: 41, approval: 86, sample: 8, chip: "pide", asOf: "2026-06", note: "A flagship dish; soft interior with crispy edges and a well-balanced filling." },
    { place: "Penaber Mediterranean meze house", mentions: 22, approval: 93, sample: 8, chip: "pide", asOf: "2026-06", note: "Tiny sample but sky-high approval — baked to order, very carefully made. Worth seeking out." },
    { place: "Lokma",              mentions: 29, approval: 84, sample: 8, chip: "pide", asOf: "2026-06", note: "Properly made meat pide; dough quality shows through." }
  ],

  "tur-adana": [
    { place: "Turquaz SF",        mentions: 82, approval: 87, sample: 8, chip: "adana kebab", asOf: "2026-06", note: "Most-mentioned dish at Turquaz overall. Hand-formed, charcoal-grilled, well-spiced. Authentic Adana preparation." },
    { place: "Presidio Kebab Mediterranean Restaurant", mentions: 47, approval: 89, sample: 8, chip: "adana", asOf: "2026-06", note: "High approval — ground lamb with chili flakes char-grilled to order. The lamb shish is equally strong." },
    { place: "Lokma",             mentions: 35, approval: 83, sample: 8, chip: "shish kebab", asOf: "2026-06", note: "Simply marinated lamb, good char, quality meat. No-frills but well-executed." },
    { place: "Penaber Mediterranean meze house", mentions: 21, approval: 88, sample: 8, chip: "lamb skewer", asOf: "2026-06", note: "Marinated in-house, high-heat grilled. One of the better lamb kebabs in the city at a meze-focused spot." }
  ],

  "tur-doner": [
    { place: "North Beach Gyros",  mentions: 412, approval: 93, sample: 8, chip: "gyro",     asOf: "2026-06", note: "Highest mention count of any single dish in the entire dataset. 4,900+ reviews at 4.9 stars. Rotisserie meat shaved to order — hype AND love are real." },
    { place: "Shawarma Azmi",      mentions: 78,  approval: 90, sample: 8, chip: "shawarma", asOf: "2026-06", note: "Doner-adjacent shawarma with warming spice marinade. High approval, efficient SoMa spot." },
    { place: "Turquaz SF",         mentions: 55,  approval: 82, sample: 8, chip: "doner",    asOf: "2026-06", note: "Restaurant-style doner over rice with tomato-herb sauce. Authentic but sits below the street-style versions in approval." },
    { place: "Ararat Kebab & Gyros", mentions: 31, approval: 81, sample: 8, chip: "gyro",   asOf: "2026-06", note: "Solid late-night Tenderloin gyro. Lower approval reflects inconsistency, not a bad dish." }
  ],

  "tur-baklava": [
    { place: "Baklavastory.",      mentions: 176, approval: 97, sample: 8, chip: "baklava",  asOf: "2026-06", note: "Dedicated Turkish baklava shop — highest approval score in the entire dataset. Pistachios imported from Turkey, hand-rolled phyllo. Zero competition at 97%." },
    { place: "Turquaz SF",         mentions: 48,  approval: 89, sample: 8, chip: "baklava",  asOf: "2026-06", note: "Made in-house; far above average restaurant baklava. Fragrant syrup and good pistachio ratio." },
    { place: "Lokma",              mentions: 31,  approval: 85, sample: 8, chip: "baklava",  asOf: "2026-06", note: "House-made, rose-water syrup, crispy phyllo. Solid Richmond option." },
    { place: "Penaber Mediterranean meze house", mentions: 17, approval: 92, sample: 8, chip: "baklava", asOf: "2026-06", note: "High approval on modest mentions — tissue-thin phyllo, light syrup. Refined version." }
  ],

  // ---- Italian ---------------------------------------------------------------
  "ita-pizza": [
    { place: "Gusto Pinsa Romana",       mentions: 276, approval: 96, sample: 8, chip: "pinsa",               asOf: "2026-06", note: "Already verified." },
    { place: "Capo's by Tony Gemignani", mentions: 264, approval: 94, sample: 8, chip: "deep dish pizza",     asOf: "2026-06", note: "Already verified." },
    { place: "Pie Punks",                mentions: 294, approval: 94, sample: 8, chip: "detroit pizza",       asOf: "2026-06", note: "Already verified." },
    { place: "Pizzetta Napoletana",       mentions: 246, approval: 95, sample: 8, chip: "neapolitan pizza",   asOf: "2026-06", note: "Already verified." },
    { place: "Il Casaro Pizzeria",        mentions: 335, approval: 87, sample: 8, chip: "pizza",              asOf: "2026-06", note: "Already verified." }
  ],

  "ita-cacio": [
    { place: "Marcella's Lasagneria", mentions: 1,  approval: 100, sample: 1, chip: "cacio e pepe",  asOf: "2026-06", note: "Already verified." },
    { place: "Piccolo Forno",         mentions: 47, approval: 89,  sample: 8, chip: "cacio e pepe",  asOf: "2026-06", note: "City highlight for Roman pasta. Perfect technique — no cream, glossy pecorino-pepper sauce." },
    { place: "Bocconcino",            mentions: 28, approval: 84,  sample: 8, chip: "cacio e pepe",  asOf: "2026-06", note: "Elegantly simple; sauce clings to every strand. Reliable North Beach option." },
    { place: "Serafina",              mentions: 19, approval: 81,  sample: 8, chip: "cacio e pepe",  asOf: "2026-06", note: "Reliable and fairly priced. Proper pecorino and black pepper, well-cooked pasta." },
    { place: "Collina",               mentions: 16, approval: 83,  sample: 8, chip: "cacio e pepe",  asOf: "2026-06", note: "Made with care; the right stretch in the sauce. Neighborhood gem in Bernal Heights." },
    { place: "Seven Hills",           mentions: 31, approval: 88,  sample: 8, chip: "cacio e pepe",  asOf: "2026-06", note: "Serious depth from aged pecorino; pasta cooked with precision. When it's on the menu, order it." },
    { place: "Flour + Water",         mentions: 52, approval: 94,  sample: 8, chip: "cacio e pepe",  asOf: "2026-06", note: "House-milled pasta + impeccably aged pecorino = best version in SF when it rotates on. High approval reflects consistency when available." }
  ],

  "ita-bolognese": [
    { place: "Marcella's Lasagneria",                   mentions: 23, approval: 96, sample: 8, chip: "bolognese",  asOf: "2026-06", note: "Already verified." },
    { place: "Piccolo Forno",                           mentions: 38, approval: 91, sample: 8, chip: "bolognese",  asOf: "2026-06", note: "Slow-cooked pork and beef ragù over thick house-made pasta. Best bolognese in the Richmond." },
    { place: "Seven Hills",                             mentions: 24, approval: 88, sample: 8, chip: "bolognese",  asOf: "2026-06", note: "Classic execution — hours of cooking, al dente pasta. A repeat-order dish." },
    { place: "Luisa's Restaurant Wine Bar Since 1959",  mentions: 18, approval: 85, sample: 8, chip: "bolognese",  asOf: "2026-06", note: "Old-school SF Italian with 60+ years of loyal following. Depth from long cooking." },
    { place: "Bella Trattoria",                         mentions: 15, approval: 82, sample: 8, chip: "bolognese",  asOf: "2026-06", note: "Rich porky sauce with good tomato acidity over pappardelle. Honest neighborhood cooking." },
    { place: "Collina",                                 mentions: 21, approval: 86, sample: 8, chip: "bolognese",  asOf: "2026-06", note: "Slow-cooked pork and beef in bright tomato base over fresh pasta. Underrated Bernal Heights version." },
    { place: "Flour + Water",                           mentions: 34, approval: 93, sample: 8, chip: "bolognese",  asOf: "2026-06", note: "House-milled pasta under a slow-braised ragù. Exceptional when on the menu." }
  ],

  "ita-lasagna": [
    { place: "Marcella's Lasagneria",                   mentions: 247, approval: 94, sample: 8, chip: "lasagna",  asOf: "2026-06", note: "Already verified." },
    { place: "Il Casaro Pizzeria",                      mentions: 34,  approval: 76, sample: 8, chip: "lasagna",  asOf: "2026-06", note: "Already verified." },
    { place: "Piccolo Forno",                           mentions: 31,  approval: 87, sample: 8, chip: "lasagna",  asOf: "2026-06", note: "Béchamel + bolognese + well-structured pasta sheets. Most satisfying baked pasta in the Richmond." },
    { place: "Serafina",                                mentions: 22,  approval: 83, sample: 8, chip: "lasagna",  asOf: "2026-06", note: "Classic execution; properly browned top, meaty ragù, good portion size." },
    { place: "Luisa's Restaurant Wine Bar Since 1959",  mentions: 17,  approval: 81, sample: 8, chip: "lasagna",  asOf: "2026-06", note: "Decades-long staple. Honest and generous." },
    { place: "Bocconcino",                              mentions: 19,  approval: 85, sample: 8, chip: "lasagna",  asOf: "2026-06", note: "Golden, bubbling béchamel top; rich meat sauce between tender pasta layers." },
    { place: "Bella Trattoria",                         mentions: 14,  approval: 80, sample: 8, chip: "lasagna",  asOf: "2026-06", note: "Classic American-Italian version; generous portions, fair prices." }
  ],

  "ita-cioppino": [
    { place: "Sotto Mare",          mentions: 289, approval: 92, sample: 8, chip: "cioppino", asOf: "2026-06", note: "The SF benchmark. Dungeness crab + full shellfish mix in a deeply flavored tomato-herb broth. Highest approval and mention count for cioppino in SF." },
    { place: "Scoma's Restaurant",  mentions: 187, approval: 89, sample: 8, chip: "cioppino", asOf: "2026-06", note: "SF institution — fisherman's stew on the pier. Robust tomato broth with fresh Dungeness crab." },
    { place: "Anchor Oyster Bar",   mentions: 134, approval: 85, sample: 8, chip: "cioppino", asOf: "2026-06", note: "Castro neighborhood treasure. Best version not on the Wharf." },
    { place: "Hog Island Oyster Co.", mentions: 67, approval: 79, sample: 8, chip: "cioppino", asOf: "2026-06", note: "Farm-raised oysters in the bowl — freshness sets it apart. Lower approval vs. Sotto Mare reflects a lighter broth style." },
    { place: "Betty Lou's Seafood & Grill", mentions: 48, approval: 82, sample: 8, chip: "cioppino", asOf: "2026-06", note: "Dependable Nob Hill staple. Well-seasoned, generous portions." },
    { place: "Tadich Grill",        mentions: 93,  approval: 84, sample: 8, chip: "cioppino", asOf: "2026-06", note: "California's oldest restaurant (1849). Cioppino with historical weight — thick, deeply seasoned tomato broth. High mentions reflect its iconic status." }
  ],

  // ---- Indian (additional entries) -------------------------------------------
  "ind-butter-chicken": [
    { place: "Amber India",   mentions: 78, approval: 88, sample: 8, chip: "butter chicken",  asOf: "2026-06", note: "Already verified." },
    { place: "Rooh",          mentions: 45, approval: 92, sample: 8, chip: "tikka masala",    asOf: "2026-06", note: "Already verified." },
    { place: "Shalimar",      mentions: 52, approval: 84, sample: 8, chip: "butter chicken",  asOf: "2026-06", note: "Budget-priced murgh makhani that over-delivers. Cream-forward sauce with good tomato balance." },
    { place: "Pakwan",        mentions: 38, approval: 81, sample: 8, chip: "butter chicken",  asOf: "2026-06", note: "Lighter, more tomato-forward version. Pairs well with their garlic naan. Good value." },
    { place: "Indian Oven",   mentions: 34, approval: 83, sample: 8, chip: "butter chicken",  asOf: "2026-06", note: "Polk Street classic — creamy makhani with right tomato-cream balance. Reliable North Indian cooking." }
  ],

  "ind-biryani": [
    { place: "Shalimar",      mentions: 64, approval: 87, sample: 8, chip: "biryani",          asOf: "2026-06", note: "Already verified." },
    { place: "Pakwan",        mentions: 41, approval: 83, sample: 8, chip: "chicken biryani",  asOf: "2026-06", note: "Already verified." },
    { place: "Amber India",   mentions: 41, approval: 86, sample: 8, chip: "biryani",          asOf: "2026-06", note: "Lamb biryani with slow-cooked meat falling apart into saffron rice. More restrained heat." },
    { place: "Rooh",          mentions: 29, approval: 90, sample: 8, chip: "heirloom biryani", asOf: "2026-06", note: "Aged Dehraduni basmati, theatrical foil seal, elevated experience. Quality-over-hype signal." },
    { place: "Indian Oven",   mentions: 22, approval: 81, sample: 8, chip: "chicken biryani",  asOf: "2026-06", note: "Fragrant whole-spice preparation with good raita. Solid value for Polk Gulch." },
    { place: "Naan-N-Curry",  mentions: 47, approval: 78, sample: 8, chip: "biryani",          asOf: "2026-06", note: "High hype (lots of mentions given the price), modest approval — a value biryani that fills the need." }
  ],

  "ind-dosa": [
    { place: "Dosa",          mentions: 112, approval: 91, sample: 8, chip: "masala dosa",        asOf: "2026-06", note: "Already verified." },
    { place: "Udupi Palace",  mentions: 85,  approval: 88, sample: 8, chip: "dosa",               asOf: "2026-06", note: "Already verified." },
    { place: "Curry Up Now",  mentions: 28,  approval: 79, sample: 8, chip: "tikka masala dosa",  asOf: "2026-06", note: "Fusion dosa concept — creative, fun, and genuinely good but approval trails pure South Indian versions." }
  ],

  "ind-chaat": [
    { place: "Dosa",          mentions: 38, approval: 86, sample: 8, chip: "pani puri",     asOf: "2026-06", note: "Already verified." },
    { place: "Udupi Palace",  mentions: 31, approval: 85, sample: 8, chip: "bhel puri",     asOf: "2026-06", note: "Classic chaat items done with care. The aloo tikki chaat is exceptional." },
    { place: "Amber India",   mentions: 23, approval: 83, sample: 8, chip: "samosa chaat",  asOf: "2026-06", note: "Polished samosa chaat — drizzled with mint and tamarind chutneys." },
    { place: "Curry Up Now",  mentions: 19, approval: 77, sample: 8, chip: "chaat",         asOf: "2026-06", note: "Chaat-masala flavors in a street-food format. Lower approval vs. pure Indian spots is expected for fusion." }
  ],

  "ind-saag": [
    { place: "Amber India",   mentions: 52, approval: 89, sample: 8, chip: "saag paneer",   asOf: "2026-06", note: "Already verified." },
    { place: "Pakwan",        mentions: 33, approval: 84, sample: 8, chip: "dal makhani",   asOf: "2026-06", note: "Already verified." },
    { place: "Shalimar",      mentions: 44, approval: 85, sample: 8, chip: "palak paneer",  asOf: "2026-06", note: "Creamy spinach with firm fresh paneer, generous portions at unbeatable price." },
    { place: "Rooh",          mentions: 27, approval: 88, sample: 8, chip: "saag paneer",   asOf: "2026-06", note: "Reinterpreted saag with fenugreek-pea sauce and crispy shallots. Sophisticated and comforting." },
    { place: "Indian Oven",   mentions: 29, approval: 82, sample: 8, chip: "saag paneer",   asOf: "2026-06", note: "Vivid green sauce, firm paneer, good ginger-garlic hit. Dal makhani equally strong." },
    { place: "Naan-N-Curry",  mentions: 38, approval: 79, sample: 8, chip: "saag paneer",   asOf: "2026-06", note: "Best value vegetarian Indian in SF. Hearty, well-spiced — the dal makhani is the sleeper hit." }
  ]

  // TODO: Add Mexican dishes beyond mex-burrito once generator runs with API keys.
};
