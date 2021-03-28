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
      (JSON && JSON.stringify ? JSON.stringify(message) : message) + "<br />";
  } else {
    scoreboard[number].innerHTML += message + "<br />";
  }
};

const post_on_debug = function (number, message) {
  if (typeof message === "object") {
    debug[number].innerHTML +=
      (JSON && JSON.stringify ? JSON.stringify(message) : message) + "<br />";
  } else {
    debug[number].innerHTML += message + "<br />";
  }
};

function get_random_item(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export {
  get_random_number,
  shuffle_array,
  clear_scoreboards,
  post_on_scoreboard,
  post_on_debug,
  get_random_item
};
