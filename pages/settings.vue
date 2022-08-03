<template>
  <div class="settings__page">
    <section class="landing">
      <video
        id="landing-video"
        class="video-bg"
        autoplay
        muted
        loop
        playsinline
        disablePictureInPicture
        src="../assets/images/backgrounds/landing-narukami-shrine.mp4"
        type="video/mp4"
      ></video>
    </section>

    <div class="settings__container">
      <h1 id="settings__title">settings.</h1>
      <form class="settings__form">
        <section class="settings__section">
          <header class="sounds__titles">
            <h2 id="sounds__title">sfx/sounds</h2>
            <h3 id="sounds__subTitle">adjust your volume settings</h3>
          </header>
          <button class="btn" @click.prevent="saveSettings()">update</button>

          <fieldset class="settings__field">
            <!-- <div id="fieldset__user" class="fieldset-item">
              <div class="username-container">
                <h1 class="username">ktestusername</h1>
                <form class="user-form">
                  <input
                    class="user-bar"
                    type="text"
                    placeholder="change username..."
                  />
                </form>
              </div>
            </div> -->

            <div class="fieldset-item">
              <picture aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path
                    d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"
                  ></path>
                </svg>
              </picture>
              <div class="input-stack">
                <label aria-hidden="true">master ~</label>
                <input
                  v-model.number="settings.volume.master"
                  type="range"
                  step="1"
                  min="0"
                  max="100"
                  style="--track-fill: 30%"
                />
                <input
                  v-model="settings.volume.master"
                  type="number"
                  min="0"
                  max="100"
                  @keydown="validateVolume('master')"
                  @keyup="validateVolume('master')"
                />
              </div>
            </div>

            <div class="fieldset-item">
              <picture aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path
                    d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"
                  ></path>
                </svg>
              </picture>
              <div class="input-stack">
                <label aria-hidden="true">music ~</label>
                <input
                  v-model.number="settings.volume.music"
                  type="range"
                  step="1"
                  min="0"
                  max="100"
                  style="--track-fill: 30%"
                />
                <input
                  v-model="settings.volume.music"
                  type="number"
                  min="0"
                  max="100"
                  @keydown="validateVolume('music')"
                  @keyup="validateVolume('music')"
                />
              </div>
            </div>

            <div class="fieldset-item">
              <picture aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path
                    d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"
                  ></path>
                </svg>
              </picture>
              <div class="input-stack">
                <label aria-hidden="true">hit sounds ~</label>
                <input
                  v-model.number="settings.volume.hitSound"
                  type="range"
                  step="1"
                  min="0"
                  max="100"
                  style="--track-fill: 30%"
                />
                <input
                  v-model="settings.volume.hitSound"
                  type="number"
                  min="0"
                  max="100"
                  @keydown="validateVolume('hitSound')"
                  @keyup="validateVolume('hitSound')"
                />
              </div>
            </div>

            <div class="fieldset-item">
              <picture aria-hidden="true">
                <!-- <svg viewBox="0 0 24 24">
                  <path
                    d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"
                  ></path>
                </svg> -->
              </picture>
              <div class="input-stack">
                <label aria-hidden="true">scroll speed ~</label>
                <input
                  v-model.number="settings.game.scrollSpeed"
                  type="range"
                  step="1"
                  min="5"
                  max="40"
                  style="--track-fill: 30%"
                />
                <input
                  v-model="settings.game.scrollSpeed"
                  type="number"
                  min="5"
                  max="40"
                  @keydown="validateScrollSpeed()"
                  @keyup="validateScrollSpeed()"
                />
              </div>
            </div>
          </fieldset>
        </section>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      userdata: this.$auth.user,
      settings: null,
    };
  },
  created() {
    this.settings = structuredClone(this.$store.state.settings);
  },
  methods: {
    async saveSettings() {
      const t = this;

      // Changes global Howler Volume
      Howler.volume(t.settings.volume.master / 100);

      // Commit to Vuex Store
      t.$store.commit('setSettings', structuredClone(t.settings));

      // PATCH to database
      const getUserId = t.userdata.sub.replace('auth0|', '');

      try {
        const token = await t.$auth.strategy.token.get();
        fetch(`https://usobackend.onrender.com/update/${getUserId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            volSettings: {
              master: `${t.settings.volume.master}`,
              music: `${t.settings.volume.music}`,
              hitSound: `${t.settings.volume.hitSound}`,
            },
            gameSettings: {
              scrollSpeed: `${t.settings.game.scrollSpeed}`,
            },
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: token,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    clamp(num, min, max) {
      return Math.min(Math.max(num, min), max);
    },
    validateVolume(name) {
      const vol = this.settings.volume;
      vol[name] = +vol[name].toString().replace(/[^0-9]/g, '');
      vol[name] = this.clamp(vol[name], 0, 100);
    },
    validateScrollSpeed() {
      const game = this.settings.game;
      game.scrollSpeed = +game.scrollSpeed.toString().replace(/[^0-9]/g, '');
      game.scrollSpeed = this.clamp(game.scrollSpeed, 5, 40);
    },
  },
};
</script>

<style scoped>
* {
  font-family: 'Dongle', sans-serif;
  margin: 0;
  padding: 0;
}

#rangeValue {
  color: #0d0c36;
}

/* .settings__page {
  min-height: 100vh;
  height: 100%;
} */

.landing {
  width: 100%;
}

.btn {
  position: absolute;
  height: 4.5rem;
  width: 11rem;
  font-size: 3rem;
  margin: auto;

  color: #f0f1ff;
  background-color: #6847dd;
  border-radius: 12px;
  cursor: url('~/assets/images/cursor/paimonCursor4.png'), auto;
  transition: all 300ms;
}

.btn:hover {
  transform: translateY(-0.5rem);
  background: #c850cc;
}

.btn:active {
  transform: scale(0.8);
  background: #14127c;
}

.video-bg {
  position: absolute;
  width: 100%;
  height: calc(100vh - 9.5rem);
  object-fit: cover;
  object-position: 50% 25%;
  z-index: -1;
}

/* setting styles */

#settings__title {
  font-size: 7.5rem;
  font-weight: 500;
  line-height: 4rem;
  text-shadow: 4px 4px 6px rgba(0, 0, 0, 0.8);
}

.sounds__titles {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

#sounds__title {
  font-size: 4.5rem;
  font-weight: 400;
  text-shadow: 4px 4px 6px rgba(0, 0, 0, 0.8);
}

#sounds__subTitle {
  font-size: 2.5rem;
  font-weight: 400;
  font-style: italic;
  text-shadow: 4px 4px 6px rgba(0, 0, 0, 0.8);
}

.settings__container {
  display: grid;
  gap: 2rem;
  place-content: center;
  padding: 5rem;
}

.settings__form {
  max-width: 90vw;
  gap: 3rem 6rem;
  --repeat: auto-fit;
  grid-template-columns: repeat(auto-fit, minmax(min(10ch, 100%), 35ch));
  align-items: flex-start;
}

.settings__section {
  display: grid;
  gap: 1.5rem;
}

.settings__field {
  width: 45rem;
  height: 55rem;
  border: 1px solid #b3b3da;
  background: #b3b3da;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1px;
  border-radius: 1rem;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.fieldset-item {
  background: #ecedff;
  display: grid;
  grid-template-columns: 2rem 1fr;
  gap: 1.75rem;
  padding: 1.5rem 2rem 1rem 1.5rem;
}

.fieldset-item > picture {
  -webkit-clip-path: circle(40%);
  clip-path: circle(40%);
  display: inline-grid;
  align-content: center;
  justify-content: center;
  place-content: center;
  background: #ecedff fixed;
}

.fieldset-item svg {
  fill: #283394;
  height: 3.75rem;
  padding-right: 3.5rem;
}

.fieldset-item > :is(.input-stack, label) {
  display: grid;
  gap: 0.5rem;
}

.fieldset-item > .input-stack > label {
  display: contents;
  font-style: italic;
  font-size: 2.75rem;
  color: #000;
  text-shadow: 2px 4px 1px rgba(255, 255, 255, 0.8);
}

input[type='range'] {
  --track-height: 0.5ex;
  --track-fill: 0%;
  --thumb-size: 3ex;
  --thumb-offset: -1.25ex;
  --thumb-highlight-size: 0px;
  display: block;
  width: 100%;
  margin: 1ex 0;
  outline-offset: 5px;
  cursor: url('~/assets/images/cursor/paimonCursor4.png'), auto;
}

input[type='text'],
input[type='number'] {
  height: 4rem;
  color: black;
  font-size: 5rem;
}

/* Hide Arrows on Number Input Field */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}

#fieldset__user {
  padding: 0rem 2rem 0rem 1.5rem;
}

.username {
  padding-top: 0.5rem;
  font-size: 3rem;
  color: #0d0c36;
  width: 20rem;
}

.username-container {
  width: 42rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
.user-form {
  width: 42rem;
  display: flex;
  justify-content: center;
  padding: 1.5rem;
}

.user-form > input {
  font-size: 2.5rem;
  height: 4rem;
  color: black;

  overflow: hidden;
  background-color: rgb(237, 232, 250);
  border-radius: 8px;
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.4);
  border: none;
  outline: none;
  cursor: url('~/assets/images/cursor/paimonCursor4.png'), auto;
}

.user-bar {
  width: 100%;
  height: 3rem;
  padding: 0.25rem 0 0 1.25rem;
}

.settings__container {
  display: grid;
  /* gap: 3rem; */
  place-content: center;
  padding: 3rem 5rem 2rem 5rem;
}

@media screen and (max-width: 900px) {
  .under-nav {
    height: 4.25rem;
  }

  .settings__container {
    padding: 7rem 5rem 1rem 5rem;
  }

  .video-bg {
    height: calc(100vh - 4.25rem);
  }
}
</style>
