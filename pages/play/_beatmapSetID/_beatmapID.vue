<template>
  <div v-if="loaded.beatmapData" id="game-index">
    <NavBar v-show="false" />
    <div v-if="!gameEnded" id="game-page-container">
      <div
        v-if="beatmapData.metadata"
        class="game-image-container"
        :style="{
          'background-image': `urL(/beatmaps/${beatmapData.metadata.BeatmapSetID}/${beatmapData.events[0][2]})`,
        }"
      ></div>
      <button
        v-if="areAllLoaded && !started"
        class="game-start-button"
        @click="$refs.gameCanvas.startGame(), (started = true)"
      >
        START
      </button>

      <PlayGameCanvas
        ref="gameCanvas"
        :beatmap-data="beatmapData"
        :paused="paused"
        @updateStats="
          (newScore, newAccuracy) => {
            score = newScore;
            accuracy = newAccuracy;
          }
        "
        @endGameParent="endGame"
      />

      <div class="scorePercentage__container">
        <h1 id="score">
          {{
            score.toLocaleString('en-US', {
              minimumIntegerDigits: 6,
              maximumFractionDigits: 0,
              useGrouping: false,
            })
              ? score.toLocaleString('en-US', {
                  minimumIntegerDigits: 6,
                  maximumFractionDigits: 0,
                  useGrouping: false,
                })
              : Math.floor(score)
          }}
        </h1>
        <h1 id="percentage">
          {{ (Math.round(accuracy * 10000) / 100).toFixed(2) }}%
        </h1>
      </div>

      <div class="game-pb-container">
        <div id="game-pb"></div>
      </div>

      <div class="game-pb-vol-container">
        <div id="game-pb-vol" :style="{ opacity: opacity }"></div>

        <!-- <div class="vol-container">
          <button
            v-if="areAllLoaded && started"
            :style="{ opacity: opacity }"
            class="game-mute-button"
            @click="muteButton"
          >
            MUTE
          </button>
        </div> -->
      </div>

      <!-- </div> -->

      <div v-show="paused" class="game-pause-menu">
        <div class="game-pause-button-container">
          <button @click="onPauseKey()">Continue</button>
          <button>Retry</button>
          <button @click="$router.push('/beatmaps')">Return</button>
        </div>
      </div>
    </div>
    <PlayEndGame
      v-else
      :beatmap-data="beatmapData"
      :total-hits="totalHits"
      :stats="{
        score: score,
        maxCombo: maxCombo,
        accuracy: accuracy,
      }"
    />
  </div>
  <PlayBeatmapNotFound v-else-if="beatmapNotFoundError" />
</template>

<script>
export default {
  layout: 'nonav',

  data() {
    return {
      loaded: {
        progressbar: false,
        beatmapData: false,
      },
      areAllLoaded: false,
      started: false,

      beatmapNotFoundError: false,
      beatmapData: {},

      score: 0,
      accuracy: 1,
      totalHits: null,
      maxCombo: null,

      pauseKey: 'ESCAPE',
      paused: false,

      pbVolProgress: 1,
      scale: 0,
      opacity: 1,
      pbdur: null,
      progressBarVol: null,

      graphic: null,

      Page: this.$route.name,
      gameEnded: false,
    };
  },

  async fetch() {
    let promise = await fetch(
      `/beatmaps/${this.beatmapSetID}/${this.beatmapID}.json`
    );
    /* const promise = await fetch('/beatmaps/test/slider.json'); */

    this.beatmapData = await promise.json();

    // CHECK IF SONG NOT FOUND
    if (!Object.keys(this.beatmapData).length) {
      promise = await fetch('/beatmaps/682518/1443373.json');
      this.beatmapData = await promise.json();
    }

    this.loaded.beatmapData = true;
  },

  head() {
    return {
      script: [
        {
          src: '/lib/progressbar.min.js ',
          callback: () => (this.loaded.progressbar = true),
        },
      ],
    };
  },

  computed: {
    beatmapSetID() {
      return this.$route.params.beatmapSetID;
    },
    beatmapID() {
      return this.$route.params.beatmapID;
    },
  },

  watch: {
    loaded: {
      handler(newValue, oldValue) {
        // If ANY of the boolean values read false, the all scripts are NOT loaded.
        // If NO boolean values read false, then all scritps are loaded.
        if (!Object.values(this.loaded).some((bool) => !bool)) this.onLoad();
      },
      deep: true,
    },
  },

  destroyed() {
    const t = this;
    // find an alternative
    // window.removeEventListener('wheel', this.onScroll);
    document.removeEventListener('keydown', function (e) {
      if (e.repeat) return;

      if (e.key.toUpperCase() === t.pauseKey) t.onPauseKey();
    });
  },

  methods: {
    onLoad() {
      const t = this;

      if (document.querySelector('#game-pb')) {
        t.progressBar = new ProgressBar.Circle('#game-pb', {
          strokeWidth: 50,
          easing: 'easeInOut',
          color: '#FFEA82',
          trailColor: '#eee',
          trailWidth: 50,
          // svgStyle: null,
          // duration: t.songDuration,
        });
      }

      // window.addEventListener('wheel', this.onScroll);
      document.addEventListener('keydown', function (e) {
        if (e.repeat) return;

        if (e.key.toUpperCase() === t.pauseKey) t.onPauseKey();
      });

      // t.beatmapData = t.$store.state.beatmapData;

      /* ===============
            PROGRESS BAR
            =============== */

      // t.progressBarVol = new ProgressBar.Circle('#game-pb-vol', {
      //   color: '#FCB03C',
      //   // This has to be the same size as the maximum width to
      //   // prevent clipping
      //   strokeWidth: 7,
      //   easing: 'easeInOut',
      //   trailColor: '#eee',
      //   trailWidth: 7,
      //   duration: 1400,

      //   from: { color: '#aaa', width: 8 },
      //   to: { color: '#333', width: 8 },
      //   // Set default step function for all animate calls
      //   step: function (state, circle) {
      //     circle.path.setAttribute('stroke', state.color);
      //     circle.path.setAttribute('stroke-width', state.width);

      //     const value = Math.round(circle.value() * 100);
      //     if (value === 0) {
      //       circle.setText('Volume');
      //     } else {
      //       circle.setText(value);
      //     }
      //   },
      // });

      // t.progressBarVol.animate(t.pbVolProgress);

      t.areAllLoaded = true;
    },
    endGame(totalHits, maxCombo) {
      const t = this;

      t.totalHits = totalHits;
      t.maxCombo = maxCombo;
      t.gameEnded = true;
    },
    retart() {},
    onPauseKey() {
      this.paused = !this.paused;
      this.$refs.gameCanvas.onPauseKey(this.paused);
    },
    // onScroll(e) {
    //   this.scale += e.deltaY * -0.0002;
    //   // Restrict scale
    //   this.scale = Math.min(Math.max(0, this.scale), 1);
    //   // Apply scale transform
    //   Howler.volume(this.scale);
    //   this.pbVolProgress = Math.round(100 * this.scale) / 100;

    //   this.progressBarVol.set(this.pbVolProgress);
    // },
    muteButton() {
      if (this.music.mute() === false) {
        this.music.mute(true);
        this.opacity = 0.5;
      } else {
        this.music.mute(false);
        this.opacity = 1;
      }
      // this.music.mute(true);
    },
  },
};
</script>

<style scoped>
/* CSS DIRECTORY
 * [ PAGE CONTAINER ]
 * [ CANVAS CONTAINER ]
 * [ STATISTICS CONTAINER ]
 */

/* ===[ PAGE CONTAINER ]=== */

#game-index {
  width: 100vw;
  height: 100vh;
}

#game-page-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  overflow: hidden;
}

.game-image-container {
  position: absolute;

  width: 100%;
  height: 100%;

  opacity: 0.5;
  z-index: -100;

  background-size: cover;
}

.game-start-button {
  height: 20vh;
  width: 20vw;
  outline: none;

  border-radius: 10px;
  cursor: url('~/assets/images/cursor/paimonCursor4.png'), auto;

  background-image: linear-gradient(
      rgba(30, 30, 30, 0.8),
      rgba(30, 30, 30, 0.8)
    ),
    url('~/assets/images/backgrounds/landing-page-background-inazuma.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  transition: all 200ms ease-in-out;
  box-shadow: 0px 10px 10px 0px #1b1b1b;
  z-index: 100;

  font-size: 3rem;
}

.game-start-button:hover {
  transform: scale(0.95);
}

/* ===[ STATISTICS CONTAINER ]=== */

.game-statistics-container {
  min-width: 35rem;
  height: 30rem;

  padding: 1rem 2rem;

  background-color: rgba(128, 128, 128, 0.8);

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.game-statistics-container > h1 {
  font-size: 7rem;
}

/* ===[ PAGE CONTAINER ]=== */

.scorePercentage__container {
  position: fixed;
  top: -1rem;
  right: 0;
  min-width: 30rem;
  min-height: 17.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-end;
  color: #fff;
  padding: 1rem;
}

#score {
  line-height: 1.25rem;
  font-size: 15rem;
  font-weight: 500;
}

#percentage {
  line-height: 1.25rem;
  font-size: 7.5rem;
  font-weight: 300;
}

.bar-wrap {
  transform: rotate(-0.5turn);
  height: 80vh;
  padding: 6px;
  margin-top: 50px;

  border-radius: 2rem;

  background-color: white;
}

.bar {
  height: 0%;
  width: 15px;

  transition: height 0.15s ease-out;

  background-color: #38b000;
  border-radius: 100px;
  box-shadow: inset -1px -1px 10px rgb(0 0 0 / 0.5);
}

.game-pb-container {
  position: fixed;
  top: 1.4rem;
  right: 19rem;
  min-width: 30rem;
  min-height: 17.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-end;
  /* font-size: 2rem; */
  color: #fff;
  padding: 1rem;
}

#game-pb {
  width: 4.3rem;
  top: 0rem;
  right: 0;
  height: 5rem;
  width: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-end;
  font-size: 2rem;
  color: #fff;
  padding: 1rem;
}

/* .game-pb-vol-container {
  height: 50vh;
  width: 20vw;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  padding-top: 3rem;
} */

/* #game-pb-vol {
  position: relative;
  width: 80%;
  font-family: 'Raleway', Helvetica, sans-serif;
  font-size: 5rem;
} */

/* #game-pb-vol > div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
} */

.game-mute-button {
  color: black;
  height: 5vh;
  width: 5vw;
  font-size: 3rem;
}

/* PAUSE css begins here...*/

.game-pause-menu {
  position: absolute;
  z-index: 100;

  width: 100%;
  height: 100%;

  background-color: rgba(30, 30, 30, 0.9);
}

.game-pause-button-container {
  --border-width: 3px;
  position: absolute;

  width: 40rem;
  height: 55rem;

  background-image: linear-gradient(
      rgba(30, 30, 30, 0.8),
      rgba(30, 30, 30, 0.8)
    ),
    url('~/assets/images/backgrounds/fleeting-colors.jpg');
  background-repeat: no-repeat;
  background-size: cover;

  border-radius: 6rem;
  border: #777777 solid 0.5rem;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  box-shadow: 0px 10px 10px 0px #010101;
}

/* .game-pause-button-container::after {
    position: absolute;
    content: "";
    top: calc(-1 * var(--border-width));
    left: calc(-1 * var(--border-width));
    z-index: -1;
    width: calc(100% + var(--border-width) * 2);
    height: calc(100% + var(--border-width) * 2);
    background: linear-gradient(
      60deg,
      hsl(224, 85%, 66%),
      hsl(269, 85%, 66%),
      hsl(314, 85%, 66%),
      hsl(359, 85%, 66%),
      hsl(44, 85%, 66%),
      hsl(89, 85%, 66%),
      hsl(134, 85%, 66%),
      hsl(179, 85%, 66%)
    );
    background-size: 300% 300%;
    background-position: 0 50%;
    border-radius: calc(20 * var(--border-width));
    animation: moveGradient 4s alternate infinite;

    border: #eeeeee solid 0.5rem;

}  */

.game-pause-button-container > button {
  width: 20rem;
  height: 6rem;

  background-image: linear-gradient(
      rgba(30, 30, 30, 0.6),
      rgba(30, 30, 30, 0.6)
    ),
    url('~/assets/images/backgrounds/fleeting-colors.jpg');

  background-size: cover;

  border-radius: 3rem;
  border: #777777 solid 0.4rem;

  font-size: 3rem;
  color: #f3f3f3;

  transition: 0.3s all;

  cursor: url('~/assets/images/cursor/paimonCursor4.png'), auto;

  box-shadow: 0px 10px 10px 0px #1b1b1b;
}

.game-pause-button-container > button:hover {
  transform: translate(0, -0.5rem) scale(1.05);
  border: #fcfcfc solid 0.4rem;
}

@keyframes moveGradient {
  50% {
    background-position: 100% 50%;
  }
}
</style>
