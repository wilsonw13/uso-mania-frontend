<template>
  <div>
    <div class="under-nav"></div>

    <h1 class="hello__user">welcome to uso!</h1>

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
          <HomeFeatureSongCard
            card-title="Six Trillion Years and Overnight Story"
            card-artist="kemu feat. IA"
            card-route="beatmaps"
            card-img="/beatmaps/1213119/rkc.jpg"
          />
          <HomeFeatureSongCard
            card-title="Jingle Bells"
            card-artist="Altria Pendragon (Santa Alter) (CV : Ayako Kawasumi)"
            card-route="beatmaps"
            card-img="/beatmaps/689134/BG.jpg"
          />
          <HomeFeatureSongCard
            card-title="Goodbye Moonmen"
            card-artist="The Living Tombstone feat. Fart"
            card-route="beatmaps"
            card-img="/beatmaps/1249137/mJGRHh3.jpg"
          />
          <HomeFeatureSongCard
            card-title="Harumachi Clover (TV Size)"
            card-artist="Hanasaka Yui (CV: M.A.O)"
            card-route="beatmaps"
            card-img="/beatmaps/682518/Harumachi%20bg1.jpg"
          />
        </section>
        <section class="news home-section">
          <h1 class="news-header">!uso News</h1>

          <div class="news-container">
            <HomeNewsCard>
              <template #header>we welcome you to !uso mania~</template>

              <template #body>
                we do not give a starving man a fish. we teach him how to fish
                and make him independent" - yukino yukinoshita
                <br />
                ...
                <br />
                !uso mania is an ambitious full stack web application developed
                over the course of six months. this project fully involves the
                application of numerous real world industry skills, from the
                fundamentals of web development like html, css, and javascript,
                to the utilization of vue, vuex, nuxt, auth0, and several
                libraries. led by captain wilson wuchen and with team members
                harvey, kenny, ethan, and ryan, the execution of a complex
                rhythm game went from dream to reality.
                <br />
                and of course...
                <br />
                ...thank you to the great mr. whalen himself, thank you for all
                your support and never ever going easy on us~
              </template>
            </HomeNewsCard>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  auth: false,

  data() {
    return {
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

    async getFeatureCards() {
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
.hello__user {
  position: absolute;
  top: 50%;

  width: 100%;

  font-size: 13rem;
  font-weight: 400;

  text-align: center;
  text-shadow: 0.8rem 0.8rem 0.5rem #212272;

  animation: filterChange 4s infinite ease 0s;
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

.news-container {
  display: flex;
  flex-direction: column;

  gap: 2rem 0rem;
}

.news-header {
  animation: filterChange 5s infinite ease 0s;
  color: #9cf5b9;
}

.home-section {
  padding: 7rem 0 0 0;
}

@media screen and (max-width: 900px) {
  .under-nav {
    height: 4.25rem;
  }
  .hello__user {
    font-size: 11rem;
  }
}
</style>
