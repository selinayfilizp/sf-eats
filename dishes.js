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
      { id:"ita-pizza",      name:"Pizza",                           emoji:"🍕", query:"best pizza San Francisco",                    keywords:["pizza","margherita","neapolitan","napoletana","detroit","slice","pie"] },
      { id:"ita-cacio",      name:"Cacio e Pepe",                    emoji:"🧀", query:"cacio e pepe pasta San Francisco",            keywords:["cacio e pepe","pecorino","pepe"] },
      { id:"ita-bolognese",  name:"Tagliatelle Bolognese & Ragu",    emoji:"🍝", query:"tagliatelle bolognese ragu pasta San Francisco", keywords:["bolognese","ragu","ragù","tagliatelle","pappardelle"] },
      { id:"ita-lasagna",    name:"Lasagna",                         emoji:"🍲", query:"lasagna San Francisco",                       keywords:["lasagna","lasagne"] },
      { id:"ita-cioppino",   name:"Cioppino",                        emoji:"🦀", query:"cioppino seafood stew San Francisco",         keywords:["cioppino","crab","dungeness"] },
      { id:"ita-carbonara",  name:"Carbonara",                       emoji:"🥚", query:"carbonara pasta San Francisco",               keywords:["carbonara","guanciale","pancetta","egg"] },
      { id:"ita-tiramisu",   name:"Tiramisu",                        emoji:"🍰", query:"tiramisu Italian dessert San Francisco",      keywords:["tiramisu","tiramisù","mascarpone","ladyfinger"] }
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
  }
};
