<template>
  <NuxtLink :to="cardRoute">
    <div
      class="feature-card"
      :style="{
        background: 'url(' + cardImg + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }"
    >
      <!-- <img
      src="~/assets/images/yoru-ni-kakeru.jpg"
      alt="Yoru ni Kakeru"
      class="feature-card-img"
    /> -->
      <div class="feature-card-text">
        <h2 class="card-header">
          {{ cardType }}: {{ cardTitle }} - {{ cardArtist }}
        </h2>
      </div>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  name: 'FeatureSongCard',
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
  cursor: url('~/assets/images/cursor/paimonCursor1.png'), auto;
}

.feature-card {
  cursor: url('~/assets/images/cursor/paimonCursor4.png'), auto;
  width: 50rem;
  height: 27rem;
  margin: 1rem;
  /*   background: linear-gradient(
      360deg,
      #000000 0%,
      rgba(0, 0, 0, 0.491594) 24.73%,
      rgba(0, 0, 0, 0) 100%
    ),
    url('~/assets/images/yoru-ni-kakeru.jpg'); */
  border-radius: 1.2rem;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  /* box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.4); */
  transition: 0.3s all;
  opacity: 0.9;
}
.feature-card:hover {
  transform: scale(1.02);
  opacity: 1;
}

.feature-card-text {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: linear-gradient(
    360deg,
    #000000 0%,
    rgba(0, 0, 0, 0.491594) 24.73%,
    rgba(0, 0, 0, 0) 100%
  );

  border-radius: 1.2rem;
  padding: 2rem 2rem 1.6rem 2rem;
}
.card-header {
  z-index: 0;
}

/* .feature-card-img {
  width: 100%;
  height: 100%;
  border-radius: 1.2rem;
  z-index: -1;
}
.feature-card-gradient {
  background: linear-gradient(
    360deg,
    #000000 0%,
    rgba(0, 0, 0, 0.491594) 24.73%,
    rgba(0, 0, 0, 0) 100%
  );
} */
</style>
