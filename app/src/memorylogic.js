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
    setClickable(true)
  }, delay * cnt)
}

export function lose() {
  if (state.score > state.hiscore) {
    localStorage.setItem("hiscore", state.score);
  }
  alert("You Lose!");
}

export function setClickable(is_clickable) {
  state.clickable = is_clickable;
  for (let i = 0; i < 4; ++i) {
    let tile = idxToTeam(i)
    if (state.clickable === false) {
      tile.classList.add("no-click");
      continue;
    }
    tile.classList.remove("no-click");
  }
}

export const state = {
  score: 0,
  hiscore: 0,
  clickable: false,
  move_list: [],
};
