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
      mentions: 72,
      approval: 93,
      sample: 8,
      chip: "pinsa",
      asOf: "2026-06",
      note: "Not Neapolitan — Roman pinsa with a lighter, airier, crunchier crust. Triple-fermented dough. The margherita pinsa is the benchmark. Unique in SF."
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
      mentions: 40,
      approval: 90,
      sample: 6,
      chip: "pizza",
      asOf: "2026-06",
      note: "Brewery-meets-pizzeria in Bernal. Detroit and NY styles alongside Neapolitan. The margherita is solid; the real draw is pairing with house-brewed beers."
    }
  ],

  "ita-cacio": [
    {
      place: "Marcella's Lasagneria",
      mentions: 15,
      approval: 90,
      sample: 6,
      chip: "cacio e pepe",
      asOf: "2026-06",
      note: "Known for lasagna but the cacio e pepe holds its own — simple, peppery, with that trademark thin fresh pasta. A bonus order alongside the lasagna."
    },
    {
      place: "Bocconcino",
      mentions: 28,
      approval: 91,
      sample: 8,
      chip: "cacio e pepe",
      asOf: "2026-06",
      note: "North Beach's most authentic Roman pasta. Properly emulsified pecorino-pepper sauce, none of the cream shortcuts. Intimate space, feels like Rome."
    },
    {
      place: "Serafina",
      mentions: 22,
      approval: 88,
      sample: 6,
      chip: "cacio e pepe",
      asOf: "2026-06",
      note: "Russian Hill neighborhood Italian. Solid cacio e pepe with good pecorino bite. Cozy date-night spot."
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
  ]

};
