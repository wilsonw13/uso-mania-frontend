<template>
  <div class="login-page">
    <nuxt-link to="/home" class="uso__logo">
      <img
        class="uso__logo--hover"
        src="~/assets/images/navigation/osu-white.svg"
        alt="logo"
      />
    </nuxt-link>
    <video
      id="login-video"
      class="video-bg"
      autoplay
      muted
      loop
      playsinline
      disablePictureInPicture
      src="../assets/images/backgrounds/landing-seirai-island.mp4"
      type="video/mp4"
    ></video>
    <div class="login-box">
      <h1>Profile</h1>
      <div class="login-group">
        <p>Username</p>
        <input v-model="auth.email" class="login-textbox" type="text" />
      </div>
      <div class="login-group">
        <div class="password-text">
          <p>Password</p>
          <p id="show-password-btn">Show password</p>
        </div>
        <input v-model="auth.password" class="login-textbox" type="password" />
      </div>
      <input type="submit" value="Login" class="login-button" @click="login" />
    </div>
  </div>
</template>

<script>

export default {
  layout: 'nonav',
  data() {
    return {
      snackbar: false,
      snackbarText: 'No error message',
      auth: {
        email: '',
        password: '',
      },
    };
  },

  methods: {
    login() {
      const that = this;
      this.$fire.auth
        .signInWithEmailAndPassword(this.auth.email, this.auth.password)
        .catch(function (error) {
          that.snackbarText = error.message;
          that.snackbar = true;
        })
        .then((user) => {
          this.$router.push('/');
        });
    },
  },
};
</script>

<style scoped>

.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 90.2vh;
  height: 100%;
  background-image: linear-gradient(
      rgba(13, 4, 66, 0.7),
      rgba(16, 51, 112, 0.8)
    ),
    /* url('~/assets/images/backgrounds/fleeting-colors.jpg'); */
      url('~/assets/images/backgrounds/chnBg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
.cover-photo {
  width: var(--container-width);
  height: 32rem;
  margin-top: 4rem;
  background-image: linear-gradient(
      rgba(62, 54, 104, 0.7),
      rgba(62, 54, 104, 0.7)
    ),
    url('~/assets/images/backgrounds/yaeMiko.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center 25%;
}
.b {
  height: 4rem;
  width: 4rem;
}
.login-box {
  background: rgba(66, 50, 89, 0.9);
  margin: auto;
  width: 50rem;
  height: 50rem;
  padding: 5rem;
  display: flex;
  flex-direction: column;
  font-size: 4rem;
}
.profile-picture {
  width: var(--pfp-size);
  height: var(--pfp-size);
  border-radius: var(--pfp-radius);
  overflow: hidden;
  align-self: flex-end;

  margin: -4rem 2rem 1.5rem 0;
}
.password-text {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

#collection-header {
  align-self: center;
  font-size: 5rem;
  font-weight: 500;
  text-transform: uppercase;
  margin: auto;
}
</style>
