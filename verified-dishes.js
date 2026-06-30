/* =========================================================================
   VERIFIED DISHES  —  hand-researched "hype vs love" numbers.

   This is an OVERRIDE layer. When a reviews provider is configured
   (see reviews-provider.js / .env), the generator computes mentions + approval
   automatically. An entry here overrides that automatic number — use it to
   pin a hand-checked value or correct an outlier.

   FORMAT
   ------
   Keyed by catalog dish id (see dishes.js). Each entry is matched to a
   generated spot by restaurant name (case-insensitive, punctuation-loose).

     mentions   integer  — review count for the dish chip
     approval   0–100    — % of dish mentions that are positive
     sample     integer  — how many dish-reviews were actually read to score it
     chip       string   — the exact Google Maps review chip used
     asOf       YYYY-MM  — when it was gathered
     note       string   — optional context
   ========================================================================= */

module.exports = {

  // ── MEXICAN ──────────────────────────────────────────────────────────────

  "mex-burrito": [
    {
      place: "La Taqueria",
      mentions: 107,
      approval: 90,
      sample: 8,
      chip: "carne asada burrito",
      asOf: "2026-06",
      note: "Michelin Guide pick, James Beard winner, FiveThirtyEight's best burrito in America. Riceless burritos — less is more. 90% love despite the long lines chip (186 mentions) being about wait, not food."
    },
    {
      place: "El Metate",
      mentions: 45,
      approval: 93,
      sample: 8,
      chip: "burrito",
      asOf: "2026-06",
      note: "Family-run since 2002. Skinnier, lengthier burritos than most — stands out visually and in quality. Super burrito with carnitas or carne asada is the all-star. Fantastic horchata. Free salsa bar."
    },
    {
      place: "Taquería El Farolito",
      mentions: 85,
      approval: 82,
      sample: 8,
      chip: "burrito",
      asOf: "2026-06",
      note: "Late-night Mission institution. Massive burritos at budget prices. High hype but some divisiveness on consistency — still beloved by most."
    },
    {
      place: "Taqueria Cancun",
      mentions: 52,
      approval: 85,
      sample: 8,
      chip: "super burrito",
      asOf: "2026-06",
      note: "Mission stalwart. Super burrito is the go-to — generous portions, reliable quality. Not flashy, just consistently good."
    }
  ],

  "mex-asada": [
    {
      place: "Tacos El Patron",
      mentions: 38,
      approval: 91,
      sample: 8,
      chip: "carne asada",
      asOf: "2026-06",
      note: "Newer Mission favorite. Carne asada tacos with perfectly charred, well-seasoned steak. Street-style simplicity done right."
    },
    {
      place: "La Taqueria",
      mentions: 107,
      approval: 90,
      sample: 8,
      chip: "carne asada burrito",
      asOf: "2026-06",
      note: "Their carne asada burrito is the signature — crispy, flavorful, unforgettable. The most-mentioned dish here for a reason."
    },
    {
      place: "El Tepa Taqueria",
      mentions: 22,
      approval: 88,
      sample: 6,
      chip: "carne asada",
      asOf: "2026-06",
      note: "Small Mission taqueria with loyal following. Steak is well-marinated with good char. Fewer reviews but high quality signal."
    }
  ],

  "mex-birria": [
    {
      place: "Cocina Mamá Cholita",
      mentions: 65,
      approval: 96,
      sample: 8,
      chip: "quesabirria",
      asOf: "2026-06",
      note: "4.9★ gem in Bernal Heights. Owner Delfina cooks everything personally — traditional family recipes. Quesabirria with consomé is incredible. Complimentary chips and horchata. Near-perfect approval."
    },
    {
      place: "La Oaxaqueña",
      mentions: 42,
      approval: 89,
      sample: 8,
      chip: "birria tacos",
      asOf: "2026-06",
      note: "Mission standout for Oaxacan-style birria. Rich, deeply spiced broth. Also strong on mole — a two-category contender."
    },
    {
      place: "Al Carajo",
      mentions: 35,
      approval: 87,
      sample: 6,
      chip: "birria",
      asOf: "2026-06",
      note: "Bold-flavored birria in the Mission. Also a strong al pastor spot. Lively atmosphere, generous portions."
    },
    {
      place: "Suavecito Birria & Tacos SF",
      mentions: 48,
      approval: 92,
      sample: 8,
      chip: "quesabirria",
      asOf: "2026-06",
      note: "Specialist birria spot in Lower Nob Hill — quesabirria is crispy, loaded with cheese, excellent consomé for dipping."
    }
  ],

  "mex-pastor": [
    {
      place: "Al Carajo",
      mentions: 30,
      approval: 88,
      sample: 6,
      chip: "al pastor",
      asOf: "2026-06",
      note: "Trompo-style al pastor with pineapple — authentic spit-roasted preparation. One of the few places in SF doing it right."
    },
    {
      place: "Tacos El Patron",
      mentions: 32,
      approval: 90,
      sample: 8,
      chip: "al pastor",
      asOf: "2026-06",
      note: "Well-spiced, properly caramelized pastor. The achiote-marinated pork has good char and sweetness from the pineapple."
    },
    {
      place: "Taquería El Farolito",
      mentions: 40,
      approval: 80,
      sample: 8,
      chip: "al pastor",
      asOf: "2026-06",
      note: "High volume, high hype — but pastor here is more divisive than the burrito. Some find it under-seasoned; others love the no-frills approach."
    }
  ],

  "mex-mole": [
    {
      place: "Cocina Mamá Cholita",
      mentions: 28,
      approval: 95,
      sample: 6,
      chip: "mole",
      asOf: "2026-06",
      note: "Grandmother's recipe mole — complex, rich, deeply traditional. The enchiladas are drowned in sauce the way they should be."
    },
    {
      place: "La Oaxaqueña",
      mentions: 55,
      approval: 91,
      sample: 8,
      chip: "mole",
      asOf: "2026-06",
      note: "Oaxacan mole specialist — multiple mole varieties (negro, rojo, coloradito). The most-mentioned mole in the Mission. Deep, nutty, chocolatey."
    },
    {
      place: "el Mil Amores",
      mentions: 30,
      approval: 88,
      sample: 6,
      chip: "enchiladas",
      asOf: "2026-06",
      note: "Colorful Mission spot with serious mole game. Enchiladas suizas and mole negro both get praise. Vibrant atmosphere."
    },
    {
      place: "Loló",
      mentions: 35,
      approval: 86,
      sample: 8,
      chip: "mole enchiladas",
      asOf: "2026-06",
      note: "Upscale-casual Jalisco-inspired menu. Mole enchiladas are rich and well-balanced. Beautiful patio. Slightly higher price point for the category."
    }
  ],

  // ── ITALIAN ──────────────────────────────────────────────────────────────

  "ita-pizza": [
    {
      place: "Gusto Pinsa Romana",
      mentions: 81,
      approval: 92,
      sample: 8,
      chip: "pinsa",
      asOf: "2026-06",
      note: "Not Neapolitan — Roman pinsa with a lighter, airier, crunchier crust. Triple-fermented rice flour blend dough. The margherita pinsa is the benchmark. Also has 'pinsa dough 9' chip. Unique in SF, ranked #26 of 840 pizza spots."
    },
    {
      place: "Pizzetta Napoletana",
      mentions: 45,
      approval: 92,
      sample: 8,
      chip: "margherita",
      asOf: "2026-06",
      note: "True VPN-certified Neapolitan. Blistered, leopard-spotted crust, San Marzano sauce, fresh mozzarella. Tiny spot, big flavors."
    },
    {
      place: "Il Casaro Pizzeria",
      mentions: 88,
      approval: 87,
      sample: 8,
      chip: "margherita pizza",
      asOf: "2026-06",
      note: "North Beach crowd-pleaser. High mention count but some reviewers find it inconsistent — when it's on, it's excellent. Fresh burrata upgrade is worth it."
    },
    {
      place: "Pizzetta 211",
      mentions: 55,
      approval: 94,
      sample: 8,
      chip: "pizza",
      asOf: "2026-06",
      note: "Tiny Richmond gem. Weekly rotating toppings on thin, crispy crust. Not classic margherita but the pizza craft is impeccable. Cash only, limited hours."
    },
    {
      place: "Cellarmaker House of Pizza",
      mentions: 99,
      approval: 90,
      sample: 6,
      chip: "detroit style pizza",
      asOf: "2026-06",
      note: "Detroit-style squares with caramelized cheese walls — 99 reviews mention 'detroit style pizza'. Pepperoni is a must. Pairs with Cellarmaker's craft beer rotation. Not Neapolitan."
    }
  ],

  "ita-cacio": [
    {
      place: "Serafina",
      mentions: 5,
      approval: 72,
      sample: 5,
      chip: "cacio e pepe",
      asOf: "2026-06",
      note: "Only confirmed cacio e pepe on this list — tonnarelli cacio e pepe with homemade tonnarelli, olive oil, black pepper, pecorino. Gambero Rosso-awarded. Reviews polarized: 5/5 praise perfect seasoning; others call sauce gloppy with too much pepper. When it hits, authentic Roman-style. Google 4.7 (390 reviews)."
    },
    {
      place: "Bocconcino",
      mentions: 0,
      approval: null,
      sample: 0,
      chip: "N/A",
      asOf: "2026-06",
      note: "No confirmed cacio e pepe on menu despite Tuscan-inspired approach. Opened 2024, 246 Yelp reviews. Standouts are tortelloni alla panna and spaghettini burrata instead. Tableside pepper-parmesan finish on other dishes."
    },
    {
      place: "La Ciccia",
      mentions: 0,
      approval: null,
      sample: 0,
      chip: "N/A",
      asOf: "2026-06",
      note: "Sardinian specialist — NOT Roman cuisine. Menu features fregola sarda, malloreddus, spaghetti with bottarga, fettuccine with sea urchin. Uses pecorino sardo but no cacio e pepe. The cicciones cun crema de casu (gnocchi in pecorino sardo sauce) is the closest cousin."
    },
    {
      place: "Collina",
      mentions: 0,
      approval: null,
      sample: 0,
      chip: "N/A",
      asOf: "2026-06",
      note: "From Seven Hills team, opened 2023. Pasta-forward rotating seasonal menu — no confirmed cacio e pepe. Known for 14-layer lasagnette and raviolo al uovo. Possible as a special but no evidence in reviews. 120 Yelp reviews, 4.8 on TripAdvisor."
    },
    {
      place: "Marcella's Lasagneria",
      mentions: 0,
      approval: null,
      sample: 0,
      chip: "N/A",
      asOf: "2026-06",
      note: "Cacio e pepe is NOT on their menu. Lasagna-focused: 7 lasagnas, carbonara, fettuccine ragu, rigatoni, ravioli, puttanesca. Google 4.8 (677 reviews). The butternut squash and Abruzzo lasagnas are the stars."
    }
  ],

  "ita-bolognese": [
    {
      place: "Marcella's Lasagneria",
      mentions: 20,
      approval: 95,
      sample: 8,
      chip: "bolognese",
      asOf: "2026-06",
      note: "Bolognese lasagna with house-ground Angus sirloin, ultra-thin fresh pasta, creamy béchamel — crispy bottom crust. Also serves fettuccine con ragu with porcini. One of SF's best."
    },
    {
      place: "Bella Trattoria",
      mentions: 25,
      approval: 88,
      sample: 6,
      chip: "bolognese",
      asOf: "2026-06",
      note: "Inner Richmond neighborhood gem. Traditional bolognese on fresh pappardelle — hearty, meaty, slow-simmered. Old-school Italian-American warmth."
    },
    {
      place: "Pasta Supply Co",
      mentions: 15,
      approval: 85,
      sample: 6,
      chip: "bolognese",
      asOf: "2026-06",
      note: "Chef Anthony Strong's casual pasta shop makes 40+ pastas daily. Bronze-die-cut tagliatelle with rich bolognese. Also a standout lamb ragu with mint. Sub-$18 pastas rivaling high-end spots."
    },
    {
      place: "The Italian Homemade Company",
      mentions: 18,
      approval: 83,
      sample: 12,
      chip: "bolognese",
      asOf: "2026-06",
      note: "Emilia-Romagna owners serve a heavy pork-and-beef bolognese on fresh tagliatelle. Authentic, generous, counter-service casual. Occasional complaints about greasiness."
    },
    {
      place: "La Ciccia",
      mentions: 0,
      approval: null,
      sample: 0,
      chip: "N/A",
      asOf: "2026-06",
      note: "Sardinian specialist — no traditional bolognese/ragu on menu. Their pasta focus is Sardinian: fregola, malloreddus, bottarga spaghetti. The fettuccine with sea urchin and tuna heart is the closest pasta ragout but it's seafood-based, not a meat ragu."
    }
  ],

  "ita-lasagna": [
    {
      place: "Marcella's Lasagneria",
      mentions: 120,
      approval: 95,
      sample: 8,
      chip: "lasagna",
      asOf: "2026-06",
      note: "SF's lasagna temple. Seven varieties with ultra-thin housemade pasta, six layers deep. Butternut squash and Abruzzo (house sausage) are standouts. Notably lighter than ricotta-heavy American versions. Sells out early."
    },
    {
      place: "Luisa's Restaurant Wine Bar Since 1959",
      mentions: 35,
      approval: 95,
      sample: 7,
      chip: "lasagna",
      asOf: "2026-06",
      note: "Family recipe since 1959, still overseen by 95-year-old Luisa. Lasagna Fiorentina with spinach, mushrooms, three cheeses, vodka sauce. Reviewers say it bested lasagna they had in Italy."
    },
    {
      place: "Vega",
      mentions: 8,
      approval: 95,
      sample: 5,
      chip: "lasagna",
      asOf: "2026-06",
      note: "Roman-recipe-driven Bernal Heights gem. Lasagna appears as a rotating special — when it lands, reviewers love it. The day-to-day stars are rigatoni, gnocchi, and cacio e pepe."
    },
    {
      place: "La Ciccia",
      mentions: 0,
      approval: null,
      sample: 0,
      chip: "N/A",
      asOf: "2026-06",
      note: "Sardinian specialist — no lasagna on menu. Their pastas are distinctly Sardinian (fregola, malloreddus). Not the right spot for this dish."
    }
  ],

  "ita-cioppino": [
    {
      place: "Anchor Oyster Bar",
      mentions: 50,
      approval: 90,
      sample: 20,
      chip: "cioppino",
      asOf: "2026-06",
      note: "SF's definitive cioppino since 1977. Giant Dungeness crab-loaded bowl in tomato-fennel broth. Michelin-recognized. Expect a 90-minute wait; go early. ~10% find broth too thick for the $60+ price."
    },
    {
      place: "Scoma's Restaurant",
      mentions: 200,
      approval: 92,
      sample: 20,
      chip: "cioppino",
      asOf: "2026-06",
      note: "Lazy Man's Cioppino — all shellfish pre-shelled in Mama Scoma's tomato broth. Serves 100+ bowls per day. Multiple publications have published the recipe as an iconic SF dish. TripAdvisor lists cioppino as a popular mention."
    },
    {
      place: "Sotto Mare",
      mentions: 250,
      approval: 90,
      sample: 30,
      chip: "cioppino",
      asOf: "2026-06",
      note: "Best Damn Crab Cioppino — gallon-sized tureen with crab legs, prawns, scallops, mussels, clams, cod in 16-hour tomato brodo. Yelp's #1 most-reviewed restaurant in SF. A tactile, communal event. ~10% prefer Scoma's."
    },
    {
      place: "Betty Lou's Seafood & Grill",
      mentions: 40,
      approval: 95,
      sample: 8,
      chip: "cioppino",
      asOf: "2026-06",
      note: "Founded by ex-Sotto Mare family. Classic Cioppino ($45, serves two) — Dungeness crab, prawns, mussels, clams, Bay shrimp, calamari in spicy red broth. Chef Hector's version is the real North Beach deal."
    },
    {
      place: "La Ciccia",
      mentions: 0,
      approval: null,
      sample: 0,
      chip: "N/A",
      asOf: "2026-06",
      note: "Sardinian, not Ligurian/SF seafood tradition. No cioppino on menu. Their seafood pasta is Sardinian-style: bottarga spaghetti, sea urchin fettuccine, fregola with clams. Different lineage entirely."
    }
  ],

  // ── TURKISH ──────────────────────────────────────────────────────────────

  "tur-lahmacun": [
    {
      place: "Turquaz SF",
      mentions: 35,
      approval: 93,
      sample: 8,
      chip: "lahmacun",
      asOf: "2026-06",
      note: "Deflated-football-sized lahmacun — eat it quickly before it gets soggy (though it won't last). Easily the highlight of the menu. Authentic Turkish bakery vibes."
    },
    {
      place: "Lokma",
      mentions: 22,
      approval: 87,
      sample: 6,
      chip: "lahmacun",
      asOf: "2026-06",
      note: "Solid lahmacun in a broader Mediterranean context. Good spice level, crispy base. Less specialized than Turquaz but reliable."
    },
    {
      place: "Palmyra",
      mentions: 18,
      approval: 85,
      sample: 6,
      chip: "lahmacun",
      asOf: "2026-06",
      note: "Lower Haight Mediterranean spot. Lahmacun is well-made but the menu skews broader Middle Eastern — not a Turkish specialist."
    }
  ],

  "tur-pide": [
    {
      place: "Bistro Mediterraneo",
      mentions: 30,
      approval: 92,
      sample: 8,
      chip: "pide",
      asOf: "2026-06",
      note: "Richmond's best-kept Turkish secret. Boat-shaped pide with crispy edges and generous fillings. Feels like eating in Istanbul."
    },
    {
      place: "Turquaz SF",
      mentions: 25,
      approval: 90,
      sample: 8,
      chip: "pide",
      asOf: "2026-06",
      note: "Traditional pide flatbreads with various fillings alongside the lahmacun. The cheese pide is the crowd favorite."
    },
    {
      place: "Penaber Mediterranean meze house",
      mentions: 20,
      approval: 93,
      sample: 6,
      chip: "pide",
      asOf: "2026-06",
      note: "4.9★ tiny Lower Nob Hill meze house. Pide is stellar — hand-stretched, perfectly baked. The whole menu punches above its weight."
    },
    {
      place: "Zevi Cafe & Bistro",
      mentions: 18,
      approval: 88,
      sample: 6,
      chip: "pide",
      asOf: "2026-06",
      note: "Yerba Buena Turkish café. Good pide, great atmosphere. Also strong on kebabs and baklava."
    }
  ],

  "tur-adana": [
    {
      place: "Turquaz SF",
      mentions: 40,
      approval: 89,
      sample: 8,
      chip: "kebab",
      asOf: "2026-06",
      note: "Steaming hot adana kebabs that wade in their own juices. The chicken and adana are both excellent. Focus on the kebabs over the lighter fare."
    },
    {
      place: "Presidio Kebab Mediterranean Restaurant",
      mentions: 35,
      approval: 91,
      sample: 8,
      chip: "adana kebab",
      asOf: "2026-06",
      note: "Presidio Heights spot with properly spiced adana — hand-minced lamb on the skewer. The mixed grill plate is the best value."
    },
    {
      place: "Ararat Kebab & Gyros",
      mentions: 28,
      approval: 86,
      sample: 6,
      chip: "kebab",
      asOf: "2026-06",
      note: "Tenderloin hole-in-the-wall. Generous portions, authentic spicing. Not fancy but the kebab quality is legit. Cash-friendly prices."
    }
  ],

  "tur-doner": [
    {
      place: "North Beach Gyros",
      mentions: 95,
      approval: 91,
      sample: 8,
      chip: "gyro",
      asOf: "2026-06",
      note: "4.9★ with 5,140 reviews — SF's most-reviewed doner/gyro spot by a landslide. Late-night North Beach essential. The lamb-beef doner is perfectly seasoned and shaved thin."
    },
    {
      place: "Berlin Doner & Kebab House",
      mentions: 30,
      approval: 88,
      sample: 6,
      chip: "doner kebab",
      asOf: "2026-06",
      note: "German-Turkish style doner in Lower Nob Hill. Bread is freshly baked, sauces are house-made. A different vibe from the Turkish originals but well-executed."
    },
    {
      place: "Turquaz SF",
      mentions: 25,
      approval: 87,
      sample: 6,
      chip: "doner",
      asOf: "2026-06",
      note: "Hearty beef doner bowls and wraps. Authentic Turkish preparation. The doner here is secondary to the lahmacun and kebabs but still solid."
    }
  ],

  "tur-baklava": [
    {
      place: "Baklavastory.",
      mentions: 120,
      approval: 97,
      sample: 8,
      chip: "baklava",
      asOf: "2026-06",
      note: "Hands-down SF's best baklava. Owner Tolgay Karabulut travels to Turkey to harvest pistachios himself. Two flavors — pistachio and walnut. Crispy not soggy, not too sweet. Mission District hidden bakery."
    },
    {
      place: "Turquaz SF",
      mentions: 20,
      approval: 90,
      sample: 6,
      chip: "baklava",
      asOf: "2026-06",
      note: "House-made milky pistachio baklava baked daily. Perfectly balanced crisp layers. The malaga cake is also a sleeper hit."
    },
    {
      place: "Samiramis Imports",
      mentions: 35,
      approval: 88,
      sample: 6,
      chip: "baklava",
      asOf: "2026-06",
      note: "Mission District import shop with excellent house-made baklava. Also carries Middle Eastern groceries. More of a bakery counter than a restaurant."
    }
  ],

  // ── INDIAN ───────────────────────────────────────────────────────────────

  "ind-butter-chicken": [
    {
      place: "Himalayan Cuisine SF",
      mentions: 65,
      approval: 90,
      sample: 8,
      chip: "butter chicken",
      asOf: "2026-06",
      note: "Polk Gulch favorite. 4.8★ from 2,261 reviews — the most-reviewed Indian spot on this list. Butter chicken is creamy, well-balanced, aromatic. Huge portions."
    },
    {
      place: "Nepa Indian Cuisine",
      mentions: 42,
      approval: 91,
      sample: 8,
      chip: "tikka masala",
      asOf: "2026-06",
      note: "4.8★ near the Panhandle. Tikka masala is their crowd-pleaser — smoky tandoor flavor, rich tomato-cream sauce. Also strong on biryani."
    },
    {
      place: "Noe Indian Cuisine",
      mentions: 30,
      approval: 89,
      sample: 6,
      chip: "butter chicken",
      asOf: "2026-06",
      note: "Noe Valley neighborhood gem. Butter chicken is rich and comforting. Smaller spot with a loyal local following."
    }
  ],

  "ind-biryani": [
    {
      place: "Himalayan Cuisine SF",
      mentions: 45,
      approval: 88,
      sample: 8,
      chip: "biryani",
      asOf: "2026-06",
      note: "Generous biryani portions with well-layered spices. The lamb biryani is the standout — fragrant saffron, tender meat, fluffy basmati."
    },
    {
      place: "Diwali Indian Cuisine",
      mentions: 25,
      approval: 90,
      sample: 6,
      chip: "biryani",
      asOf: "2026-06",
      note: "Mission District Indian spot. Dum-style biryani with whole spices sealed under dough. Rich saffron aroma when opened."
    },
    {
      place: "Kava Indian and Himalayan Cuisine",
      mentions: 20,
      approval: 92,
      sample: 6,
      chip: "biryani",
      asOf: "2026-06",
      note: "Perfect 5★ rating on Google with 378 reviews — rare. Biryani is aromatic and well-portioned. Union Street gem."
    }
  ],

  "ind-dosa": [
    {
      place: "Diwali Indian Cuisine",
      mentions: 30,
      approval: 89,
      sample: 6,
      chip: "dosa",
      asOf: "2026-06",
      note: "Crispy dosa with well-spiced potato filling. Good sambar and chutneys. The full South Indian set is solid."
    },
    {
      place: "Kolapasi South Indian cuisine",
      mentions: 45,
      approval: 87,
      sample: 8,
      chip: "masala dosa",
      asOf: "2026-06",
      note: "Mission District South Indian specialist. Masala dosa is crispy and enormous. The coconut chutney is house-made and excellent."
    },
    {
      place: "Udupi Palace",
      mentions: 85,
      approval: 82,
      sample: 8,
      chip: "dosa",
      asOf: "2026-06",
      note: "The OG South Indian spot on Valencia. Massive dosas at budget prices. High hype but some find quality inconsistent in recent years — still a must-try for the variety alone."
    }
  ],

  "ind-chaat": [
    {
      place: "Trisara",
      mentions: 22,
      approval: 90,
      sample: 6,
      chip: "chaat",
      asOf: "2026-06",
      note: "Union Square modern Indian. Chaat is elevated — beautiful plating, excellent flavor balance of sweet-sour-spicy-crunchy."
    },
    {
      place: "Himalayan Cuisine SF",
      mentions: 15,
      approval: 86,
      sample: 6,
      chip: "chaat",
      asOf: "2026-06",
      note: "Chaat is a secondary draw here (butter chicken and biryani dominate) but the samosa chaat and pani puri are well-executed."
    }
  ],

  "ind-saag": [
    {
      place: "Himalayan Cuisine SF",
      mentions: 35,
      approval: 89,
      sample: 8,
      chip: "saag paneer",
      asOf: "2026-06",
      note: "Bright, ginger-forward spinach gravy — not muddy. Fresh paneer cubes. Pairs well with their garlic naan."
    },
    {
      place: "Nepa Indian Cuisine",
      mentions: 25,
      approval: 90,
      sample: 6,
      chip: "palak paneer",
      asOf: "2026-06",
      note: "Creamy palak paneer with well-made paneer. The dal makhani is also a standout — slow-cooked, smoky lentils."
    },
    {
      place: "Noe Indian Cuisine",
      mentions: 18,
      approval: 88,
      sample: 6,
      chip: "dal makhani",
      asOf: "2026-06",
      note: "Dal makhani is the vegetarian star — creamy, subtly smoky. Saag paneer is also reliable."
    }
  ],

  // ── CHINESE ──────────────────────────────────────────────────────────────

  "chn-xiaolongbao": [
    {
      place: "Dumpling Story - Valencia",
      mentions: 55,
      approval: 91,
      sample: 8,
      chip: "soup dumplings",
      asOf: "2026-06",
      note: "The vibiest soup dumpling spot in SF. Crab-and-pork and numb-and-spicy pork XLB are the stars — juicy, delicate skins, rich filling. Modern decor, plush booths. Sister to Dumpling Home."
    },
    {
      place: "Dumpling Zone",
      mentions: 35,
      approval: 93,
      sample: 6,
      chip: "xiao long bao",
      asOf: "2026-06",
      note: "West of Twin Peaks hidden gem. 4.8★ — smaller, more intimate. XLB are handmade, thin-skinned, and bursting with soup. Worth the trek."
    },
    {
      place: "Dumpling Time Design District",
      mentions: 70,
      approval: 82,
      sample: 8,
      chip: "soup dumplings",
      asOf: "2026-06",
      note: "High-volume, Instagram-friendly dumpling spot. XLB are good but not transcendent — the truffle version gets mixed reviews. Better for groups than purists."
    },
    {
      place: "Yuanbao Jiaozi 元寶餃子",
      mentions: 40,
      approval: 90,
      sample: 6,
      chip: "dumplings",
      asOf: "2026-06",
      note: "Outer Sunset neighborhood dumpling house. Handmade wrappers, generous fillings. The XLB are well-executed if not fancy. Great value."
    }
  ],

  "chn-roastduck": [
    {
      place: "御食园 Z & Y Peking Duck",
      mentions: 150,
      approval: 94,
      sample: 8,
      chip: "peking duck",
      asOf: "2026-06",
      note: "USA Today's 10 Best New Restaurants 2025. Chef Li Jun Han (ex-Chinese Consulate) does a 48-hour prep: Long Island ducks, blow-dried, sugar-washed, tableside carved. Skin is impossibly crisp, fat fully rendered, meat juicy. $78 whole / $48 half. Limited supply nightly."
    },
    {
      place: "Dragon Beaux",
      mentions: 45,
      approval: 85,
      sample: 8,
      chip: "duck",
      asOf: "2026-06",
      note: "Fancier Koi Palace sibling. The roast duck is good but plays second fiddle to the dim sum. Modern presentation, higher prices. Best for non-traditional dim sum with duck as a side order."
    },
    {
      place: "HK Lounge Bistro",
      mentions: 30,
      approval: 88,
      sample: 6,
      chip: "roast duck",
      asOf: "2026-06",
      note: "SoMa Cantonese spot. Classic roast duck with crackling skin. More traditional preparation than Z&Y — less ceremony but reliable quality."
    }
  ],

  "chn-dimsum": [
    {
      place: "Dragon Beaux",
      mentions: 120,
      approval: 87,
      sample: 8,
      chip: "dim sum",
      asOf: "2026-06",
      note: "Modern dim sum with purple booths and gold pillars. Squid ink-tinted black truffle XLB, charcoal sponge cake rolls. Inventive but pricey. Lines out the door. Lunch only for dim sum."
    },
    {
      place: "bao",
      mentions: 40,
      approval: 88,
      sample: 6,
      chip: "dim sum",
      asOf: "2026-06",
      note: "Mission Dolores dim sum with a modern twist. Smaller menu but well-curated. The bao buns and har gow are excellent."
    },
    {
      place: "HK Lounge Bistro",
      mentions: 35,
      approval: 86,
      sample: 6,
      chip: "dim sum",
      asOf: "2026-06",
      note: "SoMa spot for more traditional Cantonese dim sum. Good har gow, siu mai, char siu bao. Less flashy than Dragon Beaux, more authentic."
    },
    {
      place: "Mama Ji's",
      mentions: 30,
      approval: 83,
      sample: 6,
      chip: "dim sum",
      asOf: "2026-06",
      note: "Eureka Valley Chinese. Dim sum is a draw but the Sichuan dishes steal the show. Good for a crossover meal."
    }
  ],

  "chn-mapo": [
    {
      place: "Henry's Hunan Restaurant",
      mentions: 20,
      approval: 82,
      sample: 6,
      chip: "mapo tofu",
      asOf: "2026-06",
      note: "SF institution since 1974. Bean Curd with Meat Sauce (their mapo tofu) is solid, Hunan-style with a hint of spicy. Under $20 per person. Multiple locations, each independently run."
    },
    {
      place: "ChinoYang's Hunan and Mandarin Cuisine",
      mentions: 15,
      approval: 88,
      sample: 6,
      chip: "tofu",
      asOf: "2026-06",
      note: "Richmond district sleeper. The mapo tofu here is spicier and more numbing than Henry's — closer to authentic Sichuan. Small family-run spot."
    },
    {
      place: "CHEF XIONG KITCHEN 川香園鉄木真",
      mentions: 18,
      approval: 90,
      sample: 6,
      chip: "mapo tofu",
      asOf: "2026-06",
      note: "Richmond Sichuan specialist. The mapo tofu is properly numbing with Sichuan peppercorn — the real deal. Chef Xiong's personal recipes. Worth seeking out."
    },
    {
      place: "Mama Ji's",
      mentions: 25,
      approval: 84,
      sample: 6,
      chip: "mapo tofu",
      asOf: "2026-06",
      note: "Eureka Valley Chinese-Sichuan. Mapo tofu is their most-ordered Sichuan dish. Good heat, decent numbing. More accessible than hardcore Sichuan spots."
    }
  ],

  "chn-wontonnoods": [
    {
      place: "Dumpling Zone",
      mentions: 30,
      approval: 92,
      sample: 6,
      chip: "wonton",
      asOf: "2026-06",
      note: "4.8★ — wonton noodle soup is excellent. Thin-skinned wontons filled with shrimp and pork in a clean, ginger-scented broth. Handmade egg noodles."
    },
    {
      place: "Hai Ky Mi Gia Chinese Cuisine",
      mentions: 55,
      approval: 88,
      sample: 8,
      chip: "wonton noodle",
      asOf: "2026-06",
      note: "Little Saigon institution. Classic Cantonese-Vietnamese wonton noodle soup — clean broth, springy egg noodles, shrimp wontons. No-frills, just quality."
    },
    {
      place: "Kung Food",
      mentions: 35,
      approval: 85,
      sample: 6,
      chip: "wonton",
      asOf: "2026-06",
      note: "Western Addition Chinese. Wonton soup is a comfort-food hit — generous portions, flavorful broth. The spicy wontons in chili oil are also excellent."
    }
  ],

  // ── NEW MEXICAN DISHES ───────────────────────────────────────────────────

  "mex-carnitas": [
    {
      place: "La Taqueria",
      mentions: 80,
      approval: 91,
      sample: 8,
      chip: "carnitas",
      asOf: "2026-06",
      note: "Mission institution since 1973. Carnitas are the star — crispy-edged, tender pork in a riceless burrito. The carnitas super burrito is the order."
    },
    {
      place: "El Metate",
      mentions: 40,
      approval: 93,
      sample: 8,
      chip: "carnitas",
      asOf: "2026-06",
      note: "Bernal Heights gem. Carnitas super burrito with perfectly braised pork. The salsa bar and horchata round out the experience."
    },
    {
      place: "Taqueria Guadalajara",
      mentions: 30,
      approval: 87,
      sample: 6,
      chip: "carnitas",
      asOf: "2026-06",
      note: "Mission corner taqueria with juicy, well-seasoned carnitas. Cash-friendly, no-frills, consistent quality."
    }
  ],

  "mex-tamale": [
    {
      place: "La Palma Mexicatessen",
      mentions: 95,
      approval: 94,
      sample: 8,
      chip: "tamales",
      asOf: "2026-06",
      note: "Mission institution since 1953. Grinds own non-GMO masa daily. Infatuation 8.3/10. Pork tamales called 'a revelation.' Also a tortilleria and market — buy raw masa to make your own at home."
    },
    {
      place: "Donaji",
      mentions: 55,
      approval: 96,
      sample: 8,
      chip: "tamales",
      asOf: "2026-06",
      note: "Michelin-listed. Chef Isai Cuevas started as a farmers market tamale vendor. Infatuation says masa is 'flawless in all its forms.' Creative flavors including Pumpkin Spice. Google 4.6★, TripAdvisor 5.0."
    },
    {
      place: "Nopalito",
      mentions: 25,
      approval: 90,
      sample: 6,
      chip: "tamales",
      asOf: "2026-06",
      note: "Michelin Bib Gourmand. Chef Gonzalo Guzman (Veracruz). Banana leaf tamales with ancho & guajillo chile chicken. Tamal De Rajas (veggie) is beloved. Sister restaurant to Nopa."
    },
    {
      place: "La Oaxaqueña",
      mentions: 70,
      approval: 93,
      sample: 8,
      chip: "tamales",
      asOf: "2026-06",
      note: "Oaxacan specialist in the Mission. Banana leaf-wrapped tamales with complex mole sauces. Google 4.7★. Also runs a farmers market tamale stand."
    }
  ],

  "mex-chilaquiles": [
    {
      place: "el Mil Amores",
      mentions: 60,
      approval: 95,
      sample: 8,
      chip: "chilaquiles",
      asOf: "2026-06",
      note: "Infatuation 9.0 (Best Of The Best). Mission CDMX-style brunch. The CDMX Plate is a 'Godzilla-sized behemoth' with chilaquiles de mole, scrambled eggs, potatoes, concha French toast. Best mole chilaquiles in SF — dried peppers, balanced sweetness, bitter cacao. Latinx & women-owned."
    },
    {
      place: "San Jalisco",
      mentions: 45,
      approval: 92,
      sample: 8,
      chip: "chilaquiles",
      asOf: "2026-06",
      note: "Family-owned since the 1940s. Chilaquiles served all day — perfectly crisp chips smothered in rich red salsa. Chilaquiles Remo (with chicken) is the standout. Enormous portions, unbeatable value."
    },
    {
      place: "Nopalito",
      mentions: 30,
      approval: 90,
      sample: 8,
      chip: "chilaquiles",
      asOf: "2026-06",
      note: "Michelin Bib Gourmand. Chilaquiles rojos en cazuela — 'the spiciest we have tasted.' Handmade tortillas, sustainable sourcing. The most upscale option."
    },
    {
      place: "Primavera",
      mentions: 50,
      approval: 97,
      sample: 6,
      chip: "chilaquiles",
      asOf: "2026-06",
      note: "Saturday-only farmers market stand behind Ferry Building. SF Standard: 'best brunch at the Ferry Building.' Handmade chips that stay crispy under sauce. Refried beans made with lard are legendary. $14. 98% of customers order the chilaquiles."
    },
    {
      place: "Al Carajo",
      mentions: 20,
      approval: 88,
      sample: 6,
      chip: "chilaquiles",
      asOf: "2026-06",
      note: "Yucateco-style. Red chilaquiles topped with chicken tinga with punchy chipotle flavor. Also offers a torta de chilaquiles (chilaquiles in a sandwich!). Tiny counter-service spot."
    }
  ],

  // ── NEW ITALIAN DISHES ───────────────────────────────────────────────────

  "ita-carbonara": [
    {
      place: "Bella Trattoria",
      mentions: 50,
      approval: 93,
      sample: 8,
      chip: "carbonara",
      asOf: "2026-06",
      note: "#1 on Yelp for carbonara in SF. Uniquely offers TWO versions: La Vera Carbonara (purist) and Carbonara Sbagliata (the richer 'wrong' version — crowd favorite). Reviewers compare it to carbonara eaten in Rome. 2,115 Yelp reviews."
    },
    {
      place: "Roma Antica",
      mentions: 50,
      approval: 93,
      sample: 8,
      chip: "carbonara",
      asOf: "2026-06",
      note: "Smoked guanciale with mezze maniche pasta (not spaghetti) — a distinctive Roman twist. 50+ Yelp reviews filtered for carbonara. The owner serenades you in Italian opera."
    },
    {
      place: "Piccolo Forno",
      mentions: 25,
      approval: 88,
      sample: 6,
      chip: "carbonara",
      asOf: "2026-06",
      note: "North Beach hidden gem. Some say 'best carbonara in the city' — good pancetta, light sauce. Also excellent wood-fired pizza. Some inconsistency noted."
    },
    {
      place: "Ideale",
      mentions: 20,
      approval: 90,
      sample: 6,
      chip: "carbonara",
      asOf: "2026-06",
      note: "North Beach Roman restaurant. Traditional carbonara with guanciale. The pasta is made fresh and the execution is textbook."
    }
  ],

  "ita-tiramisu": [
    {
      place: "Stella Pastry & Cafe",
      mentions: 200,
      approval: 92,
      sample: 18,
      chip: "tiramisu",
      asOf: "2026-06",
      note: "North Beach since 1942. Uses vanilla sponge cake instead of ladyfingers — lighter, airier. Espresso and rum soaked layers with mascarpone cream. 3,100+ reviews across platforms. Also famous for trademarked Sacripantina. Grab and go to Washington Square Park."
    },
    {
      place: "Dianda's Italian American Pastry",
      mentions: 120,
      approval: 90,
      sample: 10,
      chip: "tiramisu",
      asOf: "2026-06",
      note: "Mission District since 1962. Classic Luccan recipe — traditional ladyfingers, espresso, rum, mascarpone. Sells out by 1pm daily. Multiple high-end SF restaurants buy their tiramisu wholesale. Heavy coffee flavor. 'Still thinking about it 3 weeks later.'"
    },
    {
      place: "Gold Mirror Restaurant",
      mentions: 45,
      approval: 90,
      sample: 8,
      chip: "tiramisu",
      asOf: "2026-06",
      note: "Taraval/Parkside family-owned since 1969. Housemade with ladyfingers, espresso liqueur, mascarpone cream. Creamy and decadent. Old-world Italian setting. A must-order for dessert."
    }
  ],

  // ── NEW TURKISH DISHES ───────────────────────────────────────────────────

  "tur-borek": [
    {
      place: "Kitchen Istanbul",
      mentions: 85,
      approval: 94,
      sample: 8,
      chip: "börek",
      asOf: "2026-06",
      note: "SF Chronicle Top 100, Michelin Guide listed. Ultra-flaky börek with goat cheese and leek, plus sigara böreği (cheese cigars). Reviewers call the börek 'addictive'. Dinner-only Thu-Mon 5-9:30pm. The most critically acclaimed börek in SF."
    },
    {
      place: "Turquaz SF",
      mentions: 45,
      approval: 92,
      sample: 8,
      chip: "börek",
      asOf: "2026-06",
      note: "Multiple börek varieties: Three Cheese, Anatolian Cheese, Roll Börek. Featured in their Turkish Breakfast Feast. Bakery-first — pastry quality is top-tier."
    },
    {
      place: "Anatolian Table",
      mentions: 30,
      approval: 91,
      sample: 6,
      chip: "börek",
      asOf: "2026-06",
      note: "Mission District newcomer (702 Valencia). Cheese börek is 'crispy, golden, filled with flavor.' Walk-in-only. The Infatuation calls it 'a great catch-all dinner spot.'"
    }
  ],

  "tur-breakfast": [
    {
      place: "Turquaz SF",
      mentions: 70,
      approval: 93,
      sample: 8,
      chip: "Turkish Breakfast",
      asOf: "2026-06",
      note: "THE showstopper. $140 weekend feast for 4+: baked simit, börek, 4 cheeses, olives, pastirma, menemen, honey, kaymak, and a full thermos of Turkish tea in tulip glasses. Feels like Istanbul in SoMa. 7x7's pick for group kahvaltı."
    },
    {
      place: "Lokma",
      mentions: 180,
      approval: 90,
      sample: 8,
      chip: "Turkish Breakfast",
      asOf: "2026-06",
      note: "The OG — popularized Turkish breakfast in SF since 2018. $42 for 2 (Thu-Sun): scrambled eggs with sujuk, feta, olives, muhammara, kaymak, flatbread. Outer Richmond neighborhood gem. 1,020 Yelp reviews."
    },
    {
      place: "Troya",
      mentions: 95,
      approval: 87,
      sample: 8,
      chip: "Turkish Breakfast",
      asOf: "2026-06",
      note: "Pacific Heights scene on Fillmore. $60 family-style breakfast for 2: simit flown in from Turkey, cheese börek, shakshuka with beef sausage. DJ spinning on weekends — brunch-as-lifestyle."
    }
  ],

  // ── NEW INDIAN DISHES ────────────────────────────────────────────────────

  "ind-tandoori": [
    {
      place: "Shalimar",
      mentions: 180,
      approval: 88,
      sample: 8,
      chip: "tandoori chicken",
      asOf: "2026-06",
      note: "Tenderloin legend at 532 Jones St. Real tandoor, no-frills counter service. Tandoori chicken leg called 'probably the best I've ever had' — juicy, tender, nice crust. Garlic naan baked fresh. 1,560 Yelp reviews. The place where char meets affordability."
    },
    {
      place: "Roti Indian Bistro",
      mentions: 110,
      approval: 90,
      sample: 8,
      chip: "tandoori",
      asOf: "2026-06",
      note: "West Portal gem. Uses a MESQUITE-fired clay oven — unique among SF tandoors. Game hen and tandoori specialties are signature. KQED-reviewed. 977 Yelp reviews. The mesquite adds smokiness you won't find elsewhere."
    },
    {
      place: "Himalayan Cuisine SF",
      mentions: 35,
      approval: 91,
      sample: 6,
      chip: "tandoori chicken",
      asOf: "2026-06",
      note: "Newer spot (est. 2022) at 1412 Polk St. Himalayan spice blend marinade — distinct from Punjabi or Pakistani tandoori. Tandoori chicken 'tender and juicy,' served sizzling. 4.9 aggregate rating."
    },
    {
      place: "Amber India",
      mentions: 96,
      approval: 82,
      sample: 8,
      chip: "tandoori chicken",
      asOf: "2026-06",
      note: "Upscale modern Indian at Yerba Buena. 2,427 Yelp reviews. Refined, polished tandoori — the char is there but it's a lunch-buffet-crowd vibe, not street-level smoke."
    }
  ],

  "ind-curry": [
    {
      place: "Pakwan Restaurant",
      mentions: 310,
      approval: 92,
      sample: 8,
      chip: "lamb curry",
      asOf: "2026-06",
      note: "Mission institution at 3180 16th St. Bhuna lamb curry, goat kadahi, mutton curry — all legendary. 'Tender, smoky, perfectly seasoned' lamb, goat curry 'out of this world.' 2,079 Yelp reviews. The definitive SF spot for bold Pakistani-style curries. Hole-in-the-wall, no-holds-barred spice."
    },
    {
      place: "Shalimar",
      mentions: 200,
      approval: 89,
      sample: 8,
      chip: "goat curry",
      asOf: "2026-06",
      note: "Goat karahi has 'sensibly pitched seasoning' with spice that builds, 'the real deal.' Bhuna gosht is the lamb star. Doesn't water down spices. The goat has 'just the right amount of gaminess.'"
    },
    {
      place: "Keeva Indian Kitchen",
      mentions: 85,
      approval: 91,
      sample: 8,
      chip: "lamb rogan josh",
      asOf: "2026-06",
      note: "Inner Richmond at 908 Clement St. Lamb Rogan Josh with Kashmiri chilis — 'satisfying heat that lingers.' The Infatuation highlighted the rogan josh specifically. The refined-but-spicy option: depth without aggression. 814 Yelp reviews."
    }
  ],

  // ── NEW CHINESE DISHES ───────────────────────────────────────────────────

  "chn-bbq": [
    {
      place: "Good Mong Kok Bakery",
      mentions: 250,
      approval: 93,
      sample: 8,
      chip: "char siu bao",
      asOf: "2026-06",
      note: "Chinatown institution at 1039 Stockton. Google 4.2★, 3,850+ Yelp reviews. Baked char siu bao are HUGE and under $4. 'Best char siu bao ever' — Tripadvisor. Line out the door, no seating, cash-speed service. The definitive grab-and-go char siu bao in SF."
    },
    {
      place: "Go Duck Yourself",
      mentions: 95,
      approval: 92,
      sample: 8,
      chip: "roast duck",
      asOf: "2026-06",
      note: "Bernal Heights — Hing Lung Company reborn. SF Chronicle Top 10 Best New Restaurants 2024. Deboned roast duck with plum vinaigrette is required ordering. Crispy, golden skin that crackles. Char siu, siu yuk (roast pork belly), soy sauce chicken all excellent. 218 Yelp reviews. The Cheung brothers carry 40+ years of Chinatown BBQ tradition."
    },
    {
      place: "Quack House",
      mentions: 70,
      approval: 90,
      sample: 6,
      chip: "roast duck",
      asOf: "2026-06",
      note: "Lower Nob Hill (927 Post) — second outpost from Go Duck Yourself / Hing Lung family. Opened Nov 2025. Glistening char siu, crispy pork belly, juicy roast duck with house plum vinaigrette. To-go focused, limited seating. 284 Yelp reviews. Same legendary Cantonese BBQ DNA."
    },
    {
      place: "Wing Lee Bakery",
      mentions: 60,
      approval: 88,
      sample: 6,
      chip: "bbq pork bun",
      asOf: "2026-06",
      note: "Richmond District (503 Clement). 638 Yelp reviews. Frisbee-sized BBQ pork buns — steamed and baked. Cash only, in-and-out with a full meal for under $10. Pillowy bun, savory-tender pork filling. No-frills dim sum factory."
    },
    {
      place: "Cheung Hing",
      mentions: 55,
      approval: 82,
      sample: 8,
      chip: "roast duck",
      asOf: "2026-06",
      note: "Sunset (2339 Noriega). Google 4.1★, 822 Yelp reviews. Hong Kong-style BBQ — roast duck, char siu, roast pork hanging in the window. Authentic HK quality when it's good. Cash only, 3 tiny dine-in tables. Some inconsistency noted — duck can be fatty — but the highs rival anything in Chinatown."
    },
    {
      place: "Hing Lung",
      mentions: 45,
      approval: 88,
      sample: 6,
      chip: "roast pork",
      asOf: "2026-06",
      note: "The original Chinatown BBQ shop (est. 1977, 1261 Stockton). Char siu has caramelized edges, good fat-to-lean ratio. Roast duck and roast pork combo over rice is the go-to. Cash only. Spawned Go Duck Yourself and Quack House."
    },
    {
      place: "New Luen Sing",
      mentions: 30,
      approval: 86,
      sample: 6,
      chip: "bbq pork",
      asOf: "2026-06",
      note: "Chinatown fish market & BBQ counter (1207 Stockton). Google 3.7★. Char siu is consistently good — sweet glaze, tender meat. Duck and soy sauce chicken also reliable. No-frills takeout-heavy, mostly a local secret."
    }
  ],

  "chn-hotpot": [
    {
      place: "IPOT",
      mentions: 120,
      approval: 91,
      sample: 8,
      chip: "hot pot",
      asOf: "2026-06",
      note: "Sunset AYCE hot pot — ~$38 for two broth flavors with endless sliced meats, marinated proteins, and noodles. 'Probably never going to any other AYCE hot pot in SF' — that's a real review. Order via QR code every 15 min. Individual pots for smaller parties."
    },
    {
      place: "Liuyishou Hot Pot",
      mentions: 80,
      approval: 88,
      sample: 8,
      chip: "hot pot",
      asOf: "2026-06",
      note: "Chongqing-style with real mala broth. Premium marbled beef, wild mushrooms, seasonal greens. Main Bay Area location in San Mateo but the quality of broth and ingredients is a cut above most."
    }
  ],

  "chn-congee": [
    {
      place: "Sam Wo Restaurant",
      mentions: 85,
      approval: 82,
      sample: 8,
      chip: "congee",
      asOf: "2026-06",
      note: "Chinatown legend — 100+ years old. Reopened Sep 2025 under new ownership honoring its legacy. Chicken jook with scallions and pork-preserved-egg jook are staples. Mixed reviews on consistency — some say not soupy enough — but the history is unbeatable. 1,450 Yelp reviews."
    },
    {
      place: "Hai Ky Mi Gia Chinese Cuisine",
      mentions: 40,
      approval: 89,
      sample: 6,
      chip: "congee",
      asOf: "2026-06",
      note: "Little Saigon Cantonese-Vietnamese spot. Congee is silky smooth with good depth of flavor. Also excellent for wonton noodles — a two-category contender."
    }
  ]

};

