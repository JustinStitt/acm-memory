<script>
  import { hint } from "./memorylogic.js";

  let tiles = {
    algo: {},
    ai: {},
    dev: {},
    design: {},
  };

  const test = (tile) => {
    hint(tile);
  };
</script>

<span class="holder">
  <div class="square" id="algo" bind:this={tiles.algo} />
  <div class="square" id="ai" bind:this={tiles.ai} />
  <div class="square" id="dev" bind:this={tiles.dev} />
  <div class="square" id="design" bind:this={tiles.design} />
  <button
    on:click={() => {
      test(tiles.algo);
    }}>test</button
  >
</span>

<style>
  .holder {
    width: 25%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    transform: rotateZ(45deg);
    margin-top: 6%;
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

  .hint {
    background-color: goldenrod !important;
  }
</style>
