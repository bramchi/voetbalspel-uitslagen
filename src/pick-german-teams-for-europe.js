import { german_competition } from "./german-competition.js";
import { clear_scoreboards } from "./helpers.js";
import { get_random_number } from "./helpers.js";

function pick_german_teams_for_europe() {
  document.getElementById("champions_league_teams").innerHTML = "";

  let german_teams = german_competition;

  // add/remove a bit of strength from each team randomly
  german_teams.forEach((team, index) => {
    german_teams[index].strength += get_random_number(-15, 15);
  });

  const german_teams_sorted = german_teams.sort(
    (a, b) => b.strength - a.strength
  );

  clear_scoreboards();

  document.getElementById(
    "champions_league_teams"
  ).innerHTML = `<strong>Champions League</strong><br>1. ${german_teams_sorted[0].name} (${german_teams_sorted[0].strength})<br>2. ${german_teams_sorted[1].name} (${german_teams_sorted[1].strength})<br>3. ${german_teams_sorted[2].name} (${german_teams_sorted[2].strength})`;
  document.getElementById(
    "europe_league_teams"
  ).innerHTML = `<strong>Europa League</strong><br>4. ${german_teams_sorted[3].name} (${german_teams_sorted[3].strength})<br>5. ${german_teams_sorted[4].name} (${german_teams_sorted[4].strength})<br>6. ${german_teams_sorted[5].name} (${german_teams_sorted[5].strength})`;

  return german_teams_sorted;
}

export { pick_german_teams_for_europe };
