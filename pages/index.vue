<template>
  <h1>You're not supposed to be seeing this!</h1>
</template>

<script>
export default {
  middleware({ redirect }) {
    return redirect('/home');
  },
};
</script>

<style></style>
