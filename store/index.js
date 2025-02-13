export const state = () => ({
  user: null,
  userSettings: {
    masterVolume: 8,
    musicVolume: 8,
    hitSoundsVolume: 2,
    scrollSpeed: 10,
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
  // setSettings(state, masterVol, musicVol, hitsoundsVol, scrollSpeed, username) {
  //   state.userSettings.masterVolume = masterVol;
  //   state.userSettings.musicVolume = musicVol;
  //   state.userSettings.hitSoundsVolume = hitsoundsVol;
  //   state.userSettings.scrollSpeed = scrollSpeed;
  //   state.userSettings.username = username;
  // },
  setSettings(state, userDataFetch) {
    state.userSettings.masterVolume = userDataFetch;
  },
  setSettings2(state, userDataFetch) {
    state.userSettings.musicVolume = userDataFetch;
  },
  setSettings3(state, userDataFetch) {
    state.userSettings.hitSoundsVolume = userDataFetch;
  },
  setSettings4(state, userDataFetch) {
    state.userSettings.scrollSpeed = userDataFetch;
  },
  setSettings5(state, userDataFetch) {
    state.userSettings.username = userDataFetch;
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
