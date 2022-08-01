<template>
  <div class="news-card">
    <h2 class="news-header"><slot name="header"></slot></h2>
    <p class="usoNews"><slot name="body"></slot></p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.news-card {
  width: 100%;
  padding: 3.5rem;
  background-color: #5b719fbb;
  border-radius: 1.5rem;
}

.news-header {
  line-height: 3rem;
  margin-bottom: 1.75rem;
  font-size: 5.5rem;
  font-style: italic;
}

.usoNews {
  font-size: 3rem;
  font-weight: 300;
}

@media screen and (max-width: 1100px) {
  .news-card {
    width: auto;
  }
}

</style>
