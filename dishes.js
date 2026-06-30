/* =========================================================================
   DISH CATALOG  —  drives the live Google Places queries.
   Signature dishes only — the iconic, must-try items per cuisine.
   For each dish:
     id        unique key (stable, used by the app)
     name      display name
     emoji     tile icon
     query     the Places "Text Search" string (dish + "San Francisco")
     keywords  terms used to (a) keep only on-topic places and
               (b) find a review quote that actually mentions the dish
   Add / remove dishes here — the generator picks them up automatically.
   ========================================================================= */
module.exports = {
  mexican: {
    label: "Mexican",
    dishes: [
      { id:"mex-burrito",  name:"Mission Burrito",            emoji:"🌯", query:"mission burrito taqueria San Francisco",        keywords:["burrito","mission","super burrito"] },
      { id:"mex-asada",    name:"Carne Asada",                emoji:"🥩", query:"carne asada tacos burrito San Francisco",        keywords:["carne asada","asada","steak"] },
      { id:"mex-birria",   name:"Quesabirria / Birria Tacos", emoji:"🧀", query:"birria quesabirria tacos San Francisco",         keywords:["birria","quesabirria","consome","consomé"] },
      { id:"mex-pastor",   name:"Al Pastor",                  emoji:"🌮", query:"al pastor tacos San Francisco",                  keywords:["al pastor","pastor","trompo"] },
      { id:"mex-mole",     name:"Mole & Enchiladas",          emoji:"🫕", query:"mole enchiladas oaxacan San Francisco",          keywords:["mole","enchilada","oaxac"] },
      { id:"mex-carnitas", name:"Carnitas",                   emoji:"🐷", query:"carnitas tacos burrito San Francisco",           keywords:["carnitas","pork","chicharron"] },
      { id:"mex-tamale",   name:"Tamales",                    emoji:"🫔", query:"tamales Mexican San Francisco",                  keywords:["tamale","tamales","masa"] },
      { id:"mex-chilaquiles", name:"Chilaquiles",              emoji:"🍳", query:"chilaquiles Mexican brunch San Francisco",       keywords:["chilaquiles","huevos"] }
    ]
  },

  italian: {
    label: "Italian",
    dishes: [
      { id:"ita-neapolitan",  name:"Neapolitan Pizza",                 emoji:"🍕", query:"neapolitan margherita pizza wood fired oven pizzeria San Francisco",  keywords:["neapolitan","napoletana","margherita","wood fired","VPN","blistered","pizza"] },
      { id:"ita-detroit",     name:"Detroit-Style Pizza",               emoji:"🟥", query:"detroit style square pan pizza pepperoni San Francisco",  keywords:["detroit","detroit style","square","pan","cheese crust","pizza"] },
      { id:"ita-nyslice",     name:"NY Slice & Classic Pizza",          emoji:"🍕", query:"pizza by the slice new york style San Francisco",        keywords:["slice","new york","NY","foldable","by the slice","pizza"] },
      { id:"ita-cacio",      name:"Cacio e Pepe",                    emoji:"🧀", query:"cacio e pepe tonnarelli Roman pasta restaurant San Francisco", keywords:["cacio e pepe","pecorino","pepe","tonnarelli"] },
      { id:"ita-bolognese",  name:"Tagliatelle Bolognese & Ragu",    emoji:"🍝", query:"tagliatelle bolognese ragu pasta San Francisco", keywords:["bolognese","ragu","ragù","tagliatelle","pappardelle"] },
      { id:"ita-lasagna",    name:"Lasagna",                         emoji:"🍲", query:"lasagna San Francisco",                       keywords:["lasagna","lasagne"] },
      { id:"ita-cioppino",   name:"Cioppino",                        emoji:"🦀", query:"cioppino seafood stew San Francisco",         keywords:["cioppino","crab","dungeness"] },
      { id:"ita-carbonara",  name:"Carbonara",                       emoji:"🥚", query:"carbonara pasta San Francisco",               keywords:["carbonara","guanciale","pancetta","egg"] },
      { id:"ita-tiramisu",   name:"Tiramisu",                        emoji:"🍰", query:"tiramisu Italian bakery pastry cafe San Francisco",  keywords:["tiramisu","tiramisù","mascarpone","ladyfinger"] }
    ]
  },

  turkish: {
    label: "Turkish",
    dishes: [
      { id:"tur-lahmacun",  name:"Lahmacun",                    emoji:"🫓", query:"lahmacun turkish San Francisco",               keywords:["lahmacun"] },
      { id:"tur-pide",      name:"Pide",                        emoji:"🛶", query:"pide turkish San Francisco",                   keywords:["pide"] },
      { id:"tur-adana",     name:"Adana / Lamb Shish Kebab",    emoji:"🍢", query:"adana lamb shish kebab turkish San Francisco", keywords:["adana","kebab","shish","kebap"] },
      { id:"tur-doner",     name:"Doner Kebab",                 emoji:"🌯", query:"doner kebab San Francisco",                    keywords:["doner","döner","durum"] },
      { id:"tur-baklava",   name:"Baklava",                     emoji:"🍯", query:"baklava turkish San Francisco",                keywords:["baklava"] },
      { id:"tur-borek",     name:"Börek",                       emoji:"🥧", query:"borek turkish pastry San Francisco",           keywords:["borek","börek","burek","sigara"] },
      { id:"tur-breakfast", name:"Turkish Breakfast",            emoji:"☕", query:"turkish breakfast kahvalti San Francisco",      keywords:["breakfast","kahvalti","kahvaltı","menemen","sucuk"] }
    ]
  },

  indian: {
    label: "Indian",
    dishes: [
      { id:"ind-butter-chicken", name:"Butter Chicken & Tikka Masala", emoji:"🍛", query:"butter chicken tikka masala Indian restaurant San Francisco",       keywords:["butter chicken","tikka masala","murgh makhani","makhani"] },
      { id:"ind-biryani",        name:"Biryani",                       emoji:"🍚", query:"biryani dum biryani Indian restaurant San Francisco",               keywords:["biryani","dum biryani","hyderabadi biryani","pulao"] },
      { id:"ind-dosa",           name:"Masala Dosa",                   emoji:"🫓", query:"masala dosa south Indian restaurant San Francisco",                 keywords:["dosa","masala dosa","idli","vada","uttapam"] },
      { id:"ind-chaat",          name:"Chaat & Pani Puri",             emoji:"🥙", query:"chaat pani puri bhel puri Indian snacks San Francisco",            keywords:["chaat","pani puri","bhel puri","sev puri","golgappa","aloo tikki"] },
      { id:"ind-saag",           name:"Saag Paneer & Dal Makhani",     emoji:"🫕", query:"saag paneer dal makhani palak paneer Indian restaurant San Francisco", keywords:["saag paneer","dal makhani","palak paneer","paneer","makhani dal"] },
      { id:"ind-tandoori",       name:"Tandoori & Naan",               emoji:"🔥", query:"tandoori chicken naan bread Indian restaurant San Francisco",      keywords:["tandoori","naan","tandoor","garlic naan","chicken tikka"] },
      { id:"ind-curry",          name:"Lamb / Goat Curry",             emoji:"🍖", query:"lamb curry goat curry Indian restaurant San Francisco",            keywords:["lamb curry","goat curry","rogan josh","vindaloo","lamb","goat"] }
    ]
  },

  chinese: {
    label: "Chinese",
    dishes: [
      { id:"chn-xiaolongbao", name:"Xiao Long Bao",              emoji:"🥟", query:"xiao long bao soup dumplings San Francisco",                    keywords:["xiao long bao","xlb","soup dumpling","xiaolongbao"] },
      { id:"chn-roastduck",   name:"Peking / Roast Duck",        emoji:"🦆", query:"peking duck roast duck Chinese San Francisco",                  keywords:["peking duck","roast duck","duck","crispy duck"] },
      { id:"chn-dimsum",      name:"Dim Sum",                    emoji:"🧋", query:"dim sum yum cha Chinese San Francisco",                         keywords:["dim sum","har gow","siu mai","char siu bao","yum cha","dumpling"] },
      { id:"chn-mapo",        name:"Mapo Tofu & Sichuan",        emoji:"🌶️", query:"mapo tofu sichuan szechuan San Francisco",                      keywords:["mapo tofu","mapo","sichuan","szechuan","numbing","mala"] },
      { id:"chn-wontonnoods", name:"Wonton Noodle Soup",         emoji:"🍜", query:"wonton noodle soup Chinese San Francisco",                      keywords:["wonton","wonton noodle","won ton","dumpling noodle","wonton soup"] },
      { id:"chn-bbq",         name:"Char Siu & BBQ",             emoji:"🍖", query:"char siu chinese bbq roast pork San Francisco Chinatown",       keywords:["char siu","bbq","roast pork","bbq pork","cha siu","叉燒"] },
      { id:"chn-hotpot",      name:"Hot Pot",                    emoji:"🫕", query:"hot pot hotpot Chinese San Francisco",                          keywords:["hot pot","hotpot","shabu","火锅"] },
      { id:"chn-congee",      name:"Congee & Jook",              emoji:"🥣", query:"congee jook rice porridge Chinese San Francisco",               keywords:["congee","jook","porridge","粥"] }
    ]
  },

  japanese: {
    label: "Japanese",
    dishes: [
      { id:"jpn-ramen",     name:"Tonkotsu & Specialty Ramen",  emoji:"🍜", query:"best ramen tonkotsu San Francisco",                             keywords:["tonkotsu","ramen","tori paitan","chashu","pork broth","tsukemen"] },
      { id:"jpn-omakase",   name:"Omakase Sushi",               emoji:"🍣", query:"omakase sushi San Francisco",                                   keywords:["omakase","sushi","nigiri","edomae","tasting menu"] },
      { id:"jpn-izakaya",   name:"Izakaya & Yakitori",          emoji:"🍢", query:"izakaya yakitori San Francisco",                                keywords:["izakaya","yakitori","skewers","grilled chicken","binchotan"] },
      { id:"jpn-curry",     name:"Japanese Curry",               emoji:"🍛", query:"japanese curry katsu curry San Francisco",                      keywords:["japanese curry","katsu curry","curry rice","tonkatsu curry"] },
      { id:"jpn-udon",      name:"Handmade Udon",               emoji:"🍲", query:"udon noodles handmade San Francisco",                          keywords:["udon","thick noodles","tempura udon","curry udon","dashi"] },
      { id:"jpn-tonkatsu",  name:"Tonkatsu & Katsu Sando",      emoji:"🥩", query:"tonkatsu katsu sando pork cutlet San Francisco",                keywords:["tonkatsu","katsu sando","panko","pork cutlet"] },
      { id:"jpn-matcha",    name:"Matcha Desserts",              emoji:"🍵", query:"matcha desserts soft serve San Francisco",                      keywords:["matcha","soft serve","mochi","green tea","parfait"] },
      { id:"jpn-matchalatte", name:"Matcha Latte",              emoji:"🍵", query:"matcha latte cafe San Francisco",                                keywords:["matcha latte","matcha","ceremonial grade","oat milk matcha","iced matcha"] },
      { id:"jpn-takoyaki",  name:"Takoyaki & Japantown Snacks",  emoji:"🐙", query:"takoyaki Japantown street food San Francisco",                  keywords:["takoyaki","octopus balls","mochi donuts","taiyaki"] }
    ]
  },

  korean: {
    label: "Korean",
    dishes: [
      { id:"kor-bbq",       name:"Korean BBQ",                  emoji:"🥩", query:"Korean BBQ galbi bulgogi San Francisco",                        keywords:["galbi","bulgogi","korean bbq","kalbi","samgyeopsal","bbq"] },
      { id:"kor-friedchx",  name:"Korean Fried Chicken",        emoji:"🍗", query:"Korean fried chicken San Francisco",                            keywords:["korean fried chicken","KFC","yangnyeom","crispy chicken","double fried"] },
      { id:"kor-bibimbap",  name:"Bibimbap",                    emoji:"🍚", query:"bibimbap dolsot stone pot Korean San Francisco",                keywords:["bibimbap","dolsot","stone pot","rice bowl","gochujang"] },
      { id:"kor-jjigae",    name:"Kimchi Jjigae & Stews",       emoji:"🫕", query:"kimchi jjigae sundubu Korean stew San Francisco",               keywords:["jjigae","kimchi jjigae","sundubu","tofu stew","budae"] },
      { id:"kor-tteokbokki", name:"Tteokbokki & Street Food",   emoji:"🌶️", query:"tteokbokki Korean street food San Francisco",                   keywords:["tteokbokki","rice cake","hotteok","corn dog","street food"] },
      { id:"kor-kbbqtaco",  name:"Korean Fusion Tacos",         emoji:"🌮", query:"Korean fusion tacos short rib San Francisco",                   keywords:["korean taco","short rib","fusion","ssam","gochujang"] }
    ]
  },

  vietnamese: {
    label: "Vietnamese",
    dishes: [
      { id:"viet-pho",      name:"Pho",                         emoji:"🍜", query:"pho Vietnamese noodle soup San Francisco",                      keywords:["pho","pho bo","pho ga","beef noodle","rare steak"] },
      { id:"viet-banhmi",   name:"Banh Mi",                     emoji:"🥖", query:"banh mi Vietnamese sandwich San Francisco",                     keywords:["banh mi","baguette","pate","vietnamese sandwich"] },
      { id:"viet-bunbohue", name:"Bun Bo Hue",                  emoji:"🥣", query:"bun bo hue Vietnamese spicy noodle San Francisco",              keywords:["bun bo hue","spicy beef","lemongrass","hue"] },
      { id:"viet-comtam",   name:"Com Tam (Broken Rice)",        emoji:"🍚", query:"com tam broken rice Vietnamese San Francisco",                  keywords:["com tam","broken rice","suon","grilled pork","rice plate"] },
      { id:"viet-garlicnoodle", name:"Garlic Noodles & Roast Crab", emoji:"🦀", query:"garlic noodles roast crab Vietnamese San Francisco",            keywords:["garlic noodles","roast crab","dungeness","butter garlic"] },
      { id:"viet-banhxeo",  name:"Banh Xeo",                    emoji:"🥞", query:"banh xeo Vietnamese crepe San Francisco",                       keywords:["banh xeo","crepe","sizzling","turmeric","crispy"] },
      { id:"viet-coffee",   name:"Vietnamese Coffee",            emoji:"☕", query:"vietnamese coffee ca phe sua da San Francisco",                  keywords:["ca phe","vietnamese coffee","condensed milk","egg coffee","sua da"] }
    ]
  }
};
