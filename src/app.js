/*

VOETBALSPEL UITSLAGEN GENERATOR

TODO:
- [x] iemand die tweede keer geel krijgt kan daarna ook niet meer scoren, iemand die rood krijgt kan niet nog een keer rood krijgen, iemand die geel krijg na rood kan niet etc
- [x] score naar beneden afronden
- [ ] doelpunten na rood of dubbel geel worden weggehaald en kloppen niet meer met de score
- europese competities:
      voor nu maken we dan een loting knop die de duitse clubs uitkiest die de beide europese competities spelen, dat blijft zichtbaar in beeld en dan komen er nog twee knoppen bij voor de champions en europa league waarin die gelote clubs dan tegen willekeurige andere europese clubs spelen en we alleen de gebeurtenissen qua goals/rood/geel bij de duitse clubs laten zien
    - [ ] teams krijgen europa strength naast local strength
    - [x] on load & reset knop voor europa loting: kies 3 duitse clubs voor champions league en 3 duitse clubs voor europa league
    - [x] toon gelotte europa teams altijd in beeld
    - [ ] knop voor champions league wedstrijd
    - [ ] knop voor europa league wedstrijd

*/

import "../assets/css/styles.css";

import { play_one_german_match } from "./play-one-german-match";
import { play_one_euro_match } from "./play-one-euro-match";
import { test_several_german_matches } from "./test-several-german-matches";
import { pick_euro_teams } from "./pick-euro-teams";

document
  .querySelector(".play-one-german-match-button")
  .addEventListener("click", play_one_german_match, false);

document
  .querySelector(".play-several-german-matches-button")
  .addEventListener("click", test_several_german_matches, false);

document.querySelector(".play-one-euro-match-button").addEventListener(
  "click",
  function () {
    play_one_euro_match(euro_teams, "champions-league");
  },
  false
);

let euro_teams = pick_euro_teams();

document.querySelector(".reset-euro-teams-button").addEventListener(
  "click",
  function () {
    euro_teams = pick_euro_teams();
  },
  false
);
