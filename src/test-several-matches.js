import { post_on_debug, clear_scoreboards } from "./helpers.js";
import { generate_results } from "./play-one-match";

function test_several_matches() {
  clear_scoreboards();
  const amount_of_matches = document.querySelector("input[type=number]").value;

  let scoring_players = {};
  for (let i = 1; i <= amount_of_matches; i++) {
    const teams = generate_results();

    teams.forEach((team) => {
      team.events.forEach((event) => {
        if (event.type === "goal") {
          if (scoring_players[event.name] === undefined) {
            scoring_players[event.name] = 1;
          } else {
            scoring_players[event.name] += 1;
          }
        }
      });
    });
  }

  let scoring_players_entries = Object.entries(scoring_players);
  const scoring_players_sorted = scoring_players_entries.sort(
    (a, b) => b[1] - a[1]
  );

  scoring_players_sorted.forEach((scoring_event) => {
    post_on_debug(1, `${scoring_event[0]} ${scoring_event[1]}`);
  });
}

export { test_several_matches };
