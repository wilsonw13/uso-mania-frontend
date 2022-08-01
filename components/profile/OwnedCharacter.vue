<template>
  <div class="owned-card-wrap">
    <div
      v-for="card in displayedCards"
      :id="card.rank"
      :key="card.rank"
      class="owned-card"
      @click="getID()"
    >
      <div class="card-gradient"></div>
      <p class="chara-name">{{ card.title }}</p>

      <img :src="card.image_url" alt="" class="chara-img" />
    </div>
  </div>
</template>

<script>
import characters from '~/static/characters.json';

export default {
  props: {
    allOwned: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      ownedCards: [this.allOwned],
      displayedCards: [],
      characters,
      clickedID: null,
    };
  },
  created() {
    this.sortAllOwned();
    this.cropCharacters();
    this.removeConsecutiveDuplicates();
    this.getCharaName();
  },

  methods: {
    sortAllOwned() {
      const beforeSort = this.ownedCards[0];
      const afterSort = beforeSort.sort((a, b) => {
        if (a > b) return 1;
        if (a < b) return -1;
        else return 0;
      });
      this.ownedCards = afterSort;
    },
    cropCharacters() {
      const owned = this.ownedCards;
      const croppedCharacters = [];
      owned.forEach((element) => {
        croppedCharacters.push(this.characters[element]);
      });
      this.displayedCards = croppedCharacters;
    },
    getCharaName() {
      this.displayedCards.forEach((element) => {
        if (element.title.includes(',')) {
          let charaName = element.title.split(', ');
          charaName = charaName[1] + ' ' + charaName[0];
          element.title = charaName;
        }
      });
    },
    removeConsecutiveDuplicates() {
      const toRemove = this.displayedCards;

      const removedDuplicates = toRemove.filter(function (item, pos, arr) {
        return pos === 0 || item !== arr[pos - 1];
      });
      this.displayedCards = removedDuplicates;
    },
    getID() {
      const targetID = event.currentTarget.id;
      console.log(targetID);
      this.clickedID = targetID;
    },
  },
};
</script>

<style scoped>
button {
  height: 2.8rem;
  font-size: 2.8rem;
}

.bad {
  background-image: url('./assets/images/night-market-bad.png');
}
.ok {
  background-image: url('./assets/images/night-market-ok.png');
}
.good {
  background-image: url('./assets/images/night-market-good.png');
}
.great {
  background-image: url('./assets/images/night-market-great.png');
}

.owned-card-wrap {
  width: var(--container-width);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  cursor: url('~/assets/images/cursor/paimonCursor4.png'), auto;
}
.owned-card {
  /* height: auto; */
  /* width: calc(var(--container-width) / 6); */
  width: 16.666666666666666666667%;
  position: relative;

  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;

  display: inline-block;
  padding: 0.3rem;
}

.card-front,
.val-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}
.val-bg {
  background-size: 99.4% 99.8%;
  box-shadow: 0 0.7rem 0.7rem rgba(0, 0, 0, 0.5);
}
.val-bg:hover {
  opacity: 0.97;
}

.card-front {
  transform: rotateY(180deg);
  background-color: #171717;
}
.card-gradient {
  position: absolute;
  height: calc(100% - 0.6rem);
  width: calc(100% - 0.6rem);
  background: linear-gradient(
    360deg,
    #000000 0%,
    rgba(0, 0, 0, 0.491594) 24.73%,
    rgba(0, 0, 0, 0) 100%
  );
}
.chara-name {
  position: absolute;
  bottom: 0%;
  font-size: 3.5rem;
  padding: 0.7rem 1.2rem;
}
.chara-img {
  width: 100%;
  height: 100%;
  z-index: -1;
}
.card-rim {
  z-index: 99;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0%;
  left: 0%;
  box-shadow: 0 0.7rem 0.7rem rgba(0, 0, 0, 0.5);

  /*  user-drag: none; */
  pointer-events: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

.flipped {
  transform: rotateY(180deg);
  transition: 0.8s ease-in-out;
}
</style>
