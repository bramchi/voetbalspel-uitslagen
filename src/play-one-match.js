import {
  home_scoring_base_chance,
  away_scoring_base_chance,
  competition,
  random_scoring_attempts_min,
  random_scoring_attempts_max,
  surprise_factors,
  weights
} from "./competition.js";
import {
  clear_scoreboards,
  post_on_scoreboard,
  post_on_debug,
  get_random_number,
  shuffle_array,
  get_random_item,
  get_weighted_random
} from "./helpers.js";

function play_one_match() {
  clear_scoreboards();

  const teams = generate_results();

  /*

  Display debug values

  */

  post_on_debug(
    1,
    `(${home_scoring_base_chance} + ${Number.parseFloat(
      teams[0].match_strength
    ).toFixed(3)}) * ${teams[0].surprise_factor} * ${
      teams[0].scoring_attempts
    } = ${teams[0].score}`
  );
  post_on_debug(
    2,
    `(${away_scoring_base_chance} + ${Number.parseFloat(
      teams[1].match_strength
    ).toFixed(3)}) * ${teams[1].surprise_factor} * ${
      teams[1].scoring_attempts
    } = ${teams[1].score}`
  );

  /*

  Update scoreboards

  */

  post_on_scoreboard(
    1,
    `<div class="team">${teams[0].name} <div class="score">${teams[0].score}</div></div>`
  );

  teams[0].events.forEach(function (event) {
    post_on_scoreboard(
      1,
      `<div class="minute">${event.minute}'</div> ${event.name} <div class="event --${event.type}"></div>`
    );
  });

  post_on_scoreboard(
    2,
    `<div class="team">${teams[1].name} <div class="score">${teams[1].score}</div></div>`
  );

  teams[1].events.forEach(function (event) {
    post_on_scoreboard(
      2,
      `<div class="minute">${event.minute}'</div> ${event.name} <div class="event --${event.type}"></div>`
    );
  });
}

function generate_results() {
  let teams = get_match_teams(competition);

  // home team scoring
  teams[0].scoring_attempts = get_random_number(
    random_scoring_attempts_min,
    random_scoring_attempts_max
  );
  teams[0].surprise_factor = get_weighted_random(surprise_factors).factor;
  teams[0].match_strength = teams[0].strength / teams[1].strength / 20;

  teams[0].score =
    home_scoring_base_chance +
    teams[0].match_strength *
      teams[0].surprise_factor *
      teams[0].scoring_attempts;

  // away team scoring
  teams[1].scoring_attempts = get_random_number(
    random_scoring_attempts_min,
    random_scoring_attempts_max
  );
  teams[1].surprise_factor = get_weighted_random(surprise_factors).factor;
  teams[1].match_strength = teams[1].strength / teams[0].strength / 20;

  teams[1].score =
    away_scoring_base_chance +
    teams[1].match_strength *
      teams[1].surprise_factor *
      teams[1].scoring_attempts;

  teams[0].score = Math.round(teams[0].score);
  teams[1].score = Math.round(teams[1].score);

  teams[0].yellows = get_random_item([0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 3]);
  teams[0].reds = 1 === get_random_number(1, 15);
  teams[0].events = create_events_from_stats(teams[0]);

  teams[1].yellows = get_random_item([0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 3]);
  teams[1].reds = 1 === get_random_number(1, 15);
  teams[1].events = create_events_from_stats(teams[1]);

  return teams;
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

function create_events_from_stats(team) {
  let events = [];

  for (let i = 0; i < team.score; i++) {
    events.push({
      type: "goal",
      name: get_random_scoring_player_name(team),
      minute: get_random_game_minute()
    });
  }

  for (let i = 0; i < team.yellows; i++) {
    events.push({
      type: "yellow",
      name: get_random_yellow_player_name(team),
      minute: get_random_game_minute()
    });
  }

  for (let i = 0; i < team.reds; i++) {
    events.push({
      type: "red",
      name: get_random_red_player_name(team),
      minute: get_random_game_minute()
    });
  }

  // remove invalid events
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

function get_random_scoring_player_name(team) {
  const scoring_player_type = get_weighted_random(weights.scoring).name;
  const scoring_player = get_weighted_random(
    team.players[scoring_player_type],
    "strength"
  );

  return scoring_player.name;
}

function get_random_yellow_player_name(team) {
  const player_type = get_weighted_random(weights.yellow).name;
  const player = get_random_item(team.players[player_type]);

  return player.name;
}

function get_random_red_player_name(team) {
  const player_type = get_weighted_random(weights.red).name;
  const player = get_random_item(team.players[player_type]);

  return player.name;
}

export { play_one_match, generate_results };
