/*

VOETBALSPEL UITSLAGEN GENERATOR

TODO:
- [x] thuisploeg heeft voordeel
- [x] tegenstander weegt mee in teamsterkte
- [x] gele & rode kaarten
- [x] iemand die rood heeft gehad kan daarna niet meer scoren 
- [x] suprisefactor ook onder 1
- [x] spelerssterkte bepaald wie er scoort
- [x] spelerstype bepaalt kans op scoren/geel/rood
- [ ] update verhoudingen met nieuwe berekening van jaap
- [ ] voeg wedstrijd tests toe die laten zien of de beste speler ook 't vaakst scoort gemiddeld genomen over een groot aantal wedstrijden
- [ ] iemand die tweede keer geel krijgt kan daarna ook niet meer scoren

*/

import "./styles.css";

import { play_one_match } from "./play-one-match";
import { test_several_matches } from "./test-several-matches";

document
  .querySelector(".play-one-match-button")
  .addEventListener("click", play_one_match, false);

document
  .querySelector(".play-serveral-matches-button")
  .addEventListener("click", test_several_matches, false);
