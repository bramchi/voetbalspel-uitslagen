const home_scoring_base_chance = 0.115;
const away_scoring_base_chance = 0.085;
const random_scoring_attempts_min = 6;
const random_scoring_attempts_max = 18;
const surprise_factors = [
  {
    factor: 1,
    weight: 16
  },
  {
    factor: 1.1,
    weight: 13
  },
  {
    factor: 1.2,
    weight: 11
  },
  {
    factor: 1.3,
    weight: 9
  },
  {
    factor: 1.4,
    weight: 6
  },
  {
    factor: 1.5,
    weight: 3
  },
  {
    factor: 0.9,
    weight: 13
  },
  {
    factor: 0.8,
    weight: 11
  },
  {
    factor: 0.7,
    weight: 9
  },
  {
    factor: 0.6,
    weight: 6
  },
  {
    factor: 0.5,
    weight: 3
  }
];

const weights = {
  scoring: [
    {
      name: "goalkeepers",
      weight: 1
    },
    {
      name: "defenders",
      weight: 20
    },
    {
      name: "midfielders",
      weight: 40
    },
    {
      name: "forwards",
      weight: 60
    }
  ],
  yellow: [
    {
      name: "goalkeepers",
      weight: 1
    },
    {
      name: "defenders",
      weight: 8
    },
    {
      name: "midfielders",
      weight: 5
    },
    {
      name: "forwards",
      weight: 3
    }
  ],
  red: [
    {
      name: "goalkeepers",
      weight: 1
    },
    {
      name: "defenders",
      weight: 2
    },
    {
      name: "midfielders",
      weight: 1
    },
    {
      name: "forwards",
      weight: 1
    }
  ]
};

const german_competition = [
  {
    name: "FC Bayern München",
    strength: 91,
    players: {
      goalkeepers: [{ name: "Neuer", strength: 70 }],
      defenders: [
        { name: "Alaba", strength: 70 },
        { name: "Süle", strength: 70 },
        { name: "Davis", strength: 70 }
      ],
      midfielders: [
        { name: "Kimmich", strength: 70 },
        { name: "Müller", strength: 70 },
        { name: "Goretzka", strength: 70 }
      ],
      forwards: [
        { name: "Sané", strength: 70 },
        { name: "Gnabri", strength: 70 },
        { name: "Lewandowski", strength: 70 }
      ]
    }
  },
  {
    name: "Borussia Dortmund",
    strength: 81,
    players: {
      goalkeepers: [{ name: "Bürki", strength: 70 }],
      defenders: [
        { name: "Akanji", strength: 76 },
        { name: "Hummels", strength: 80 },
        { name: "Guerreiro", strength: 75 }
      ],
      midfielders: [
        { name: "Witzel", strength: 80 },
        { name: "Brandt", strength: 80 },
        { name: "Can", strength: 75 }
      ],
      forwards: [
        { name: "Sancho", strength: 90 },
        { name: "Haaland", strength: 98 },
        { name: "Reus", strength: 81 }
      ]
    }
  },
  {
    name: "FC Schalke 04",
    strength: 20,
    players: {
      goalkeepers: [{ name: "Fährmann", strength: 18 }],
      defenders: [
        { name: "Thiaw", strength: 15 },
        { name: "Mustafi", strength: 16 },
        { name: "Kolasinac", strength: 17 }
      ],
      midfielders: [
        { name: "Harit", strength: 28 },
        { name: "Serdar", strength: 26 },
        { name: "Stambouli", strength: 18 }
      ],
      forwards: [
        { name: "Uth", strength: 24 },
        { name: "Hoppe", strength: 22 },
        { name: "Raman", strength: 19 }
      ]
    }
  },
  {
    name: "Werder Bremen",
    strength: 24,
    players: {
      goalkeepers: [{ name: "Pavlenka", strength: 28 }],
      defenders: [
        { name: "Freidl", strength: 19 },
        { name: "Augustinsson", strength: 21 },
        { name: "Moisander", strength: 19 }
      ],
      midfielders: [
        { name: "Eggestein", strength: 22 },
        { name: "Bittencourt", strength: 24 },
        { name: "Schmid", strength: 21 }
      ],
      forwards: [
        { name: "Füllkrug", strength: 22 },
        { name: "Rashica", strength: 42 },
        { name: "Sargent", strength: 24 }
      ]
    }
  },
  {
    name: "TSG 1899 Hoffenheim",
    strength: 40,
    players: {
      goalkeepers: [{ name: "Baumann", strength: 38 }],
      defenders: [
        { name: "Grillitsch", strength: 37 },
        { name: "Sessegnon", strength: 35 },
        { name: "Richards", strength: 34 }
      ],
      midfielders: [
        { name: "Rudy", strength: 41 },
        { name: "Baumgartner", strength: 40 },
        { name: "Sammassekou", strength: 36 }
      ],
      forwards: [
        { name: "Dabbur", strength: 38 },
        { name: "Kramaric", strength: 61 },
        { name: "Bebou", strength: 39 }
      ]
    }
  },
  {
    name: "Hertha BSC",
    strength: 49,
    players: {
      goalkeepers: [{ name: "Schwolow", strength: 39 }],
      defenders: [
        { name: "Stark", strength: 49 },
        { name: "Klünter", strength: 42 },
        { name: "Dardai", strength: 53 }
      ],
      midfielders: [
        { name: "Tousart", strength: 60 },
        { name: "Darida", strength: 51 },
        { name: "Mittelstädt", strength: 40 }
      ],
      forwards: [
        { name: "Cordoba", strength: 43 },
        { name: "Cunha", strength: 65 },
        { name: "Piatek", strength: 50 }
      ]
    }
  },
  {
    name: "RB Leipzig",
    strength: 74,
    players: {
      goalkeepers: [{ name: "Gulacsi", strength: 69 }],
      defenders: [
        { name: "Angelino", strength: 79 },
        { name: "Upamecano", strength: 82 },
        { name: "Orban", strength: 71 }
      ],
      midfielders: [
        { name: "Nkunku", strength: 76 },
        { name: "Haidara", strength: 68 },
        { name: "Sabitzer", strength: 73 }
      ],
      forwards: [
        { name: "Olmo", strength: 77 },
        { name: "Sorloth", strength: 66 },
        { name: "Poulsen", strength: 74 }
      ]
    }
  },
  {
    name: "Bayer Leverkussen",
    strength: 65,
    players: {
      goalkeepers: [{ name: "Hradecky", strength: 69 }],
      defenders: [
        { name: "Tah", strength: 61 },
        { name: "Tapsoba", strength: 45 },
        { name: "Bender", strength: 57 }
      ],
      midfielders: [
        { name: "Aranguiz", strength: 59 },
        { name: "Wirtz", strength: 75 },
        { name: "Amiri", strength: 69 }
      ],
      forwards: [
        { name: "Bailey", strength: 75 },
        { name: "Alario", strength: 71 },
        { name: "Diaby", strength: 75 }
      ]
    }
  },
  {
    name: "VFL Wolfsburg",
    strength: 63,
    players: {
      goalkeepers: [{ name: "Casteels", strength: 62 }],
      defenders: [
        { name: "Lacroix", strength: 69 },
        { name: "Brooks", strength: 62 },
        { name: "Baku", strength: 59 }
      ],
      midfielders: [
        { name: "Arnold", strength: 66 },
        { name: "Gerhardt", strength: 64 },
        { name: "Schlager", strength: 62 }
      ],
      forwards: [
        { name: "Steffen", strength: 55 },
        { name: "Mehmedi", strength: 62 },
        { name: "Weghorst", strength: 80 }
      ]
    }
  },
  {
    name: "VFB Stuttgart",
    strength: 47,
    players: {
      goalkeepers: [{ name: "Kobel", strength: 50 }],
      defenders: [
        { name: "Kempf", strength: 38 },
        { name: "Anton", strength: 39 },
        { name: "Mavropanos", strength: 39 }
      ],
      midfielders: [
        { name: "Endo", strength: 43 },
        { name: "Mangala", strength: 42 },
        { name: "Wamangituka", strength: 65 }
      ],
      forwards: [
        { name: "Castro", strength: 50 },
        { name: "Coulibaly", strength: 43 },
        { name: "Kalajdzic", strength: 61 }
      ]
    }
  },
  {
    name: "FSV Mainz 05",
    strength: 24,
    players: {
      goalkeepers: [{ name: "Zentner", strength: 20 }],
      defenders: [
        { name: "St. Juste", strength: 22 },
        { name: "Naikhate", strength: 19 },
        { name: "Bell", strength: 21 }
      ],
      midfielders: [
        { name: "Barreiro", strength: 18 },
        { name: "Quaison", strength: 25 },
        { name: "Boetius", strength: 23 }
      ],
      forwards: [
        { name: "Burkardt", strength: 20 },
        { name: "Mateta", strength: 47 },
        { name: "Oniwiso", strength: 23 }
      ]
    }
  },
  {
    name: "Eintracht Frankfurt",
    strength: 62,
    players: {
      goalkeepers: [{ name: "Trapp", strength: 61 }],
      defenders: [
        { name: "Chandler", strength: 59 },
        { name: "Hinteregger", strength: 64 },
        { name: "Ilsanker", strength: 67 }
      ],
      midfielders: [
        { name: "Barkok", strength: 45 },
        { name: "Kamada", strength: 51 },
        { name: "Hasebe", strength: 65 }
      ],
      forwards: [
        { name: "Younes", strength: 58 },
        { name: "Kostic", strength: 67 },
        { name: "Silva", strength: 83 }
      ]
    }
  },
  {
    name: "Arminia Bielefeld",
    strength: 23,
    players: {
      goalkeepers: [{ name: "Ortega", strength: 40 }],
      defenders: [
        { name: "Pieper", strength: 23 },
        { name: "Nilsson", strength: 16 },
        { name: "Brunner", strength: 15 }
      ],
      midfielders: [
        { name: "Maier", strength: 21 },
        { name: "Prietl", strength: 12 },
        { name: "Doan", strength: 26 }
      ],
      forwards: [
        { name: "Cordova", strength: 23 },
        { name: "Klos", strength: 30 },
        { name: "Schipplock", strength: 21 }
      ]
    }
  },
  {
    name: "SC Freiburg",
    strength: 44,
    players: {
      goalkeepers: [{ name: "Müller", strength: 38 }],
      defenders: [
        { name: "Günter", strength: 50 },
        { name: "Lienhardt", strength: 36 },
        { name: "Heintz", strength: 54 }
      ],
      midfielders: [
        { name: "Santamaria", strength: 36 },
        { name: "Höfler", strength: 38 },
        { name: "Grifo", strength: 50 }
      ],
      forwards: [
        { name: "Schmid", strength: 38 },
        { name: "Petersen", strength: 59 },
        { name: "Höler", strength: 38 }
      ]
    }
  },
  {
    name: "FC Köln",
    strength: 26,
    players: {
      goalkeepers: [{ name: "Horn,T", strength: 30 }],
      defenders: [
        { name: "Horn,J", strength: 21 },
        { name: "Mere", strength: 24 },
        { name: "Bornauw", strength: 35 }
      ],
      midfielders: [
        { name: "Rexhbecaj", strength: 22 },
        { name: "Hektor", strength: 34 },
        { name: "Skhiri", strength: 19 }
      ],
      forwards: [
        { name: "Wolf", strength: 24 },
        { name: "Ozcan", strength: 20 },
        { name: "Duda", strength: 35 }
      ]
    }
  },
  {
    name: "Union Berlin",
    strength: 43,
    players: {
      goalkeepers: [{ name: "Luthe", strength: 39 }],
      defenders: [
        { name: "Knoche", strength: 44 },
        { name: "Friedrich", strength: 47 },
        { name: "Schlotterbeck", strength: 44 }
      ],
      midfielders: [
        { name: "Andrich", strength: 46 },
        { name: "Trimmel", strength: 48 },
        { name: "Ingvartsen", strength: 43 }
      ],
      forwards: [
        { name: "Becker", strength: 31 },
        { name: "Awoniyi", strength: 36 },
        { name: "Kruse", strength: 56 }
      ]
    }
  },
  {
    name: "FC Augsburg",
    strength: 33,
    players: {
      goalkeepers: [{ name: "Gikiewicz", strength: 30 }],
      defenders: [
        { name: "Gumny", strength: 25 },
        { name: "Uduokhai", strength: 35 },
        { name: "Gouweleeuw", strength: 29 }
      ],
      midfielders: [
        { name: "Caligiuri", strength: 41 },
        { name: "Benes", strength: 26 },
        { name: "Strobl", strength: 30 }
      ],
      forwards: [
        { name: "Vargas", strength: 39 },
        { name: "Hahn", strength: 37 },
        { name: "Niederlechner", strength: 35 }
      ]
    }
  },
  {
    name: "Borussia Mönchengladbach",
    strength: 66,
    players: {
      goalkeepers: [{ name: "Sommer", strength: 64 }],
      defenders: [
        { name: "Ginter", strength: 66 },
        { name: "Elvedi", strength: 64 },
        { name: "Lainer", strength: 53 }
      ],
      midfielders: [
        { name: "Hofmann", strength: 62 },
        { name: "Neuhaus", strength: 69 },
        { name: "Stindl", strength: 74 }
      ],
      forwards: [
        { name: "Embolo", strength: 64 },
        { name: "Plea", strength: 66 },
        { name: "Thuram", strength: 78 }
      ]
    }
  }
];

export {
  home_scoring_base_chance,
  away_scoring_base_chance,
  german_competition,
  random_scoring_attempts_min,
  random_scoring_attempts_max,
  surprise_factors,
  weights
};
