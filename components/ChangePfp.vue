<template>
  <div v-if="showModalTwo" class="change-pfp-modal">
    <div class="under-nav"></div>
    <div class="close-pfp-modal" @click="showModalTwo = false">Close [X]</div>

    <div class="change-pfp-modal-content">
      <owned-character :all-owned="allOwned" class="modal-owned-character" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    allOwned: {
      type: Array,
      default() {
        return [];
      },
    },
    showModal: {
      type: Boolean,
    },
  },
  data() {
    return {
      showModalTwo: this.showModal,
    };
  },
  watch: {
    showModal(value) {
      this.showModalTwo = !this.showModalTwo;
      /* console.log('changed'); */
    },
  },
  methods: {},
};
</script>

<style lang="css" scoped>
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

.close-pfp-modal {
  font-size: 5rem;
  position: absolute;
  right: 2rem;
  cursor: url('~/assets/images/cursor/paimonCursor4.png'), auto;
  color: #9cf5b9;
  animation: filterChange 5s infinite ease 0s;
  transition: all 200ms ease-in-out;
}

.close-pfp-modal:hover {
  transform: scale(1.05);
}

.change-pfp-modal {
  /* display: none; */
  position: fixed;
  z-index: 8;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow: auto;
  /* background-color: rgb(0, 0, 0); Fallback color */
  background-color: rgba(0, 0, 0, 0.8); /* Black w/ opacity */
  /*  height: 50vh;
  width: 60vw;
  margin: auto; */
}

.change-pfp-modal-content {
  margin: auto;
  --modal-container-width: 55vw;
  width: var(--modal-container-width);
}

.modal-owned-character {
  background-image: linear-gradient(
      rgba(5, 2, 19, 0.958),
      rgba(14, 14, 15, 0.938)
    ),
    url('~/assets/images/navigation/ayaka.jpg');
  height: 100%;
  /* background: linear-gradient(rgba(13, 4, 66, 0.958), rgba(13, 4, 66, 0.938)); */
}

.modal-owned-character > div {
  width: calc(var(--modal-container-width) / 6);
}
</style>
