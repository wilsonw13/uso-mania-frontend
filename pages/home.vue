<template>
  <div>
    <div class="under-nav"></div>

    <h1 class="hello__user">welcome to uso, {{ username }} !</h1>

    <section class="landing">
      <video
        id="landing-video"
        class="video-bg"
        autoplay
        muted
        loop
        playsinline
        disablePictureInPicture
        src="../assets/images/backgrounds/landing-narukami-shrine-2.mp4"
        type="video/mp4"
      ></video>
    </section>
    <section class="home-main">
      <div class="home-content-container">
        <section class="feature-songs home-section">
          <feature-song-card
            card-title="Six Trillion Years and Overnight Story"
            card-artist="kemu feat. IA"
            card-route="beatmaps"
            card-img="/beatmaps/1213119/rkc.jpg"
          />
          <feature-song-card
            card-title="Jingle Bells"
            card-artist="Altria Pendragon (Santa Alter) (CV : Ayako Kawasumi)"
            card-route="beatmaps"
            card-img="/beatmaps/689134/BG.jpg"
          />
          <feature-song-card
            card-title="Goodbye Moonmen"
            card-artist="The Living Tombstone feat. Fart"
            card-route="beatmaps"
            card-img="/beatmaps/1249137/mJGRHh3.jpg"
          />
          <feature-song-card
            card-title="Harumachi Clover (TV Size)"
            card-artist="Hanasaka Yui (CV: M.A.O)"
            card-route="beatmaps"
            card-img="/beatmaps/682518/Harumachi%20bg1.jpg"
          />
        </section>
        <section class="news home-section">
          <h1 class="news-header">!uso News</h1>

          <news-card />
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import FeatureSongCard from '../components/homepage/FeatureSongCard.vue';
import NewsCard from '../components/homepage/NewsCard.vue';

export default {
  auth: false,
  components: { FeatureSongCard, NewsCard },

  data() {
    return {
      username: this.$auth.user.nickname,
      featureSongs: [
        {
          cardType: 'Featured Map',
          cardTitle: 'Yoru ni Kakeru',
          cardArtist: 'YOASOBI',
          cardRoute: '/beatmaps',
          cardImg:
            'https://steamuserimages-a.akamaihd.net/ugc/1758061978083459138/795D1B88F10FBF6BA70A54F2477DF95A8D1A36C6/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
        },
      ],
    };
  },

  created() {
    this.getFeatureCards();
  },

  methods: {
    auth() {
      this.$auth.loginWith('auth0');
    },

    testEnv() {},

    getFeatureCards: async function getFeatureCards() {
      /*  try {
        const data = await this.$axios.$get('data.json');
        const data = await fetch('../static/data.json');
        console.log(data + 'fetched data');
        this.featureSongs = data.json;
        console.log(this.featureSongs);
      } catch (error) {
        console.log(error);
      } */
    },
  },
};
</script>

<style scoped>
@keyframes filterChange {
  0% {
    filter: hue-rotate(0deg);
  }
  20% {
    filter: hue-rotate(45deg);
  }
  40% {
    filter: hue-rotate(115deg);
  }
  60% {
    filter: hue-rotate(200deg);
  }
  80% {
    filter: hue-rotate(333deg);
  }
  100% {
    filter: hue-rotate(0deg);
  }
}
@-o-keyframes filterChange {
  0% {
    filter: hue-rotate(0deg);
  }
  20% {
    filter: hue-rotate(45deg);
  }
  40% {
    filter: hue-rotate(115deg);
  }
  60% {
    filter: hue-rotate(200deg);
  }
  80% {
    filter: hue-rotate(333deg);
  }
  100% {
    filter: hue-rotate(0deg);
  }
}
@-moz-keyframes filterChange {
  0% {
    filter: hue-rotate(0deg);
  }
  20% {
    filter: hue-rotate(45deg);
  }
  40% {
    filter: hue-rotate(115deg);
  }
  60% {
    filter: hue-rotate(200deg);
  }
  80% {
    filter: hue-rotate(333deg);
  }
  100% {
    filter: hue-rotate(0deg);
  }
}

@-webkit-keyframes filterChange {
  0% {
    filter: hue-rotate(0deg);
  }
  20% {
    filter: hue-rotate(45deg);
  }
  40% {
    filter: hue-rotate(115deg);
  }
  60% {
    filter: hue-rotate(200deg);
  }
  80% {
    filter: hue-rotate(333deg);
  }
  100% {
    filter: hue-rotate(0deg);
  }
}

.hello__user {
  font-size: 13rem;
  font-weight: 400;
  text-shadow: 4px 4px 5px #212272;
  position: absolute;
  top: 50%;
  text-align: center;
  width: 100%;
}

.container {
  background-color: wheat;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

button {
  width: 10rem;
  height: 10rem;
  font-size: 4rem;
}

.under-nav {
  height: 9.5rem;
}

.landing {
  width: 100%;

  height: calc(100vh - 9.5rem);
}

.home-main {
  width: 100%;
  height: auto;
  padding-bottom: 5rem;
  background-image: linear-gradient(
      rgba(16, 51, 112, 0.8),
      rgba(16, 51, 112, 0.7)
    ),
    url('~/assets/images/navigation/nav-bg.jpg');
  background-attachment: fixed;
}

.home-content-container {
  width: 104rem;
  margin: auto;
}

.feature-songs {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.news-header {
  animation: filterChange 5s infinite ease 0s;
  color: #9cf5b9;
}

.home-section {
  padding: 7rem 0 0 0;
}
</style>
