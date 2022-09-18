<script>
  import Memory from "./Memory.svelte";
</script>

<div class="main gradient-rect">
  <h1 class="ominous-hover">ACM Memory</h1>
  <Memory />
</div>

<style>
  h1 {
    font-weight: 800;
    font-size: 4vw;
    margin-top: 1px;
  }
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
</style>
