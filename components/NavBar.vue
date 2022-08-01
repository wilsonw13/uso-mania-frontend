<template>
  <div class="uso__navbar--body">
    <nav class="uso__navbar">
      <div class="uso__logolinks--container">
        <nuxt-link to="/home" class="uso__logo">
          <img
            class="uso__logo--hover"
            src="~/assets/images/navigation/osu-white.svg"
            alt="logo"
          />
        </nuxt-link>

        <ul class="uso__navbar--links" @click="close">
          <li>
            <nuxt-link to="/home" class="uso__links">home</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/beatmaps" class="uso__links">beatmaps</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/leaderboard" class="uso__links"
              >leaderboard</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/aboutUs" class="uso__links">team</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/help" class="uso__links">help</nuxt-link>
          </li>
        </ul>
      </div>

      <div class="uso__avatar--container">
        <div class="uso__avatar">
          <div class="uso__circle">
            <nuxt-link to="/shop" class="uso__button"
              ><img
                id="resizedBtn3"
                src="~/assets/images/navigation/primogem.png"
                class="nav-shop-btns"
            /></nuxt-link>
          </div>
          <div class="uso__circle">
            <nuxt-link to="/aboutUs" class="uso__button"
              ><img
                id="resizedBtn2"
                src="~/assets/images/navigation/paimon2.png"
                class="nav-shop-btns"
            /></nuxt-link>
          </div>
          <div class="uso__circle">
            <nuxt-link to="/settings" class="uso__button"
              ><img
                id="resizedBtn1"
                src="~/assets/images/navigation/paimon1.png"
                class="nav-shop-btns"
            /></nuxt-link>
          </div>

          <div class="nav__col nav__col--avatar">
            <button
              id="show-login"
              class="avatar avatar--nav avatar--guest"
            ></button>

            <div class="login-container">
              <div id="modal__popup" class="login-popup">
                <div class="close__popup-btn">✖</div>

                <div class="user-form">
                  <h2 v-if="!isLoggedIn" id="sign-in" class="user-sign-in">
                    sign in to proceed...
                  </h2>
                  <h2 v-else id="signEd-in" class="user-sign-in">
                    hello there!
                  </h2>

                  <div id="form__sign-in" class="form-element" @click="remove">
                    <nuxt-link id="btnId" to="/profile">
                      <button
                        v-if="isLoggedIn"
                        id="btn__sign-inId"
                        class="btn__sign-in"
                      >
                        profile
                      </button>
                    </nuxt-link>
                  </div>

                  <div id="form__sign-in" class="form-element" @click="remove">
                    <nuxt-link id="btnId" to="/settings">
                      <button
                        v-if="isLoggedIn"
                        id="btn__sign-inId"
                        class="btn__sign-in"
                      >
                        settings
                      </button>
                    </nuxt-link>
                  </div>

                  <div id="form__sign-in" class="form-element">
                    <button
                      v-if="!isLoggedIn"
                      id="btn__sign-inId"
                      class="btn__sign-in"
                      @click="login()"
                    >
                      sign in
                    </button>
                    <button
                      v-else
                      id="btn__sign-out"
                      class="btn__sign-in"
                      @click="logout()"
                    >
                      » sign out «
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="uso__navburger">
        <div class="uso__navline1"></div>
        <div class="uso__navline2"></div>
        <div class="uso__navline3"></div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: this.$auth.loggedIn,
    };
  },

  mounted() {
    document
      .querySelector('#show-login')
      .addEventListener('click', function () {
        document.querySelector('.login-popup').classList.add('active');
      });

    document
      .querySelector('.login-popup .close__popup-btn')
      .addEventListener('click', function () {
        document.querySelector('.login-popup').classList.remove('active');
      });

    const modal = document.getElementById('modal__popup');

    window.onclick = (event) => {
      if (event.target === modal) {
        document.querySelector('.login-popup').classList.remove('active');
      }
    };

    const animateNav = () => {
      const navBurger = document.querySelector('.uso__navburger');
      const navLinks = document.querySelector('.uso__navbar--links');
      const navbarLinks = document.querySelectorAll('.uso__navbar--links li');

      navBurger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');

        navbarLinks.forEach((link, index) => {
          if (link.style.animation) {
            link.style.animation = '';
          } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${
              index / 7 + 1.5
            }s`;
          }
        });

        navBurger.classList.toggle('toggle');
      });
    };

    animateNav();
  },

  methods: {
    async login() {
      await this.$auth.loginWith('auth0');
    },

    async logout() {
      await this.$auth.logout();
    },

    async fetchNewUser() {
      const getUserId = this.$auth.user.sub.replace('auth0|', '');
      // http://localhost:8000/6289babceda0db001153a8d8
      // `http://localhost:8000/${getUserId}`
      const token = await this.$auth.strategy.token.get();
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
      this.$store.commit('gameData', userDataFetched);

      this.$store.commit('setSettings', userDataFetched.volSettings.master);
      this.$store.commit('setSettings2', userDataFetched.volSettings.music);
      this.$store.commit('setSettings3', userDataFetched.volSettings.hitSound);
      this.$store.commit(
        'setSettings4',
        userDataFetched.gameSettings.scrollSpeed
      );
    },

    remove() {
      document.querySelector('.login-popup').classList.remove('active');
    },

    close() {
      document
        .querySelector('.uso__navbar--links')
        .classList.remove('nav-active');

      const navBurger = document.querySelector('.uso__navburger');
      navBurger.classList.remove('toggle');
    },
  },
};
</script>

<style scoped>
/* Keyframes */

@keyframes pulse {
  to {
    transform: scale(1.2);
  }
}

/* Body */

.uso__navbar--body {
  position: fixed;
  width: 100%;
  background-image: linear-gradient(
      rgba(13, 4, 66, 0.7),
      rgba(16, 51, 112, 0.8)
    ),
    url('~/assets/images/navigation/nav-bg.jpg');
  filter: hue-rotate(0deg);
  z-index: 99;

  /* linear-gradient(rgba(13, 4, 66, 0.7), rgba(20, 4, 66, 0.7)) */

  /* filter: hue-rotate(255deg) saturate(.6); */
}

/* Navigation Bar Flex-Setup */

.uso__navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6.25rem;
  padding: 0 22.5%;
}

/* Navigation Leftside [logo, links] */

.btn {
  font-size: 2rem;
}
.uso__logolinks--container {
  display: contents;
}

/* Navigation Leftside */

.uso__logolinks--container {
  display: contents;
}

.uso__navbar {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 9.5rem;
  padding: 0.7rem 25%;
}

.uso__logo {
  cursor: url('~/assets/images/cursor/paimonCursor4.png'), auto;
  width: 7.1rem;
  display: flex;
  align-items: center;
  transform: scaleX(-1);
  border-radius: 50%;
}

.uso__logo--hover {
  transition: all 0.1s ease-in;
  width: 7.1rem;
  border-radius: 50%;
}

.uso__logo--hover:hover {
  background-image: url('~/assets/images/navigation/osu-pink.svg');
  transform: scale(1.07);
  animation: filterChange 4s infinite ease 0s, pulse 0.2s infinite alternate;
}

.uso__navbar--links {
  display: flex;
  justify-content: space-around;
  margin-right: auto;
  padding-top: 0.5rem;
}

.uso__navbar--links li {
  padding: 0 2rem;
  list-style: none;
}

.uso__navbar--links a {
  color: #e6eaec;
  font-size: 28px;
  font-weight: 300;
  text-decoration: none;
  transition: 100ms;
  cursor: url('~/assets/images/cursor/paimonCursor4.png'), auto;
}

.uso__navbar--links a:hover {
  color: #ffffff;
  border-bottom: 0.125rem solid #ffffff;
}

/* Navigation Rightside [circles, login avatar] */

.uso__avatar--container {
  padding-left: 22.5%;
}

.uso__avatar--container {
  padding-left: 9rem;
}

.uso__avatar {
  display: flex;
  flex: none;
}

.uso__circle {
  display: flex;
  align-items: center;
  flex: none;
  margin-top: 0.5rem;
}

.uso__button {
  outline: none;
  border: none;
  padding: 0;
  background: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 3px solid hsla(0, 0%, 100%, 0.25);
  font-size: 16px;
  color: #edf0f1;
  margin: 0 3px;
  transition: all 200ms ease-in-out;
  cursor: url('~/assets/images/cursor/paimonCursor4.png'), auto;
}

.uso__button:hover {
  outline: none;
  border: none;
  padding: 0;
  background: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 3px solid rgba(230, 228, 255, 0.7);
  font-size: 16px;
  color: #edf0f1;
  margin: 0 3px;
}

.uso__avatar--img {
  display: flex;
  align-items: center;
  transition: all 100ms ease-in;
  cursor: url('~/assets/images/cursor/paimonCursor4.png'), auto;
}

.uso__avatar--img:hover {
  transform: scale(1.07);
}

.uso__login {
  border-radius: 50%;
  width: 5.7rem;
  margin: 0 0.5rem;
}

/* Navigation Hamburger Menu */

.uso__navburger {
  display: none;
  cursor: url('~/assets/images/cursor/paimonCursor2.png'), auto;
}

.uso__navburger div {
  width: 22.5px;
  height: 3px;
  margin: 5px;
  background-color: #edf0f1;
  transition: all 0.3s ease-in-out;
}

.toggle .uso__navline1 {
  transform: rotate(-45deg) translate(-5px, 6px);
}

.toggle .uso__navline2 {
  opacity: 0;
}

.toggle .uso__navline3 {
  transform: rotate(45deg) translate(-5px, -6px);
}

#resizedBtn2 {
  margin-left: 0.4rem;
  height: 77.5%;
  width: 77.5%;
}

.nav-shop-btns {
  height: 100%;
  width: 100%;
  opacity: 0.8;
}

.nav-shop-btns:hover {
  opacity: 1;
}

/* LOGIN */

.avatar--nav {
  width: 62px;
  height: 62px;
  box-shadow: none;
  border-radius: 50%;
  overflow: hidden;
  transition: width 0.3s, height 0.3s;
  position: relative;
}

.avatar--guest {
  background-image: url(~/assets/images/navigation/nav-avatar.png);
}

.avatar {
  outline: none;
  border: none;
  padding: 0;
  margin: 0;
  /* background: none; */
  -webkit-appearance: none;
  -moz-appearance: none;
  box-shadow: 0 1px 3px rgb(0 0 0 / 25%);
  border-radius: 40px;
  width: 60px;
  height: 60px;
  flex: none;
  background-color: #333;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50%;
  margin-left: 0.6rem;
  display: block;
  cursor: pointer;
  transition: all 100ms ease-in;
  cursor: url('~/assets/images/cursor/paimonCursor4.png'), auto;
}

.avatar:hover {
  transform: scale(1.07);
}

/* LOGIN FORM, REGISTER FORM, MODAL/POPUP */

.login-popup {
  position: absolute;
  top: -150%;
  left: 73.15%;
  opacity: 0;
  transform: translate(-50%, -50%) scale(1);
  width: 330px;
  padding: 8px 20px;
  background: #333;
  color: black;
  font-size: 10px;
  box-shadow: 2px 2px 5px 5px rgba(0, 0, 0, 0.15);
  border-radius: 7px;
  transition: top 0ms ease-in-out 200ms, opacity 200ms ease-in-out 0ms,
    transform 20ms ease-in-out 0ms;
}

.login-popup.active {
  top: 205.5%;
  left: 73.15%;
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
  transition: top 0ms ease-in-out 0ms, opacity 200ms ease-in-out 0ms,
    transform 20ms ease-in-out 0ms;
}

.login-popup .close__popup-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 20px;
  height: 20px;
  background: #888;
  color: #eee;
  text-align: center;
  line-height: 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 12px;
  padding: 0.5% 0 0 0.25%;
  font-weight: bold;
  cursor: url('~/assets/images/cursor/paimonCursor4.png'), auto;
  z-index: 420;
}

.login-popup .close__popup-btn:hover {
  background: #fff;
  color: #888;
}

.login-popup .close__popup-btn:active {
  transform: scale(0.8);
}

.login-popup .user-sign-in {
  color: #f5f5f5;
  margin: 13px 0px 18px 0px;
  font-size: 30px;
  font-weight: 500;
}

.login-popup .user-form .form-element .btn__sign-in {
  width: 100%;
  height: 35px;
  border: none;
  outline: none;
  font-size: 21px;
  background-color: rgb(80, 58, 179);
  color: #f5f5f5;
  border-radius: 7px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
  font-size: 2.45rem;
  cursor: url('~/assets/images/cursor/paimonCursor4.png'), auto;
}

.login-popup .user-form .form-element .btn__sign-in:hover {
  background-color: rgb(107, 82, 218);
}

#btn__sign-inId {
  background-color: rgb(81, 92, 245);
}

#btn__sign-inId:hover {
  background-color: rgb(136, 144, 250);
}

#form__sign-in {
  margin-bottom: 10px;
  display: flex;
  /* justify-content: left; */
}

#btnId {
  width: 100%;
}

#signEd-in {
  font-size: 3.5rem;
}

#sign-in {
  font-size: 3.5rem;
  display: flex;
  align-items: center;
  text-align: center;
  height: 12rem;
  margin: 13px 0px 0px 0px;
  border-radius: 10px;
  background-image: linear-gradient(
      rgba(45, 42, 54, 0.75),
      rgba(51, 48, 65, 0.75)
    ),
    url('~/assets/images/navigation/ayaka.jpg');
  background-size: cover;
  padding: 8.25rem 4.3rem 0rem 4.3rem;
  font-style: italic;
}

#btn__sign-out {
  margin-top: 1.5rem;
}

#btn__sign-out:hover {
  transform: translate(0, -7.5%);
}

/* Mobile Responsive */

@media screen and (max-width: 900px) {

  .avatar--nav {
    width: 35px;
    height: 35px;
    margin-right: 3rem;
  }
  .uso__navbar {
    background-color: rgb(75, 55, 225);
    background-image: none;
    height: 4.5rem;
    padding: 0 2.5rem;
  }

  .uso__logo {
    width: 3.8rem;
    margin-right: auto;
    z-index: 6900;
  }

  .uso__logo--hover {
    width: 3.8rem;
    display: flex;
    align-items: center;
  }

  .uso__navbar--links {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    padding: 2.5rem 0;
    height: 35rem;
    top: 8rem;
    background-color: rgb(100, 80, 240);
    width: 100%;
    transform: translateY(-130%);
    z-index: -1;
    transition: 250ms ease-in-out;
  }

  .uso__circle {
    display: none;
  }

  .uso__button {
    width: 35px;
    height: 35px;
    border: 2px solid #edf0f1;
  }

  .uso__avatar--img {
    display: flex;
    align-items: center;
    padding-right: 35px;
  }

  .uso__login {
    width: 3.25rem;
    margin-left: 0;
    z-index: 6900;
  }

  .nav-active {
    transform: translateY(-11%);
  }

  .uso__navburger {
    display: block;
    z-index: 6900;
  }

  .uso__navbar--links a {
    font-size: 30px;
  }

  .uso__navbar--links {
    padding-left: 0;
  }

  .under-nav {
    height: 0;
  }
}

@media screen and (max-width: 600px) {
  .uso__navbar {
    display: none;
  }

  .uso__navbar--links {
    display: none;
  }
}
</style>
