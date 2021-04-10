const home_scoring_base_chance = 0.115;
const away_scoring_base_chance = 0.085;
const random_scoring_attempts_min = 7;
const random_scoring_attempts_max = 14;

/*
16x     1,0 = Surprise Factor 0
13x   +1,1 
13x    -1,1 
11x   +1,2
11x    -1,2
9x     +1,3
9x      -1,3
6x     +1,4
6x      -1,4
3x     +1,5
3x      -1,5
*/
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

const competition = [
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
  }
];

export {
  home_scoring_base_chance,
  away_scoring_base_chance,
  competition,
  random_scoring_attempts_min,
  random_scoring_attempts_max,
  surprise_factors,
  weights
};
