/*

VOETBALSPEL UITSLAGEN GENERATOR

TODO:
- [x] iemand die tweede keer geel krijgt kan daarna ook niet meer scoren, iemand die rood krijgt kan niet nog een keer rood krijgen, iemand die geel krijg na rood kan niet etc
- [x] score naar beneden afronden
- [ ] doelpunten na rood of dubbel geel worden weggehaald en kloppen niet meer met de score

*/

import "../assets/css/styles.css";

import { play_one_match } from "./play-one-match";
import { test_several_matches } from "./test-several-matches";

document
  .querySelector(".play-one-match-button")
  .addEventListener("click", play_one_match, false);

document
  .querySelector(".play-serveral-matches-button")
  .addEventListener("click", test_several_matches, false);
