import { score, hiscore } from "./stores.js";

function generateLevel(depth) {
  let level = [];
  for (let i = 0; i < depth; i++) {
    let rand = Math.floor(Math.random() * 4);
    level.push(idxToTeam(rand));
  }
  return level;
}

export function hint(tile, duration = 875) {
  console.log("hinting: ", tile, " ", duration);
  /* cache our pre-hint styles  */
  let memo = tile.style;

  /* apply styles */
  tile.style.filter = "drop-shadow(1px 0px 30px #a69e46)";
  tile.style.transform = "scale(1.15) rotateZ(2.5deg)";
  setTimeout(() => {
    tile.style = memo;
  }, duration);
}

export let tiles = {
  algo: {},
  ai: {},
  dev: {},
  design: {},
};

function idxToTeam(idx) {
  return [tiles.algo, tiles.ai, tiles.dev, tiles.design][idx];
}

export function startLevel(depth, delay = 875) {
  state.move_list = generateLevel(depth);
  state.incoming = [];
  state.cdepth = depth;
  let cnt = 0;
  setClickable(false);
  /* TODO(justinstitt): give rhyme and reason to these magic numbers */
  for (let move of state.move_list) {
    setTimeout(() => {
      hint(move, delay * 0.8);
    }, delay * cnt * 1.3);
    ++cnt;
  }
  setTimeout(() => {
    setClickable(true);
  }, delay * (cnt - 1) * 1.3 + 75);
}

export function lose() {
  updateHighscore();
  state.score = 0;
  state.incoming = [];
  state.clickable = false;
  alert("You Lose!");
  window.location.reload();
}

export function setClickable(is_clickable) {
  state.clickable = is_clickable;
  for (let i = 0; i < 4; ++i) {
    let tile = idxToTeam(i);
    if (state.clickable === false) {
      tile.classList.add("no-click");
      continue;
    }
    tile.classList.remove("no-click");
  }
}

export function sendMove(tile) {
  /* add to incoming */
  state.incoming.push(tile);
  let n = state.incoming.length;
  if (state.incoming[n - 1] != state.move_list[n - 1]) {
    lose();
    return { result: "lose" };
  }
  /* TODO(justinstitt): add dynamic score incrementation (difficulty-based) */
  state.score += 1253 * (1 + state.cdepth / 6);
  score.update((s) => (s = state.score));
  updateHighscore();
  if (n >= state.move_list.length) {
    win();
    return { result: "win" };
  }
  return { result: "tbd" };
}

function updateHighscore() {
  if (state.score > state.hiscore) {
    localStorage.setItem("hiscore", state.score);
    state.hiscore = state.score;
    hiscore.update((h) => (h = state.hiscore));
  }
}

function win() {
  setClickable(false);
  console.log("passed level");
}

export let state = {
  score: 0,
  hiscore: 0,
  clickable: false,
  move_list: [],
  incoming: [],
  cdepth: 0,
};
