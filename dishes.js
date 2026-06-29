/* =========================================================================
   DISH CATALOG  —  drives the live Google Places queries.
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
      { id:"mex-carnitas", name:"Carnitas",                   emoji:"🐖", query:"carnitas tacos burrito San Francisco",           keywords:["carnitas","pork","chicharron"] },
      { id:"mex-ceviche",  name:"Ceviche & Aguachile",        emoji:"🦐", query:"ceviche aguachile mariscos San Francisco",       keywords:["ceviche","aguachile","mariscos","tostada"] },
      { id:"mex-tamales",  name:"Tamales",                    emoji:"🫔", query:"tamales San Francisco",                          keywords:["tamal","tamales","masa"] },
      { id:"mex-mole",     name:"Mole & Enchiladas",          emoji:"🫕", query:"mole enchiladas oaxacan San Francisco",          keywords:["mole","enchilada","oaxac"] },
      { id:"mex-horchata", name:"Horchata & Aguas Frescas",   emoji:"🥛", query:"horchata aguas frescas taqueria San Francisco",  keywords:["horchata","agua fresca","aguas frescas"] }
    ]
  },

  italian: {
    label: "Italian",
    dishes: [
      { id:"ita-pizza",     name:"Neapolitan / Margherita Pizza", emoji:"🍕", query:"neapolitan margherita pizza San Francisco",   keywords:["pizza","margherita","neapolitan","napoletana"] },
      { id:"ita-focaccia",  name:"Focaccia",                      emoji:"🫓", query:"focaccia bakery San Francisco",               keywords:["focaccia","schiacciata"] },
      { id:"ita-cacio",     name:"Cacio e Pepe",                  emoji:"🧀", query:"cacio e pepe pasta San Francisco",            keywords:["cacio e pepe","pecorino","pepe"] },
      { id:"ita-bolognese", name:"Tagliatelle Bolognese & Ragu",  emoji:"🍝", query:"tagliatelle bolognese ragu pasta San Francisco", keywords:["bolognese","ragu","ragù","tagliatelle","pappardelle"] },
      { id:"ita-squidink",  name:"Squid Ink Pasta",               emoji:"🦑", query:"squid ink pasta San Francisco",               keywords:["squid ink","nero","seppia"] },
      { id:"ita-gnocchi",   name:"Gnocchi",                       emoji:"🥔", query:"gnocchi San Francisco",                       keywords:["gnocchi"] },
      { id:"ita-lasagna",   name:"Lasagna",                       emoji:"🍲", query:"lasagna San Francisco",                       keywords:["lasagna","lasagne"] },
      { id:"ita-ravioli",   name:"Ravioli / Agnolotti",           emoji:"🥟", query:"ravioli agnolotti pasta San Francisco",       keywords:["ravioli","agnolotti","raviolo","plin"] },
      { id:"ita-burrata",   name:"Burrata",                       emoji:"🧆", query:"burrata San Francisco",                       keywords:["burrata"] },
      { id:"ita-cioppino",  name:"Cioppino",                      emoji:"🦀", query:"cioppino seafood stew San Francisco",         keywords:["cioppino","crab","dungeness"] }
    ]
  },

  turkish: {
    label: "Turkish",
    dishes: [
      { id:"tur-manti",     name:"Manti (dumplings)",        emoji:"🥟", query:"manti turkish dumplings San Francisco",        keywords:["manti","dumpling"] },
      { id:"tur-lahmacun",  name:"Lahmacun",                 emoji:"🫓", query:"lahmacun turkish San Francisco",               keywords:["lahmacun"] },
      { id:"tur-pide",      name:"Pide",                     emoji:"🛶", query:"pide turkish San Francisco",                   keywords:["pide"] },
      { id:"tur-breakfast", name:"Turkish Breakfast",        emoji:"🍳", query:"turkish breakfast kahvalti San Francisco",     keywords:["turkish breakfast","kahvalti","menemen","simit"] },
      { id:"tur-borek",     name:"Börek",                    emoji:"🥐", query:"borek turkish San Francisco",                  keywords:["borek","börek"] },
      { id:"tur-adana",     name:"Adana / Lamb Shish Kebab", emoji:"🍢", query:"adana lamb shish kebab turkish San Francisco", keywords:["adana","kebab","shish","kebap"] },
      { id:"tur-doner",     name:"Doner Kebab",              emoji:"🌯", query:"doner kebab San Francisco",                    keywords:["doner","döner","durum"] },
      { id:"tur-lambchops", name:"Lamb Chops",               emoji:"🍖", query:"turkish lamb chops San Francisco",             keywords:["lamb chop"] },
      { id:"tur-lentil",    name:"Red Lentil Soup",          emoji:"🍜", query:"turkish red lentil soup mercimek San Francisco", keywords:["lentil","mercimek"] },
      { id:"tur-baklava",   name:"Baklava",                  emoji:"🍯", query:"baklava turkish San Francisco",                keywords:["baklava"] }
    ]
  }
};
