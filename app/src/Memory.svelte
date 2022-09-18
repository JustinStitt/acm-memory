<script>
  import { tiles, state, startLevel, setClickable } from "./memorylogic.js";
  import { onMount } from "svelte";

  let depth = 1;
  const goNext = () => {
    ++depth;
    startLevel(depth);
  };

  onMount(() => {
    state.hiscore = localStorage.getItem("hiscore") ?? 0;
  });

  let container, start_button;

  const setupGameForPlay = (deg) => {
    container.style.transform = `rotateZ(${deg}deg)`;
    start_button.style.filter = "opacity(0%)";
    setClickable(false);
    setTimeout(() => {
      goNext();
    }, 1500);
  };
</script>

<div class="holder" bind:this={container}>
  <div id="hiscore" class="text">hi-score: {state.hiscore}</div>
  <div id="score" class="text">Score: {state.score}</div>
  <span class="diamond">
    <div class="square" id="algo" bind:this={tiles.algo} />
    <div class="square" id="ai" bind:this={tiles.ai} />
    <div class="square" id="dev" bind:this={tiles.dev} />
    <div class="square" id="design" bind:this={tiles.design} />
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
    margin-top: 6vh;
  }

  .diamond {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .square {
    aspect-ratio: 1;
    margin: 5px;
    border-radius: 10%;
    border: 1px solid aliceblue;
    cursor: pointer;
    transition: 0.1s ease-out;
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
  }

  #start {
    margin-top: -0.9vh;
    margin-left: 1.3vw;
  }

  #score {
    transform: rotateZ(270deg) translateY(-13vw) translateX(-12vw);
  }

  #hiscore {
    margin-left: 13.3vw;
    margin-bottom: -2vw;
  }

  /* force compile css class for use in .classList.add(class) */
  :global(.no-click) {
    pointer-events: none;
  }
</style>
