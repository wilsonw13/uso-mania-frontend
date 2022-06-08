<template>
  <div class="beatmaps__content--body">
    <div class="under-nav"></div>

    <div id="play-index">
      <div class="play-content">
        <div class="play-title-textbox">
          <h1 class="play-title">♪ beatmaps listing</h1>
        </div>

        <div class="search-container">
          <form class="song-search-form">
            <input
              class="song-search-bar"
              type="text"
              placeholder="search for your song..."
            />

            <span class="deleteText">
              <img
                class="search-icon"
                src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2Ljk2NiA1Ni45NjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU2Ljk2NiA1Ni45NjY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPHBhdGggZD0iTTU1LjE0Niw1MS44ODdMNDEuNTg4LDM3Ljc4NmMzLjQ4Ni00LjE0NCw1LjM5Ni05LjM1OCw1LjM5Ni0xNC43ODZjMC0xMi42ODItMTAuMzE4LTIzLTIzLTIzcy0yMywxMC4zMTgtMjMsMjMgIHMxMC4zMTgsMjMsMjMsMjNjNC43NjEsMCw5LjI5OC0xLjQzNiwxMy4xNzctNC4xNjJsMTMuNjYxLDE0LjIwOGMwLjU3MSwwLjU5MywxLjMzOSwwLjkyLDIuMTYyLDAuOTIgIGMwLjc3OSwwLDEuNTE4LTAuMjk3LDIuMDc5LTAuODM3QzU2LjI1NSw1NC45ODIsNTYuMjkzLDUzLjA4LDU1LjE0Niw1MS44ODd6IE0yMy45ODQsNmM5LjM3NCwwLDE3LDcuNjI2LDE3LDE3cy03LjYyNiwxNy0xNywxNyAgcy0xNy03LjYyNi0xNy0xN1MxNC42MSw2LDIzLjk4NCw2eiIgZmlsbD0iIzAwMDAwMCIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K"
              />
            </span>
            <input class="song-submit-button" type="submit" value="" />
          </form>
        </div>

        <div class="my-video-audio">
          <div class="audio-cntrl-cont">
            <font-awesome-icon
              icon="fa-solid fa-backward-step"
              class="svg"
              @click="changeSongIndex(-1)"
            />
          </div>

          <div class="audio-cntrl-cont">
            <font-awesome-icon
              v-if="clicked"
              icon="fa-solid fa-play"
              class="svg"
              @click="toggleAudio()"
            />
            <font-awesome-icon
              v-else
              icon="fa-solid fa-pause"
              class="svg"
              @click="toggleAudio()"
            />
          </div>

          <div class="audio-cntrl-cont">
            <font-awesome-icon
              icon="fa-solid fa-forward-step"
              class="svg"
              @click="changeSongIndex(1)"
            />
          </div>

          <div id="audioProgress"></div>

          <div class="audio-cntrl-cont">
            <font-awesome-icon
              v-if="!muted"
              icon="fa-solid fa-volume-high"
              class="svg"
              @click="audioBarMute()"
            />
            <font-awesome-icon
              v-else
              icon="fa-solid fa-volume-xmark"
              class="svg"
              @click="audioBarMute()"
            />
          </div>
        </div>
        <div class="play-beatmap-content">
          <div v-if="!$fetchState.pending" class="play-beatmap-set-container">
            <div
              v-for="(oszArray, bmSetName) in bmSetsData"
              :key="bmSetName"
              class="play-beatmap-set"
              @click="
                (clickedBmSetName = bmSetName), beatmapSoundBit(), changeSound()
              "
            >
              <img
                v-if="oszArray[0].events[0]"
                class="beatmap-set-img"
                :src="`/beatmaps/${bmSetName}/${oszArray[0].events[0][2]}`"
              />
              <p class="beatmap-set-title">{{ oszArray[0].metadata.Title }}</p>
              <p class="beatmap-set-artist">
                {{ oszArray[0].metadata.Artist }}
              </p>
            </div>
          </div>
          <div v-if="clickedBmSetName" class="play-sidebar">
            <div class="play-sidebar-image-container">
              <img
                :src="`/beatmaps/${clickedBmSetName}/${
                  bmSetsData[`${clickedBmSetName}`][0].events[0][2]
                }`"
              />
            </div>
            <div class="play-sidebar-text-container">
              <p class="play-sidebar-text-title">
                {{ bmSetsData[`${clickedBmSetName}`][0].metadata.Title }}
              </p>
              <p>
                Artist:
                {{ bmSetsData[`${clickedBmSetName}`][0].metadata.Artist }}
              </p>
              <p>
                Mapper:
                {{ bmSetsData[`${clickedBmSetName}`][0].metadata.Creator }}
              </p>
              <nuxt-link
                id="leaderboard__link"
                :to="`/leaderboard/${
                  bmSetsData[`${clickedBmSetName}`][0].metadata.BeatmapSetID
                }`"
                class=""
                >Leaderboard</nuxt-link
              >
            </div>
            <table class="play-sidebar-difficulties">
              <tbody>
                <tr
                  v-for="(bmDifficulty, index) in bmSetsData[
                    `${clickedBmSetName}`
                  ]"
                  :key="index"
                >
                  <th>
                    <nuxt-link
                      :to="`/play/${bmDifficulty.metadata.BeatmapSetID}/${bmDifficulty.metadata.BeatmapID}`"
                      >{{ bmDifficulty.metadata.Version }}</nuxt-link
                    >
                  </th>

                  <th>{{ bmDifficulty.columns }}K</th>

                  <th>
                    {{
                      Math.round(
                        bmDifficulty.hitObjects.length / bmDifficulty.columns
                      )
                    }}
                    Notes/Col
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="play-sidebar">
            <img
              class="img-placeholder"
              src="~/assets/images/backgrounds/landing.png"
            />
            <p class="text-placeholder">click on a song! ~</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      bmSets: {},
      songIndexes: null,
      muted: false,
      currentIndex: null,
      currAudioBarVal: null,
      timeoutID: null,
      currAudioProg: null,

      bmSetsData: {},
      clickedBmSetName: null,
      clicked: true,
      clickBack: false,
      searchQuery: null,
      id: null,

      musicBeatmapDuration: 0,
      executed: false,
      chageExeuted: false,
      firstBeatmapAudio: null,
      currentAudio: null,
    };
  },

  async login() {
    await this.$auth.loginWith('auth0');
  },

  async fetch() {
    const t = this;

    const listOfBeatmaps = await fetch('/beatmaps/beatmaps.json');
    t.bmSets = await listOfBeatmaps.json();

    for (let i = 0; i < Object.keys(t.bmSets).length; i++) {
      const bmSetID = Object.keys(t.bmSets)[i];

      t.bmSetsData[bmSetID] = [];

      for (let bmI = 0; bmI < t.bmSets[bmSetID].length; bmI++) {
        const bmID = t.bmSets[bmSetID][bmI];

        const promise = await fetch(`/beatmaps/${bmSetID}/${bmID}.json`);
        const beatmapData = await promise.json();

        t.bmSetsData[bmSetID].push(beatmapData);
      }
    }

    t.songIndexes = Object.keys(t.bmSets);
  },

  mounted() {
    this.progressAudioBar = new ProgressBar.Line('#audioProgress', {
      strokeWidth: 5,
      color: '#8C9EFF',
      duration: 10000,
      trailColor: '#f3f3f3',
      trailWidth: 5,
      svgStyle: { width: '100%', height: '30%' },
    });
  },

  methods: {
    beatmapSoundBit() {
      const t = this;

      t.clicked = false;

      t.musicBeatmap = new Howl({
        src: [
          `/beatmaps/${t.clickedBmSetName}/B${
            t.bmSetsData[t.clickedBmSetName][0].general.AudioFilename
          }`,
        ],
        volume: 0.5,
        preload: true,
        html5: true,
      });

      if (!t.executed) {
        t.executed = true;

        t.progressAudioBar.set(0);
        t.progressAudioBar.animate(1.0);
        t.musicBeatmap.play();
        t.firstBeatmapAudio =
          t.bmSetsData[t.clickedBmSetName][0].general.AudioFilename;
        t.timeoutID = setTimeout(() => {
          t.resetAudio();
        }, 10000);
      }

      t.currentAudio =
        t.bmSetsData[t.clickedBmSetName][0].general.AudioFilename;
    },
    changeSound() {
      const t = this;

      if (t.firstBeatmapAudio !== t.currentAudio) {
        t.progressAudioBar.set(0);
        t.progressAudioBar.animate(1, {
          duration: 10000,
        });
        t.firstBeatmapAudio = t.currentAudio;

        Howler.stop();
        t.musicBeatmap.play();
        clearTimeout(t.timeoutID);
        t.timeoutID = setTimeout(() => {
          t.resetAudio();
        }, 10000);
      }
    },
    resetAudio() {
      this.executed = false;
      this.progressAudioBar.set(0);
      this.clicked = true;
    },
    toggleAudio() {
      const t = this;
      t.clicked = !t.clicked;

      if (!t.clickedBmSetName) {
        t.clickedBmSetName = Object.keys(t.bmSets)[0];
        t.beatmapSoundBit();
        t.changeSound();
      }

      if (t.clicked === true) {
        clearTimeout(t.timeoutID);
        t.currAudioBarVal = t.progressAudioBar.value();
        t.musicBeatmap.pause();
        t.progressAudioBar.stop();
      } else {
        clearTimeout(t.timeoutID);
        t.currAudioProg = Math.round((1 - t.currAudioBarVal) * 10000);

        t.progressAudioBar.animate(1, {
          duration: t.currAudioProg,
        });
        t.timeoutID = setTimeout(() => {
          t.resetAudio();
        }, t.currAudioProg);

        t.musicBeatmap.play();
      }
    },
    changeSongIndex(i) {
      const t = this;
      const currentIndex = t.songIndexes.indexOf(t.clickedBmSetName);
      const newIndex =
        (((currentIndex + i) % t.songIndexes.length) + t.songIndexes.length) %
        t.songIndexes.length;

      t.clickedBmSetName = t.songIndexes[newIndex];
      t.currentAudio =
        t.bmSetsData[t.clickedBmSetName][0].general.AudioFilename;
      t.beatmapSoundBit();
      t.changeSound();
    },
    audioBarMute() {
      this.muted = !this.muted;

      if (this.muted) {
        Howler.volume(0);
      } else {
        Howler.volume(1);
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans&family=Montserrat:wght@600&display=swap');

*,
.beatmaps__content--body {
  font-family: 'Dongle', sans-serif;
}

.my-video-audio {
  height: 5%;
  width: 20%;
  display: flex;
  align-items: center;
  flex-direction: row;
  /* border: solid; */
  position: fixed;
  bottom: 0;
  right: 1.15%;
  background-image: linear-gradient(
      rgba(160, 151, 211, 0.7),
      rgba(137, 127, 194, 0.7)
    ),
    url('~/assets/images/backgrounds/landing.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  border-radius: 6px;
}

.audio-cntrl-cont {
  /* height: 60%; */
  width: 15%;
  /* border: solid; */
}

/* Beatmaps Title */
.play-index {
  width: 100vw;
}

.play-content {
  --content-width: 55vw;
  --beatmap-set-container-width: 45vw;
  --sidebar: 25rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  background-image: linear-gradient(
      rgba(41, 34, 80, 0.7),
      rgba(33, 26, 77, 0.7)
    ),
    url('~/assets/images/backgrounds/landing.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

.play-title-textbox,
.search-container,
.play-beatmap-content {
  width: var(--content-width);
  min-width: 60rem;
}

.play-title-textbox {
  margin-top: 2rem;
  background-color: rgb(42, 36, 75);
}

.play-title {
  display: flex;
  align-items: center;
  font-size: 3.5rem;
  font-weight: 400;
  color: #f6f6f6;
  height: 5.5rem;
  margin: 0.5rem 1rem 0.5rem 3.5rem;
  padding-top: 0.5rem;
}

/* Search Container */

.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.5rem;
  background-image: linear-gradient(
      rgba(49, 45, 58, 0.7),
      rgba(49, 45, 58, 0.7)
    ),
    url('~/assets/images/backgrounds/enkanomiya-blurred.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

.svg {
  height: 2rem;
  width: 2rem;
  margin-left: 6px;
  margin-right: 6px;
  transition: all 0.3s;
  cursor: pointer;
}

.svg:hover {
  transform: rotate(-6deg);
}

.deleteText {
  transform: translateY(30%);
  left: 4%;
  width: 0;
  position: relative;
}

.search-icon {
  filter: invert(1);
  width: 2rem;
}

.song-search-form {
  width: 60vw;
  display: flex;
  justify-content: center;
  padding: 1.5rem;
}

.song-search-form > input {
  font-size: 2.5rem;
  height: initial;

  overflow: hidden;
  background-color: rgb(49, 45, 58);
  border-radius: 0rem;
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.4);
  border: none;
  outline: none;
  cursor: url('~/assets/images/cursor/paimonCursor4.png'), auto;
}

.song-search-bar {
  width: 45vw;
  height: 3rem;
  padding: 0.25rem 0 0 1.25rem;
}

.song-submit-button {
  width: 5vw;
  min-width: 4rem;
  height: 3rem;
  padding: 1rem;
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.4);
}

/* Beatmap Content */

.play-beatmap-content {
  width: var(--content-width);
  display: flex;
  align-items: flex-start;
  margin: 2rem 0 1rem 0;
  padding: 1.75rem;
  background-image: linear-gradient(
      rgba(49, 45, 58, 0.7),
      rgba(49, 45, 58, 0.7)
    ),
    url('~/assets/images/backgrounds/enkanomiya-blurred.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

.play-beatmap-set-container {
  width: calc(var(--content-width) - var(--sidebar));
  display: flex;
  flex-wrap: wrap;
  /* Gap => Column Gap, Row Gap */
  gap: 2rem 2rem;
}

.play-beatmap-set {
  position: relative;
  width: 28rem;
  height: 13.5rem;
  border: 0.2rem solid rgb(45, 40, 68);
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  transition: all 100ms linear;
  cursor: url('~/assets/images/cursor/paimonCursor4.png'), auto;
  border-radius: 1rem;
}

.play-beatmap-set:hover {
  transform: scale(1.05);
}

.play-beatmap-set:hover::after {
  content: '';
  display: block;
  width: 100px;
  height: 175%;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 25%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 1) 75%,
    rgba(255, 255, 255, 0) 100%
  );
  opacity: 0.25;
  position: absolute;
  top: -80px;
  left: 40px;
  animation: shine 250ms linear;
  transform: translateX(250px) rotate(-25deg);
}

.button.play {
  opacity: 1;
  width: 74px;
  height: 74px;
  border-style: solid;
  border-width: 37px 0px 37px 74px;
  border-color: transparent transparent transparent yellow;
  /* display: none; */
}

.fa-play {
  height: 2rem;
  width: 3rem;
  margin-left: 0.4rem;
  margin-right: auto;
  /* font-size: 6rem; */
  opacity: 1;
}

.fa-pause {
  height: 2rem;
  width: 3rem;
  margin-left: 0.4rem;
  margin-right: auto;
  /* font-size: 6rem; */
  opacity: 1;
}

.play-btn {
  height: 6rem;
  width: 6rem;
  margin-left: auto;
  margin-right: auto;
  /* font-size: 6rem; */
  opacity: 1;
}

/* */

@keyframes shine {
  0% {
    transform: translateX(-30px) rotate(-25deg);
  }

  100% {
    transform: translateX(250px) rotate(-25deg);
  }
}

/* */

.beatmap-set-img {
  position: absolute;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 1;
}

.play-beatmap-set:hover > .beatmap-set-img {
  opacity: 0.5;
}

.play-beatmap-set > p {
  width: 100%;
  margin: 0 0 0 0.5rem;
  display: inline;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.beatmap-set-title {
  font-size: 3.25rem;
}

.beatmap-set-artist {
  font-size: 2.5rem;
}

.play-sidebar {
  width: calc(32rem + var(--sidebar));

  min-width: 0;
  min-height: 25rem;
  border: 0.2rem solid rgb(45, 40, 68);
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  height: auto;
  background-image: linear-gradient(rgba(14, 7, 29, 0.7), rgba(17, 11, 36, 0.7)),
    url('~/assets/images/backgrounds/fleeting-colors.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

.play-sidebar-image-container {
  width: 100%;
  aspect-ratio: 16 / 9;
}

.play-sidebar-image-container > img {
  width: 100%;
  display: block;
  overflow: hidden;
}

.play-sidebar-text-container > * {
  font-size: 2.25rem;
  margin: 0 1rem 0 1rem;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.play-sidebar-text-title {
  font-size: 5.5rem;
  line-height: 4rem;
  color: #e7ffff;
}

.play-sidebar-difficulties {
  width: 100%;
  border-collapse: collapse;
}

.play-sidebar-difficulties > tbody > tr:nth-child(even) {
  background-color: #2d2f50;
}

.play-sidebar-difficulties > tbody > tr:nth-child(odd) {
  background-color: #3f405f;
}

.play-sidebar-difficulties > tbody > tr > th {
  font-size: 2.5rem;
}

.play-sidebar-difficulties > tbody > tr > th > * {
  font-size: 3.25rem;
  color: rgb(133, 185, 228);
  transition: all 100ms ease-in-out;
  cursor: url('~/assets/images/cursor/paimonCursor4.png'), auto;
}

.play-sidebar-difficulties > tbody > tr > th > *:hover {
  text-decoration: underline;
  color: rgb(197, 221, 240);
}

.text-placeholder {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 4rem;
  text-shadow: 5px 5px 3px rgb(1, 5, 20);
}

.img-placeholder {
  height: 21.5rem;
  background-image: linear-gradient(
      rgba(49, 45, 58, 0.7),
      rgba(49, 45, 58, 0.7)
    ),
    url('~/assets/images/backgrounds/fleeting-colors.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

#leaderboard__link {
  font-size: 3.75rem;
  color: #8587fa;
  cursor: url('~/assets/images/cursor/paimonCursor4.png'), auto;
  transition: all 300ms;
  font-style: italic;
}

#leaderboard__link:hover {
  color: #b0b1f8;
}
</style>
