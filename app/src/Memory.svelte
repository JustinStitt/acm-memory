<script>
  import {
    tiles,
    state,
    startLevel,
    setClickable,
    sendMove,
  } from "./memorylogic.js";
  import { onMount } from "svelte";
  import { score, hiscore } from "./stores.js";

  let formatter = Intl.NumberFormat("en", { notation: "compact" });
  let depth = 1;
  let shownScore, shownHiscore;

  score.subscribe((s) => {
    shownScore = Math.trunc(s);
  });

  hiscore.subscribe((s) => {
    shownHiscore = Math.trunc(s);
  });

  $: formatted_score = formatter.format(shownScore);
  $: formatted_hiscore = formatter.format(shownHiscore);

  const goNext = () => {
    ++depth;
    setTimeout(() => {
      startLevel(depth);
    }, 750);
  };

  onMount(() => {
    setClickable(false);
    shownHiscore = localStorage.getItem("hiscore") ?? 0;
    hiscore.update((h) => (h = shownHiscore));
  });

  let container, start_button;

  const setupGameForPlay = (deg) => {
    container.style.transform = `rotateZ(${deg}deg)`;
    start_button.style.filter = "opacity(0%)";
    for (let img of document.querySelectorAll("img")) {
      img.style.transform = "rotateZ(-45deg)";
    }
    setClickable(false);
    setTimeout(() => {
      goNext();
    }, 750);
  };

  const sendTile = (tile) => {
    let res = sendMove(tile);
    if (res.result === "tbd") return;
    if (res.result === "win") goNext();
  };

  let score_element, hiscore_element;
  $: showFormattedScore(score_element, formatted_score);

  const showFormattedScore = (ele, s) => {
    if (!ele) return;
    let idx = ele.textContent.indexOf(" ");
    ele.textContent = `${ele.textContent.slice(0, idx + 1)} ${
      ele === hiscore_element ? formatted_hiscore : formatted_score
    }`;
  };

  const unshowFormattedScore = (ele) => {
    if (!ele) return;
    let idx = ele.textContent.indexOf(" ");
    ele.textContent = `${ele.textContent.slice(0, idx + 1)} ${
      ele === hiscore_element ? shownHiscore : shownScore
    }`;
  };
</script>

<div class="holder" bind:this={container}>
  <div
    id="hiscore"
    class="text"
    bind:this={hiscore_element}
    on:mouseleave={() => showFormattedScore(hiscore_element)}
    on:mouseenter={() => unshowFormattedScore(hiscore_element)}
  >
    Hi-Score: {formatted_hiscore}
  </div>
  <div
    id="score"
    class="text"
    bind:this={score_element}
    on:mouseleave={() => showFormattedScore(score_element)}
    on:mouseenter={() => unshowFormattedScore(score_element)}
  >
    Score: {formatted_score}
  </div>
  <span class="diamond">
    <!-- TODO(justinstitt): rewrite this with an {#each} since it's rep. code -->
    <div
      class="square"
      id="algo"
      bind:this={tiles.algo}
      on:click={() => {
        sendTile(tiles.algo);
      }}
    >
      <img src="algo.svg" alt="ACM Algo Team Logo" />
    </div>
    <div
      class="square"
      id="ai"
      bind:this={tiles.ai}
      on:click={() => {
        sendTile(tiles.ai);
      }}
    >
      <img src="ai.svg" alt="ACM AI Team Logo" />
    </div>
    <div
      class="square"
      id="dev"
      bind:this={tiles.dev}
      on:click={() => {
        sendTile(tiles.dev);
      }}
    >
      <img src="dev.svg" alt="ACM Dev Team Logo" />
    </div>
    <div
      class="square"
      id="design"
      bind:this={tiles.design}
      on:click={() => {
        sendTile(tiles.design);
      }}
    >
      <img src="design.svg" alt="ACM Design Team Logo" />
    </div>
    <!-- <button class="start" on:click={testTurnOffPointerEvent}>start</button> -->
  </span>
  <div
    id="start"
    class="text"
    bind:this={start_button}
    on:click={() => {
      setupGameForPlay(45);
    }}
  >
    Start Game
  </div>
</div>

<style>
  .holder {
    width: 25%;
    transition: 0.5s ease-in-out;
    /* background-color: rebeccapurple; */
    /* transform: rotateZ(45deg); */
    margin-top: 2vh;
  }

  .diamond {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .square {
    /* width: 80%; */
    aspect-ratio: 1;
    margin: 5px;
    border-radius: 10%;
    border: 1px solid aliceblue;
    cursor: pointer;
    transition: 0.1s ease-out;
    display: flex;
    justify-content: center;
  }

  .square:active {
    transform: scale(1.1);
  }

  .square:hover {
    border-width: 2px;
    rotate: 1deg;
  }

  .text {
    font-size: 1.4vw;
    transition: 0.5s ease-in-out;
    white-space: nowrap;
  }

  #start {
    margin-top: 0vh;
    margin-left: 1.3vw;
    width: 8vw;
    background-color: aliceblue;
    color: #333;
    font-weight: 700;
    border-radius: 30px;
    padding: 9px;
    text-align: center;
  }

  #score {
    transform: rotateZ(270deg) translateY(-5vw) translateX(-20.5vw);
    width: 8vw;
  }

  #hiscore {
    margin-left: 13.3vw;
    margin-bottom: -2vw;
  }

  /* force compile css class for use in .classList.add(class) */
  :global(.no-click) {
    pointer-events: none;
  }

  img {
    width: 8vw;
    padding: 1vw;
    transition: 0.5s ease-in-out;
  }
</style>
