import { generate_german_results } from "./play-one-german-match";
import { clear_scoreboards } from "./helpers.js";

function pick_euro_teams() {
  const amount_of_matches = 34;
  document.getElementById("champions_league_teams").innerHTML = "";

  let competition_results = [];
  for (let i = 1; i <= amount_of_matches; i++) {
    const teams_results = generate_german_results();

    teams_results.forEach((team, index) => {
      let team_index = competition_results.findIndex((element) => {
        if (element.name === team.name) {
          return true;
        }

        return false;
      });

      if (team_index === -1) {
        competition_results.push({
          ...teams_results[index],
          score: 1
        });
      } else {
        competition_results[team_index].score =
          competition_results[team_index].score + 1;
      }
    });
  }

  // let team_scores_entries = Object.entries(team_scores);
  const team_scores_sorted = competition_results.sort(
    (a, b) => b.score - a.score
  );

  clear_scoreboards();

  document.getElementById(
    "champions_league_teams"
  ).innerHTML = `<strong>Champions League</strong><br>1. ${team_scores_sorted[0].name} (${team_scores_sorted[0].score})<br>2. ${team_scores_sorted[1].name} (${team_scores_sorted[1].score})<br>3. ${team_scores_sorted[2].name} (${team_scores_sorted[2].score})`;
  document.getElementById(
    "europe_league_teams"
  ).innerHTML = `<strong>Europa League</strong><br>4. ${team_scores_sorted[3].name} (${team_scores_sorted[3].score})<br>5. ${team_scores_sorted[4].name} (${team_scores_sorted[4].score})<br>6. ${team_scores_sorted[5].name} (${team_scores_sorted[5].score})`;

  return team_scores_sorted;
}

export { pick_euro_teams };
