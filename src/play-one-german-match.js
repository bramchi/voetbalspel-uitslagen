import {
  home_scoring_base_chance,
  away_scoring_base_chance,
  german_competition,
  random_scoring_attempts_min,
  random_scoring_attempts_max,
  surprise_factors,
  weights
} from "./german-competition.js";
import {
  clear_scoreboards,
  post_on_scoreboard,
  post_on_debug,
  get_random_number,
  shuffle_array,
  get_random_item,
  get_weighted_random
} from "./helpers.js";

function play_one_german_match() {
  clear_scoreboards();

  const teams = generate_german_results();

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

  console.log(teams[0].events);

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

function generate_german_results() {
  let teams = get_two_match_teams(german_competition);

  // home team scoring
  teams[0].scoring_attempts = get_random_number(
    random_scoring_attempts_min,
    random_scoring_attempts_max
  );
  teams[0].surprise_factor = get_weighted_random(surprise_factors).factor;
  teams[0].match_strength = teams[0].strength / teams[1].strength / 20;

  teams[0].score =
    (home_scoring_base_chance + teams[0].match_strength) *
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
    (away_scoring_base_chance + teams[1].match_strength) *
    teams[1].surprise_factor *
    teams[1].scoring_attempts;

  teams[0].score = Math.floor(teams[0].score);
  teams[1].score = Math.floor(teams[1].score);

  teams[0].yellows = get_random_item([0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 3]);
  teams[0].reds = 1 === get_random_number(1, 15);
  teams[0].events = create_events_from_stats(teams[0]);

  teams[1].yellows = get_random_item([0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 3]);
  teams[1].reds = 1 === get_random_number(1, 15);
  teams[1].events = create_events_from_stats(teams[1]);

  return teams;
}

function get_two_match_teams(teams) {
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

  // Remove impossible events like:
  // - goal from player who got red
  // - goal from player who got double yellow
  // - red cards for player who already has one
  // - yellow card for player who already has two
  let bad_events = [];

  events.forEach(function (event, eventIndex) {
    if (event.type === "goal") {
      const red_before_goal = events.findIndex(
        (otherEvent) =>
          otherEvent.name === event.name &&
          otherEvent.minute < event.minute &&
          otherEvent.type === "red"
      );

      if (red_before_goal > -1) {
        // console.log("remove goal after red", events[eventIndex]);
        bad_events.push(eventIndex);
      }

      const first_yellow_before_goal = events.findIndex(
        (otherEvent) =>
          otherEvent.name === event.name &&
          otherEvent.minute < event.minute &&
          otherEvent.type === "yellow"
      );

      if (first_yellow_before_goal > -1) {
        const second_yellow_before_goal = events.findIndex(
          (otherEvent) =>
            otherEvent.name === event.name &&
            otherEvent.minute < event.minute &&
            otherEvent.minute !== events[first_yellow_before_goal].minute &&
            otherEvent.type === "yellow"
        );

        if (second_yellow_before_goal > -1) {
          // console.log("remove goal after double yellow", events[eventIndex]);
          bad_events.push(eventIndex);
        }
      }
    }

    if (event.type === "red") {
      const red_before_red = events.findIndex(
        (otherEvent) =>
          otherEvent.name === event.name &&
          otherEvent.minute < event.minute &&
          otherEvent.type === "red"
      );

      if (red_before_red > -1) {
        // console.log("remove red after red", events[eventIndex]);
        bad_events.push(eventIndex);
      }

      const yellow_before_red = events.findIndex(
        (otherEvent) =>
          otherEvent.name === event.name &&
          otherEvent.minute < event.minute &&
          otherEvent.type === "yellow"
      );

      if (yellow_before_red > -1) {
        const other_yellow_before_red = events.findIndex(
          (otherEvent) =>
            otherEvent.name === event.name &&
            otherEvent.minute < event.minute &&
            otherEvent.minute !== events[yellow_before_red].minute &&
            otherEvent.type === "yellow"
        );

        if (other_yellow_before_red > -1) {
          // console.log("remove red after double yellow", events[eventIndex]);
          bad_events.push(eventIndex);
        }
      }
    }

    if (event.type === "yellow") {
      const yellow_before_yellow = events.findIndex(
        (otherEvent) =>
          otherEvent.name === event.name &&
          otherEvent.minute < event.minute &&
          otherEvent.type === "yellow"
      );

      if (yellow_before_yellow > -1) {
        const other_yellow_before_yellow = events.findIndex(
          (otherEvent) =>
            otherEvent.name === event.name &&
            otherEvent.minute < event.minute &&
            otherEvent.minute !== events[yellow_before_yellow].minute &&
            otherEvent.type === "yellow"
        );

        if (other_yellow_before_yellow > -1) {
          // console.log("remove yellow after double yellow", events[eventIndex]);
          bad_events.push(eventIndex);
        }
      }

      const red_before_yellow = events.findIndex(
        (otherEvent) =>
          otherEvent.name === event.name &&
          otherEvent.minute < event.minute &&
          otherEvent.type === "red"
      );

      if (red_before_yellow > -1) {
        // console.log("remove yellow after red", events[eventIndex]);
        bad_events.push(eventIndex);
      }
    }
  });

  bad_events.forEach(function (bad_event_index) {
    delete events[bad_event_index];
  });

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

export { play_one_german_match, generate_german_results };
