<template>
  <div class="shop-page">
    <div class="under-nav"></div>
    <div class="wish__container">
      <div class="wishCards">
        <section class="data-bar">
          <h1 class="shop-heading">
            get your favorite anime characters today!
          </h1>
        </section>
        <section class="night-market">
          <div class="night-market-card-container">
            <night-market-card
              :load-roll="loadRoll"
              @rolled-card="logRolledCard"
            />
            <night-market-card
              :load-roll="loadRoll"
              @rolled-card="logRolledCard"
            />
            <night-market-card
              :load-roll="loadRoll"
              @rolled-card="logRolledCard"
            />
            <night-market-card
              :load-roll="loadRoll"
              @rolled-card="logRolledCard"
            />
            <night-market-card
              :load-roll="loadRoll"
              @rolled-card="logRolledCard"
            />
          </div>
          <button class="roll-button" @click="pressRoll()">wish!</button>
          <div class="currency__container">
            <div class="currency__counter">infinite...</div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import NightMarketCard from '../components/NightMarketCard.vue';
export default {
  components: { NightMarketCard },
  data() {
    return {
      loadRoll: false,
      rolledCharas: [],
    };
  },
  methods: {
    pressRoll() {
      this.loadRoll = !this.loadRoll;
    },
    logRolledCard(value) {
      this.rolledCharas.push(value);
    },
  },
};
</script>

<style scoped>
#wish-background {
  height: calc(100vh - 9.5rem);
  z-index: -2;
  position: absolute;
  bottom: 0;
}

.shop-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.wish__container {
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: calc(100vh - 9.5rem);
  background-image: linear-gradient(
      rgba(20, 14, 54, 0.7),
      rgba(20, 14, 54, 0.7)
    ),
    url('~/assets/images/backgrounds/wishBg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

.wishCards {
  padding: 0 0 8.5rem 0;
}

.data-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: center;
}

.data-bar > p {
  font-size: 4rem;
}

.shop-heading {
  align-self: center;
  margin: 3rem auto 0 auto;
  font-weight: 400;
  font-size: 6.5rem;
}

.primogem-balance {
  position: absolute;
  right: 16%;
}

.night-market {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.night-market-card-container {
  margin: 3rem auto;
  width: 85vw;
  padding: 0 10rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.roll-button {
  font-size: 4rem;
  width: 15rem;
  height: 6rem;
  line-height: 28px;
  background: rgb(23, 23, 107);
  padding: 1rem 2rem 0.5rem 2rem;
  border-radius: 1rem;
  margin: 2rem;
  transition: all 200ms ease-in-out;
  cursor: url('~/assets/images/cursor/paimonCursor4.png'), auto;
}

.roll-button:hover {
  background: rgb(101, 101, 236);
  transform: scale(1.05);
}

.roll-button:active {
  background: rgb(177, 236, 238);
  color: rgb(23, 23, 107);
  transform: scale(0.85);
}

.currency__container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 15rem;
  height: 6rem;
  top: 12.5rem;
  right: 3rem;
  border-radius: 1rem;
  background: rgb(177, 236, 238);
}

.currency__counter {
  text-align: center;
  color: rgb(23, 23, 107);
  font-size: 4rem;
  margin-top: 0.75rem;
}

@media screen and (max-width: 1700px) {
  .night-market-card-container {
    width: 100%;
  }

  .night-market-card {
    height: 35.8rem;
    width: 23.3rem;
  }
}

@media screen and (max-width: 1600px) {
  .night-market-card-container {
    width: 100%;
  }
}

@media screen and (max-width: 1500px) {
  .night-market-card-container {
    width: 100%;
  }

  .night-market-card {
    height: 33.3rem;
    width: 21.8rem;
  }

  .shop-heading {
    font-size: 5.5rem;
  }
}

@media screen and (max-width: 1300px) {
  .night-market-card-container {
    width: 100%;
  }

  .night-market-card {
    height: 30.8rem;
    width: 19.3rem;
  }

  .shop-heading {
    font-size: 4.5rem;
  }
}
</style>
