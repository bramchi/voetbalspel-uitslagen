let scoreboard = [];
scoreboard[1] = document.getElementById("result_1");
scoreboard[2] = document.getElementById("result_2");
let debug = [];
debug[1] = document.getElementById("debug_1");
debug[2] = document.getElementById("debug_2");

function get_random_number(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle_array(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function clear_scoreboards() {
  debug[1].innerHTML = "";
  debug[2].innerHTML = "";
  scoreboard[1].innerHTML = "";
  scoreboard[2].innerHTML = "";
}

const post_on_scoreboard = function (number, message) {
  if (typeof message === "object") {
    scoreboard[number].innerHTML +=
      JSON && JSON.stringify ? JSON.stringify(message) : message;
  } else {
    scoreboard[number].innerHTML += message;
  }
};

const post_on_debug = function (number, message) {
  if (typeof message === "object") {
    debug[number].innerHTML +=
      JSON && JSON.stringify ? JSON.stringify(message) : message;
  } else {
    debug[number].innerHTML += message;
  }
};

function get_random_item(items) {
  return items[Math.floor(Math.random() * items.length)];
}

// https://stackoverflow.com/a/55671924/3566861
function get_weighted_random(options, weight_property = "weight") {
  var i,
    weights = [];

  for (i = 0; i < options.length; i++)
    weights[i] = options[i][weight_property] + (weights[i - 1] || 0);

  var random = Math.random() * weights[weights.length - 1];

  for (i = 0; i < weights.length; i++) if (weights[i] > random) break;

  return options[i];
}

export {
  get_random_number,
  shuffle_array,
  clear_scoreboards,
  post_on_scoreboard,
  post_on_debug,
  get_random_item,
  get_weighted_random
};
