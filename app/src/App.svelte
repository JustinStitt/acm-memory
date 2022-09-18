<script>
  import Memory from "./Memory.svelte";
</script>

<div class="main">
  <h1>ACM Memory</h1>
  <Memory />
</div>

<style>
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
</style>
