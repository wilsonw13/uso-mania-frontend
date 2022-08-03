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

      console.log(userDataFetched);

      // Commit settingns

      t.$store.commit('gameData', userDataFetched);
    },
  },
};
</script>

<style></style>
