<template>
  <div style="display: none"></div>
</template>

<script>
export default {
  data() {
    return {
      newUser: this.$auth.loggedIn,
      userdata: this.$auth.user,
    };
  },

  created() {
    if (this.$store.state.auth.loggedIn) {
      this.fetchUser();
    }
  },

  methods: {
    async fetchUser() {
      const t = this;

      const getUserId = t.$auth.user.sub.replace('auth0|', '');
      // http://localhost:8000/6289babceda0db001153a8d8
      // `http://localhost:8000/${getUserId}`
      const token = await t.$auth.strategy.token.get();
      // const getUserId = this.userdata.sub.replace('auth0|', '');
      // console.log(getUserId);
      const userDataFetch = await fetch(
        `https://usobackend.onrender.com/${getUserId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const userDataFetched = await userDataFetch.json();

      // console.log(userDataFetched);

      t.$store.commit('gameData', userDataFetched);

      t.$store.commit('setSettings', userDataFetched.volSettings.master);
      t.$store.commit('setSettings2', userDataFetched.volSettings.music);
      t.$store.commit('setSettings3', userDataFetched.volSettings.hitSound);
      t.$store.commit('setSettings4', userDataFetched.gameSettings.scrollSpeed);
    },
  },
};
</script>

<style></style>
