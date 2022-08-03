export const state = () => ({
  user: null,
  settings: {
    volume: {
      master: 100,
      music: 50,
      hitSound: 50,
    },
    game: {
      keys: [],
      scrollSpeed: 10,
    },
    username: '',
  },
  // gameData: {
  //   A: 0,
  //   S: 0,
  //   SS: 0,
  //   accuracy: null,
  //   maxCombo: null,
  //   performance: null,
  //   playCount: 0,
  // },
  gameData: null,
  songDuration: null,
  pageData: {
    currentPage: '',
  },
});

export const getters = {};

export const actions = {};

export const mutations = {
  setSettings(state, settingsObj) {
    state.settings = settingsObj;
  },

  gameData(state, allGameData) {
    state.gameData = allGameData;
  },

  // gameData(state, gamedata) {
  //   state.gameData.A = gamedata;
  // },
  // gameData2(state, gamedata) {
  //   state.gameData.S = gamedata;
  // },
  // gameData3(state, gamedata) {
  //   state.gameData.SS = gamedata;
  // },
  // gameData4(state, gamedata) {
  //   state.gameData.accuracy = gamedata;
  // },
  // gameData5(state, gamedata) {
  //   state.gameData.maxCombo = gamedata;
  // },
  // gameData6(state, gamedata) {
  //   state.gameData.performance = gamedata;
  // },
  // gameData7(state, gamedata) {
  //   state.gameData.playCount = gamedata;
  // },

  currSongDuration(state, songDur) {
    state.songDuration = songDur;
  },

  nuxtRoute(state) {
    state.pageData.currentPage = this.$route.name;
  },
};

// this.$store.commit('setBeatmap', beatmapData);
