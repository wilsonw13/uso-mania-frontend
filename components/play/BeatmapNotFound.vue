<template>
  <div id="error__beatmap_not_found">
    <div class="under-nav"></div>
    <h1>
      Beatmap not found <br />
      Return to <nuxt-link to="/beatmaps">/beatmaps</nuxt-link>
    </h1>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#error__beatmap_not_found {
  width: 100vw;
}

h1,
a {
  text-align: center;
  font-size: 10rem;
}

a {
  color: lightblue;
}
</style>
