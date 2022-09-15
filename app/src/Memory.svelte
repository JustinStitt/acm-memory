<script>
  import { poppress } from "./poppress.js";
  import { generateLevel } from "./memorylogic.js";
  const logosize = 225;
  const popconfig = { newWidth: logosize * 1.5, defaultTimeout: 75 };
  const click = () => {
    console.log("clicked");
  };

  let current_depth = 2; // number of guesses per level
  let level_data = [];
  let hint_delay = 875;

  $: level_data = generateLevel(current_depth);

  let logos = [{}, {}, {}, {}];

  const hint = (logo) => {
    logo.width = logosize * 1.2;
    logo.style.filter = "drop-shadow(1px 0px 30px #a69e46)";
    setTimeout(() => {
      logo.width = logosize;
      logo.style.filter = "";
      hidx += 1;
      if (hidx < level_data.length) {
        setTimeout(() => {
          hint(logos[level_data[hidx]]);
        }, hint_delay);
      } else {
        console.log("out of hint indices");
        hidx = 0;
      }
    }, hint_delay);
  };

  const playLevel = () => {
    if (hidx != 0) {
      console.log("can't start a level during a level");
      return;
    }
    lost = false;
    hint(logos[level_data[hidx]]);
  };

  let lost = false;

  const memoize = (id) => {
    if (level_data[cidx] != id) {
      console.log("wrong");
      lost = true;
    } else {
      console.log("right");
    }
    cidx += 1;
    if (cidx >= level_data.length) {
      console.log("you win!");
      cidx = 0;
      hidx = 0;
      current_depth += 1;
      setTimeout(() => {
        // time to start next level after clearing
        playLevel();
      }, 1000);
    }
  };

  let hidx = 0;
  let cidx = 0;
</script>

<div class="main">
  <img
    class="logo"
    id="designl"
    src="design-logo.svg"
    alt="ACM Design Team Logo"
    width={logosize}
    on:click={() => {
      memoize(0);
    }}
    bind:this={logos[0]}
    use:poppress={popconfig}
  />
  <img
    class="logo"
    id="devl"
    src="dev-logo.svg"
    alt="ACM Dev Team Logo"
    width={logosize}
    on:click={() => {
      memoize(1);
    }}
    bind:this={logos[1]}
    use:poppress={popconfig}
  />
  <img
    class="logo"
    id="algol"
    src="algo-logo.svg"
    alt="ACM Algo Team Logo"
    on:click={() => {
      memoize(2);
    }}
    width={logosize}
    bind:this={logos[2]}
    use:poppress={popconfig}
  />
  <img
    class="logo"
    id="ail"
    src="ai-logo.svg"
    alt="ACM AI Team Logo"
    on:click={() => {
      memoize(3);
    }}
    width={logosize}
    bind:this={logos[3]}
    use:poppress={popconfig}
  />
  <h3 on:click={playLevel} class="start">Start</h3>
  {#if lost}
    <h2 class="lost">Lost</h2>
  {/if}
</div>

<style>
  .main {
    background-color: rebeccapurple;
  }

  .logo {
    position: fixed;
    transform: translateX(-50%) rotateZ(45deg);
    transition: 0.4s ease-out;
  }

  #ail {
    left: 50%;
    top: 55%;
  }

  #algol {
    left: 40%;
    top: 35%;
  }

  #devl {
    left: 60%;
    top: 35%;
  }

  #designl {
    left: 50%;
    top: 15%;
  }

  .start {
    position: absolute;
    top: 85%;
  }

  .lost {
    position: absolute;
    top: 25%;
    left: 35%;
  }
</style>
