<template>
  <div class="help-page">
    <div class="help-page-container">
      <section id="paimon" class="paimonInfo">
        <div class="section-header">
          <h1 class="section-heading">welcome to !uso</h1>
          <div class="underline"></div>
        </div>
        <div class="paimonStuffs">
          <div class="paimonStuff">
            <div class="paimonStuff-header">
              <h3>introduction</h3>
            </div>
            <p class="paimonStuff-text">
              do you like watching anime? do you enjoy rhythm games? do you
              enjoy games like guitar hero or piano tiles? then yo, this is the
              game for you! welcome to our take on osu! Mania~ we hope you
              enjoy!
            </p>
          </div>

          <div class="paimonStuff">
            <div class="paimonStuff-header">
              <h3>navigating !uso</h3>
            </div>
            <p class="paimonStuff-text">
              before you even start playing, explore our site! there is so much
              fun to be offered here~ once you are finished, go visit our
              beatmaps page, there you will find a wide array of songs to play!
            </p>
          </div>

          <div class="paimonStuff">
            <div class="paimonStuff-header">
              <h3>logging in...</h3>
            </div>
            <p class="paimonStuff-text">
              to register an account, please look to the top right and click the
              avatar icon. once you have made your account, go enjoy all the
              songs to your heart's content! in order to login, simply press the
              avatar icon~
            </p>
          </div>

          <div class="paimonStuff">
            <div class="paimonStuff-header">
              <h3>how to play</h3>
            </div>
            <p class="paimonStuff-text">
              for the majority of songs, the keyboard keys [D][F][H][J] will be
              the primary ones to use and play with! however, for those who are
              more advanced, some songs may utilize up to seven keys! play at
              your own pace~
            </p>
          </div>

          <div class="paimonStuff">
            <div class="paimonStuff-header">
              <h3>how to play (cont.)</h3>
            </div>
            <p class="paimonStuff-text">
              for standard notes, just hit them as closely on time as you
              possibly can! if you miss, that's okay, keep moving forward! for
              longer notes, hold on to your key and release it when the
              respective note ends!
            </p>
          </div>

          <div class="paimonStuff">
            <div class="paimonStuff-header">
              <h3>shop</h3>
            </div>
            <p class="paimonStuff-text">
              our site implements a shop, gacha system, where the score you get
              will determine how much primogems you get! with primogems, you can
              roll for custom anime profile pictures~ *there is a secret special
              1% pic...
            </p>
          </div>

          <div class="paimonInfo-img-wrapper">
            <img src="../assets/images/help/paimon-help.png" class="ehe" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  components: {},
};
</script>

<style scoped>
* {
  font-family: 'Dongle', sans-serif;
}

@keyframes pulse {
  to {
    transform: scale(1.1);
  }
}

@keyframes filterChange {
  0% {
    filter: hue-rotate(0deg);
  }
  20% {
    filter: hue-rotate(45deg);
  }
  40% {
    filter: hue-rotate(115deg);
  }
  60% {
    filter: hue-rotate(200deg);
  }
  80% {
    filter: hue-rotate(333deg);
  }
  100% {
    filter: hue-rotate(0deg);
  }
}
@-o-keyframes filterChange {
  0% {
    filter: hue-rotate(0deg);
  }
  20% {
    filter: hue-rotate(45deg);
  }
  40% {
    filter: hue-rotate(115deg);
  }
  60% {
    filter: hue-rotate(200deg);
  }
  80% {
    filter: hue-rotate(333deg);
  }
  100% {
    filter: hue-rotate(0deg);
  }
}
@-moz-keyframes filterChange {
  0% {
    filter: hue-rotate(0deg);
  }
  20% {
    filter: hue-rotate(45deg);
  }
  40% {
    filter: hue-rotate(115deg);
  }
  60% {
    filter: hue-rotate(200deg);
  }
  80% {
    filter: hue-rotate(333deg);
  }
  100% {
    filter: hue-rotate(0deg);
  }
}
@-webkit-keyframes filterChange {
  0% {
    filter: hue-rotate(0deg);
  }
  20% {
    filter: hue-rotate(45deg);
  }
  40% {
    filter: hue-rotate(115deg);
  }
  60% {
    filter: hue-rotate(200deg);
  }
  80% {
    filter: hue-rotate(333deg);
  }
  100% {
    filter: hue-rotate(0deg);
  }
}

/* */

.help-page {
  min-height: 100vh;
  height: 100%;
  background-image: linear-gradient(rgba(4, 22, 54, 0.7), rgba(11, 4, 48, 0.7)),
    /* url('~/assets/images/backgrounds/fleeting-colors.jpg'); */
      url('~/assets/images/backgrounds/help-bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

.help-page-container {
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.paimonInfo {
  width: 100%;
  /* background-color: #f2ffff; */
  /* background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url("../images/amberklee.jpg") no-repeat center; */
  background-size: cover;
}

.section-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem 0 5rem 0;
}

.section-heading {
  font-size: 9rem;
  font-weight: 500;
  animation: filterChange 4s infinite ease 0s, pulse 250ms infinite alternate;
  color: #9cf5b9;
}

.underline {
  width: 20rem;
  height: 0.3rem;
  background-color: #a8c6ff;
}

.paimonStuffs {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  grid-template-rows: repeat(6, 6rem);
  grid-row-gap: 6rem;
  margin-bottom: 6rem;
}

.paimonStuff {
  width: 100%;
  margin-bottom: 2rem;
}

.paimonStuff:nth-child(1) {
  grid-column: 4 / 7;
  grid-row: 1 / 3;
}

.paimonStuff:nth-child(2) {
  grid-column: 3 / 6;
  grid-row: 3 / 5;
}

.paimonStuff:nth-child(3) {
  grid-column: 4 / 7;
  grid-row: 5 / -1;
}

.paimonStuff:nth-child(4) {
  grid-column: 11 / 14;
  grid-row: 1 / 3;
}

.paimonStuff:nth-child(5) {
  grid-column: 12 / 15;
  grid-row: 3 / 5;
}

.paimonStuff:nth-child(6) {
  grid-column: 11 / 14;
  grid-row: 5 / -1;
}

.paimonStuff-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.paimonStuff-header i {
  font-size: 8rem;
  color: #4b4b4b;
  margin-right: 2rem;
}

.paimonStuff-header h3 {
  font-size: 6rem;
  line-height: 30px;
  font-weight: 400;
  margin-bottom: 0.5rem;
}

.paimonStuff-text {
  line-height: 20px;
  font-size: 2.7rem;
}

.paimonInfo-img-wrapper {
  grid-column: 7 / 11;
  grid-row: 2 / 6;
  width: 100%;
}

.paimonInfo-img-wrapper img {
  width: 90%;
  height: auto;
  object-fit: cover;
  opacity: 1;
  margin-top: -10rem;
}

.ehe {
  transition: all 0.5s ease-in-out;
}

.ehe:hover {
  transform: scale(1.1);
}

.ehe[disabled]:hover {
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

@media (max-width: 1500px) {
  .paimonInfo-img-wrapper {
    grid-row: 3 / -1;
  }
}

@media (max-width: 1400px) {
  .paimonStuff:nth-child(1) {
    grid-column: 3 / 7;
  }

  .paimonStuff:nth-child(2) {
    grid-column: 2 / 6;
  }

  .paimonStuff:nth-child(3) {
    grid-column: 3 / 7;
  }

  .paimonStuff:nth-child(4) {
    grid-column: 11 / 15;
  }

  .paimonStuff:nth-child(5) {
    grid-column: 12 / 16;
  }

  .paimonStuff:nth-child(6) {
    grid-column: 11 / 15;
  }
}

@media (max-width: 1000px) {
  .paimonStuffs {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .paimonStuff {
    width: 40rem;
    margin-bottom: 6rem;
  }

  .paimonInfo-img-wrapper {
    width: 40rem;
  }

  .paimonInfo-img-wrapper img {
    width: 100%;
  }
}

@media screen and (max-width: 900px) {
  .under-nav {
    height: 4.25rem;
  }
}

@media (max-width: 500px) {
  html {
    font-size: 45%;
  }

  .paimonStuff {
    width: 30rem;
  }
}
</style>
