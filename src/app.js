import "../assets/css/styles.css";

import { play_one_german_match } from "./play-one-german-match";
import { play_one_euro_match } from "./play-one-euro-match";
import { test_several_german_matches } from "./test-several-german-matches";
import { pick_german_teams_for_europe } from "./pick-german-teams-for-europe";

document
  .querySelector(".play-one-german-match-button")
  .addEventListener("click", play_one_german_match, false);

document
  .querySelector(".play-several-german-matches-button")
  .addEventListener("click", test_several_german_matches, false);

document
  .querySelector(".play-one-champions-league-match-button")
  .addEventListener(
    "click",
    function () {
      play_one_euro_match(euro_teams, "champions-league");
    },
    false
  );

document.querySelector(".play-one-europe-league-match-button").addEventListener(
  "click",
  function () {
    play_one_euro_match(euro_teams, "europe-league");
  },
  false
);

let euro_teams = pick_german_teams_for_europe();

document.querySelector(".reset-euro-teams-button").addEventListener(
  "click",
  function () {
    euro_teams = pick_german_teams_for_europe();
  },
  false
);
