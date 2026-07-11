/* Michelin sourcing research — where SF's starred restaurants buy their ingredients.
   Built from public reporting, restaurant websites, and market records.
   AUTO-GENERATED from Codex research pass, July 2026. */

window.MICHELIN_SOURCES = {
  updatedAt: "2026-07-10",

  places: [
    {
      id: "ferry-plaza",
      name: "Ferry Plaza Farmers Market",
      type: "Farmers market",
      lat: 37.7955, lng: -122.3937,
      visit: "Sat 8am-2pm, Tue & Thu 10am-2pm",
      publicAccess: true,
      why: "Central chef-shopping market with 100+ Saturday vendors. State Bird's archival shopping trail documents named farmer purchases here.",
      connectedRestaurants: ["State Bird Provisions", "The Progress", "Nisei", "Sorrel", "Wolfsbane"]
    },
    {
      id: "tierra",
      name: "Tierra Vegetables",
      type: "Farm + market seller",
      lat: 38.4597, lng: -122.7061,
      visit: "Farmstand, CSA, Ferry Plaza Sat, Alemany Sat",
      publicAccess: true,
      why: "Heirloom corn, masa, cornmeal, chiles, dried beans. Publicly tied to Californios, Lazy Bear, Mister Jiu's, and Nisei.",
      connectedRestaurants: ["Californios", "Lazy Bear", "Mister Jiu's", "Nisei"]
    },
    {
      id: "niku-shop",
      name: "The Butcher Shop by Niku",
      type: "Retail butcher",
      lat: 37.7696, lng: -122.4023,
      visit: "Tue-Sun retail hours",
      publicAccess: true,
      why: "Retail access to Niku's meat program, including Japanese A5 wagyu from named farms.",
      connectedRestaurants: ["Niku Steakhouse"]
    },
    {
      id: "root-down",
      name: "Root Down Farm",
      type: "Pasture ranch + market seller",
      lat: 37.257, lng: -122.383,
      visit: "Ferry Plaza Sat, Clement St Sun; farm by appointment",
      publicAccess: true,
      why: "Pasture-raised chicken, duck, pork, turkey. Historical Root Down chicken menu mention at Hilda and Jesse.",
      connectedRestaurants: ["Hilda and Jesse"]
    },
    {
      id: "fresh-run",
      name: "Fresh Run Farm",
      type: "Private partner farm",
      lat: 37.909, lng: -122.686,
      visit: "Private: restaurant farm only",
      publicAccess: false,
      why: "Bolinas farm producing 40+ varieties of organic fruit, vegetables, and flowers exclusively for Chef Tusk's restaurants.",
      connectedRestaurants: ["Quince"]
    },
    {
      id: "bleu-belle",
      name: "Bleu Belle Farm",
      type: "Private restaurant farm",
      lat: 38.292, lng: -122.458,
      visit: "Private: Crenn Dining Group farm",
      publicAccess: false,
      why: "Sonoma farm inspiring Atelier Crenn menus with produce, herbs, flowers, and regenerative agriculture.",
      connectedRestaurants: ["Atelier Crenn"]
    },
    {
      id: "mariquita",
      name: "Mariquita Farm",
      type: "Specialty farm",
      lat: 36.929, lng: -121.776,
      visit: "Limited public programs; verify current availability",
      publicAccess: true,
      why: "Historical State Bird delivery source for broccoli di ciccio, napa cabbage, and other produce.",
      connectedRestaurants: ["State Bird Provisions"]
    }
  ],

  restaurants: {
    "Atelier Crenn":       { evidence: "direct",     confidence: "strong", ingredients: "Fruit, vegetables, herbs, flowers", places: ["bleu-belle"], summary: "Menus linked to Crenn's Bleu Belle Farm in Sonoma." },
    "Benu":                { evidence: "gap",        confidence: "gap",    ingredients: "Needs outreach", places: [], summary: "Named food-source disclosure not found in public reporting." },
    "Californios":         { evidence: "direct",     confidence: "strong", ingredients: "Heirloom corn, masa, cornmeal", places: ["tierra"], summary: "Val Cantu publicly tied to Tierra Vegetables' heirloom corn and masa." },
    "Quince":              { evidence: "direct",     confidence: "strong", ingredients: "Organic fruit, vegetables, flowers", places: ["fresh-run"], summary: "Publishes its Fresh Run Farm partnership in Bolinas, 40+ varieties." },
    "Acquerello":          { evidence: "gap",        confidence: "gap",    ingredients: "Needs outreach", places: [], summary: "No named supplier relationship verified in public sources." },
    "Birdsong":            { evidence: "general",    confidence: "medium", ingredients: "Seasonal produce, whole animals, seafood", places: [], summary: "Focuses on whole ingredients from ecosystem-minded producers." },
    "Kiln":                { evidence: "general",    confidence: "medium", ingredients: "Local produce, meats, wild seafood", places: [], summary: "Ingredient-driven cooking with local produce, but no named supplier list." },
    "Lazy Bear":           { evidence: "direct",     confidence: "strong", ingredients: "Bay Area seasonal; Tierra heirloom crops", places: ["tierra"], summary: "David Barzelay has been a Tierra Vegetables customer for nearly two decades." },
    "Saison":              { evidence: "general",    confidence: "medium", ingredients: "Farm, ranch, and seafood products", places: [], summary: "Emphasizes California terroir without naming a public supplier list." },
    "Sons & Daughters":    { evidence: "historical", confidence: "medium", ingredients: "Seasonal Californian produce", places: [], summary: "Historical ties to Dark Hill Farm; needs reverification after relocation." },
    "7 Adams":             { evidence: "gap",        confidence: "gap",    ingredients: "Needs outreach", places: [], summary: "Seasonal, ingredient-driven, but named sources not verified." },
    "Angler":              { evidence: "general",    confidence: "medium", ingredients: "Seafood, meat, seasonal produce", places: [], summary: "Describes deliberate seasonal sourcing for seafood-focused, live-fire cooking." },
    "Hilda and Jesse":     { evidence: "historical", confidence: "medium", ingredients: "Pasture-raised chicken", places: ["root-down"], summary: "A 2021 menu named Root Down Farm chicken; current status needs reverification." },
    "Kin Khao":            { evidence: "gap",        confidence: "gap",    ingredients: "Needs outreach", places: [], summary: "Seasonal produce and Thai pantry, but named sources not verified." },
    "Mister Jiu's":        { evidence: "historical", confidence: "medium", ingredients: "Tierra produce (needs direct confirmation)", places: ["tierra"], summary: "Brandon Jew named among chefs supporting Tierra Vegetables." },
    "Restaurant Naides":   { evidence: "general",    confidence: "medium", ingredients: "Foraged wild ingredients, Filipino pantry", places: [], summary: "Foraged local ingredients and preserved wild ingredients from near Lake Tahoe." },
    "Nari":                { evidence: "general",    confidence: "medium", ingredients: "California seasonal produce, Thai pantry", places: ["ferry-plaza"], summary: "Works with local farmers, incorporates California seasonal produce into Thai dishes." },
    "Niku Steakhouse":     { evidence: "direct",     confidence: "strong", ingredients: "Japanese A5 wagyu, domestic wagyu, pork", places: ["niku-shop"], summary: "Public retail butcher shop lists named Japanese farm partnerships." },
    "Nisei":               { evidence: "general",    confidence: "medium", ingredients: "Market produce, Japanese-Californian ingredients", places: ["ferry-plaza", "tierra"], summary: "Sells a 'Day in the Life' experience starting at the farmers market." },
    "The Progress":        { evidence: "general",    confidence: "medium", ingredients: "Whole animal, whole vegetable", places: ["ferry-plaza"], summary: "Whole-animal and whole-vegetable menus defined by local farm relationships." },
    "San Ho Won":          { evidence: "gap",        confidence: "gap",    ingredients: "Needs outreach", places: [], summary: "Local ingredient use and house kimchi, but named sources not verified." },
    "Sorrel":              { evidence: "general",    confidence: "strong", ingredients: "Market produce, foraged items, rooftop garden", places: ["ferry-plaza"], summary: "Works with Bay Area farmers markets and maintains a rooftop garden." },
    "Ssal":                { evidence: "gap",        confidence: "gap",    ingredients: "Needs outreach", places: [], summary: "Korean flavors through NorCal seasonality, but named sources not verified." },
    "State Bird Provisions": { evidence: "historical", confidence: "strong", ingredients: "Citrus, avocados, beets, napa cabbage, asparagus, bread", places: ["ferry-plaza", "mariquita"], summary: "Eater documented a detailed market walk naming Brokaw, Dirty Girl, Mariquita, Zuckerman's, Knoll, Acme, and more." },
    "Wolfsbane":           { evidence: "general",    confidence: "medium", ingredients: "NorCal seasonal produce", places: ["ferry-plaza"], summary: "Chef told ABC7 the team goes to farmers markets several times a week." }
  }
};
