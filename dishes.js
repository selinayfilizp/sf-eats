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
      { id:"mex-mole",     name:"Mole & Enchiladas",          emoji:"🫕", query:"mole enchiladas oaxacan San Francisco",          keywords:["mole","enchilada","oaxac"] }
    ]
  },

  italian: {
    label: "Italian",
    dishes: [
      { id:"ita-pizza",     name:"Neapolitan / Margherita Pizza", emoji:"🍕", query:"neapolitan margherita pizza San Francisco",   keywords:["pizza","margherita","neapolitan","napoletana"] },
      { id:"ita-cacio",     name:"Cacio e Pepe",                  emoji:"🧀", query:"cacio e pepe pasta San Francisco",            keywords:["cacio e pepe","pecorino","pepe"] },
      { id:"ita-bolognese", name:"Tagliatelle Bolognese & Ragu",  emoji:"🍝", query:"tagliatelle bolognese ragu pasta San Francisco", keywords:["bolognese","ragu","ragù","tagliatelle","pappardelle"] },
      { id:"ita-lasagna",   name:"Lasagna",                       emoji:"🍲", query:"lasagna San Francisco",                       keywords:["lasagna","lasagne"] },
      { id:"ita-cioppino",  name:"Cioppino",                      emoji:"🦀", query:"cioppino seafood stew San Francisco",         keywords:["cioppino","crab","dungeness"] }
    ]
  },

  turkish: {
    label: "Turkish",
    dishes: [
      { id:"tur-lahmacun",  name:"Lahmacun",                 emoji:"🫓", query:"lahmacun turkish San Francisco",               keywords:["lahmacun"] },
      { id:"tur-pide",      name:"Pide",                     emoji:"🛶", query:"pide turkish San Francisco",                   keywords:["pide"] },
      { id:"tur-adana",     name:"Adana / Lamb Shish Kebab", emoji:"🍢", query:"adana lamb shish kebab turkish San Francisco", keywords:["adana","kebab","shish","kebap"] },
      { id:"tur-doner",     name:"Doner Kebab",              emoji:"🌯", query:"doner kebab San Francisco",                    keywords:["doner","döner","durum"] },
      { id:"tur-baklava",   name:"Baklava",                  emoji:"🍯", query:"baklava turkish San Francisco",                keywords:["baklava"] }
    ]
  },

  indian: {
    label: "Indian",
    dishes: [
      { id:"ind-butter-chicken", name:"Butter Chicken",       emoji:"🧡", query:"butter chicken murgh makhani Indian restaurant San Francisco",  keywords:["butter chicken","makhani","murgh makhani"] },
      { id:"ind-biryani",        name:"Biryani",              emoji:"🍛", query:"biryani dum biryani Indian restaurant San Francisco",            keywords:["biryani","dum biryani","basmati"] },
      { id:"ind-tikka-masala",   name:"Chicken Tikka Masala", emoji:"🍲", query:"chicken tikka masala curry Indian San Francisco",                keywords:["tikka masala","tikka","masala"] },
      { id:"ind-dosa",           name:"Masala Dosa",          emoji:"🫓", query:"masala dosa south indian restaurant San Francisco",              keywords:["dosa","masala dosa","dosai"] },
      { id:"ind-samosa",         name:"Samosa",               emoji:"🥟", query:"samosa Indian appetizer San Francisco",                          keywords:["samosa","samosas","chaat"] }
    ]
  }
};
