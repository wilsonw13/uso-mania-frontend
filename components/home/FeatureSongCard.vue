<template>
  <NuxtLink :to="cardRoute">
    <div class="card">
      <img :src="cardImg" alt="Yoru ni Kakeru" class="card-img" />
      <h2 class="card-text">
        {{ cardType }}: {{ cardTitle }} - {{ cardArtist }}
      </h2>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    cardType: { type: String, default: 'Featured Map' },
    cardTitle: { type: String, default: '' },
    cardArtist: { type: String, default: '' },
    cardRoute: { type: String, default: '/beatmaps' },
    cardImg: {
      type: String,
      default:
        'https://steamuserimages-a.akamaihd.net/ugc/1758061978083459138/795D1B88F10FBF6BA70A54F2477DF95A8D1A36C6/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
    },
  },

  data() {
    return {};
  },

  computed: {
    /* featureCardStyle() {
      return `linear-gradient(360deg, #000000 0%, rgba(0, 0, 0, 0.491594) 24.73%, rgba(0, 0, 0, 0) 100%), url(${this.cardImg});`;
    }, */
  },

  watch: {
    $route() {
      /* location.reload(); */
      /* this.$nuxt.refresh(); */
    } /* USE THIS.ROUTER.PUSH TO TRY TO REFRESH PAGE */,
  },
};
</script>

<style scoped>
a {
  cursor: url('~/assets/images/cursor/paimonCursor4.png'), auto;
}

.card {
  position: relative;

  width: 50rem;
  height: 27rem;
  margin: 1rem;

  border-radius: 1.2rem;

  /* box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.4); */
  transition: 0.3s all;
  opacity: 0.8;
}

.card:hover {
  transform: scale(1.02);
  opacity: 1;
}

.card-img {
  width: 100%;
  height: 100%;

  z-index: 0;
}

.card-text {
  position: absolute;
  top: 0;

  height: 100%;
  width: 100%;
  background: linear-gradient(
    360deg,
    #000000 0%,
    rgba(0, 0, 0, 0.491594) 24.73%,
    rgba(0, 0, 0, 0) 100%
  );

  z-index: 10;
}
</style>
