/*

 __      __        _   _           _                _         _ _       _                         
 \ \    / /       | | | |         | |              | |       (_) |     | |                        
  \ \  / /__   ___| |_| |__   __ _| |___ _ __   ___| |  _   _ _| |_ ___| | __ _  __ _  ___ _ __   
   \ \/ / _ \ / _ \ __| '_ \ / _` | / __| '_ \ / _ \ | | | | | | __/ __| |/ _` |/ _` |/ _ \ '_ \  
    \  / (_) |  __/ |_| |_) | (_| | \__ \ |_) |  __/ | | |_| | | |_\__ \ | (_| | (_| |  __/ | | | 
     \/ \___/ \___|\__|_.__/ \__,_|_|___/ .__/ \___|_|  \__,_|_|\__|___/_|\__,_|\__, |\___|_| |_| 
                                        | |                                      __/ |            
                                        |_|                                     |___/             

TODO:
- [x] thuisploeg heeft voordeel
- [x] tegenstander weegt mee in teamsterkte
- [x] gele & rode kaarten
- [x] iemand die rood heeft gehad kan daarna niet meer scoren 
- [ ] spelerssterkte bepaald wie er scoort
- [ ] spelerstype bepaalt kans op geel/rood
- [ ] iemand die tweede keer geel krijgt kan daarna ook niet meer scoren

*/

import "./styles.css";
import {
  home_scoring_base_chance,
  away_scoring_base_chance,
  competition,
  random_scoring_attempts_min,
  random_scoring_attempts_max,
  surprise_factors
} from "./competition.js";
import {
  clear_scoreboards,
  post_on_scoreboard,
  post_on_debug,
  get_random_number,
  shuffle_array,
  get_random_item
} from "./helpers.js";

document
  .querySelector("button")
  .addEventListener("click", simulate_match, false);

function simulate_match() {
  clear_scoreboards();

  const teams = get_match_teams(competition);

  // home team scoring
  const team_1_scoring_attempts = get_random_number(
    random_scoring_attempts_min,
    random_scoring_attempts_max
  );
  const team_1_surprise_factor = get_random_item(surprise_factors);
  const team_1_match_strength =
    ((teams[0].strength / teams[1].strength) * team_1_surprise_factor) /
    team_1_scoring_attempts;
  post_on_debug(
    1,
    `(${home_scoring_base_chance} + ${team_1_match_strength} * ${team_1_surprise_factor}) * ${team_1_scoring_attempts}`
  );
  const team_1_score =
    home_scoring_base_chance + team_1_match_strength * team_1_scoring_attempts;
  post_on_debug(1, team_1_score);
  teams[0].score = Math.round(team_1_score);

  // away team scoring
  const team_2_scoring_attempts = get_random_number(
    random_scoring_attempts_min,
    random_scoring_attempts_max
  );
  const team_2_surprise_factor = get_random_item(surprise_factors);
  const team_2_match_strength =
    ((teams[1].strength / teams[0].strength) * team_2_surprise_factor) /
    team_2_scoring_attempts;
  post_on_debug(
    2,
    `(${away_scoring_base_chance} + ${team_2_match_strength} * ${team_2_surprise_factor}) * ${team_2_scoring_attempts}`
  );
  const team_2_score =
    away_scoring_base_chance + team_2_match_strength * team_2_scoring_attempts;
  post_on_debug(2, team_2_score);
  teams[1].score = Math.round(team_2_score);

  teams[0].yellows = get_random_item([0, 0, 0, 1, 1, 2, 2, 3]);
  teams[0].reds = 1 === get_random_number(1, 10);

  teams[1].yellows = get_random_item([0, 0, 0, 1, 1, 2, 2, 3]);
  teams[1].reds = 1 === get_random_number(1, 10);

  const events_team_1 = get_events(teams[0]);
  const events_team_2 = get_events(teams[1]);

  /*

  Update scoreboards

  */

  post_on_scoreboard(
    1,
    `<div class="team">${teams[0].name} <div class="score">${teams[0].score}</div></div>`
  );

  events_team_1.forEach(function (event) {
    post_on_scoreboard(
      1,
      `<div class="minute">${event.minute}'</div> ${event.name} <div class="event --${event.type}"></div>`
    );
  });

  post_on_scoreboard(
    2,
    `<div class="team">${teams[1].name} <div class="score">${teams[1].score}</div></div>`
  );

  events_team_2.forEach(function (event) {
    post_on_scoreboard(
      2,
      `<div class="minute">${event.minute}'</div> ${event.name} <div class="event --${event.type}"></div>`
    );
  });
}

function get_random_player_name(team) {
  var all_players = [
    team.players.goalkeepers,
    team.players.defenders,
    team.players.midfielders,
    team.players.forwards
  ].flat();

  shuffle_array(all_players);

  return all_players.splice(0, 1)[0].name;
}

function get_match_teams(teams) {
  let teams_copy = JSON.parse(JSON.stringify(teams));

  shuffle_array(teams_copy);

  const team_1 = teams_copy.splice(0, 1)[0];
  const team_2 = teams_copy.splice(0, 1)[0];

  team_1.score = 0;
  team_2.score = 0;

  return [team_1, team_2];
}

function get_random_game_minute() {
  return get_random_number(1, 94);
}

function get_events(team) {
  let events = [];

  for (let i = 0; i < team.score; i++) {
    events.push({
      type: "goal",
      name: get_random_player_name(team),
      minute: get_random_game_minute()
    });
  }

  for (let i = 0; i < team.yellows; i++) {
    events.push({
      type: "yellow",
      name: get_random_player_name(team),
      minute: get_random_game_minute()
    });
  }

  for (let i = 0; i < team.reds; i++) {
    events.push({
      type: "red",
      name: get_random_player_name(team),
      minute: get_random_game_minute()
    });
  }

  let bad_events = [];

  events.forEach(function (goal, goalIndex) {
    if (goal.type === "goal") {
      const bad_event_index = events.findIndex(
        (event) =>
          event.name === goal.name &&
          event.minute < goal.minute &&
          event.type === "red"
      );

      if (bad_event_index > -1) {
        console.log(events[goalIndex]);
        bad_events.push(goalIndex);
      }
    }
  });

  bad_events.forEach(function (bad_event_index) {
    delete events[bad_event_index];
  });

  // todo: remove goals from a player after a red card

  events.sort((a, b) => a.minute - b.minute);

  return events;
}
