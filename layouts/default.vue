<template>
  <div id="app">
    <MobileError />
    <NavBar />
    <Nuxt />
  </div>
</template>

<script>
import NavBar from '~/components/NavBar.vue';
import MobileError from '~/components/MobileError.vue'

export default {
  components: {
    NavBar, MobileError
  },
};
</script>

<style></style>
