<template>
  <div id="parse-container">
    <h1>Check Vue-Dev Tools</h1>

    <input
      id="file-upload"
      ref="fileInput"
      type="file"
      accept=".osz"
      hidden
      @change="selectFile"
    />

    <div
      class="drop-area"
      :class="{ hovered: isHovered }"
      v-on="dropboxEventHandlers"
    >
      <img src="/img/upload-icon.png" alt="Upload Icon" />
      <p><b>Drop</b> your .osz file here!</p>
      <p>Or <b>click</b> to browse through files to upload</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loaded: {
        zip: false,
        localforage: false,
      },
      areAllLoaded: false,

      dropboxEventHandlers: {
        dragover: this.dropboxEvents,
        dragleave: this.dropboxEvents,
        drop: this.dropboxEvents,

        mouseover: this.dropboxEvents,
        mouseleave: this.dropboxEvents,

        click: this.dropboxEvents,
      },
      isHovered: false,
      rawFile: null,
      entries: null,
      readEntries: [],
    };
  },

  head() {
    return {
      script: [
        {
          src: '/lib/zip.min.js',
          callback: () => {
            this.loaded.zip = true;
          },
        },
        {
          src: '/lib/localforage.min.js',
          callback: () => {
            this.loaded.localforage = true;
          },
        },
      ],
    };
  },

  watch: {
    loaded: {
      handler(newValue, oldValue) {
        this.areAllLoaded = !Object.values(this.loaded).some((bool) => !bool);
      },
      deep: true,
    },
  },

  created() {},

  methods: {
    selectFile(event) {
      this.rawFile = event.target.files[0];
      this.readFile(this.rawFile);
    },
    async readFile(rawfile) {
      // If the current file is a .osz file
      if (rawfile.name.slice(-4) === '.osz') {
        localforage.setItem(rawfile.name, rawfile, function (err, val) {
          if (err) {
            console.error(`Error while saving beatmap: ${rawfile.name}`);
          }
        });

        this.entries = await new zip.ZipReader(
          new zip.BlobReader(this.rawFile)
        ).getEntries();
      } else {
        alert(`${this.rawFile.name} is not a valid .osz file!`);
      }
    },
    dropboxEvents(event) {
      event.preventDefault();
      switch (event.type) {
        case 'dragover':
        case 'mouseover':
          this.isHovered = true;
          break;

        case 'dragleave':
        case 'mouseleave':
          this.isHovered = false;
          break;

        case 'drop':
          this.isHovered = false;

          this.rawFile = event.dataTransfer.files[0];
          // If the file exists, then read it.
          if (this.rawFile) {
            this.readFile(this.rawFile);
          } else {
            alert(`An unrecognized file was dropped!`);
          }
          break;

        case 'click':
          this.$refs.fileInput.click();
          break;

        default:
          alert(`Dropbox event listener does not exist: ${event.type}`);
          break;
      }
    },
  },
};
</script>

<style scoped>
#parse-container {
  display: flex;
  justify-content: center;
  flex-direction: column;

  text-align: center;
}

h1 {
  font-size: 4rem;
  margin: 3.2rem 0rem;
}

.drop-area {
  margin: 1.6rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 64rem;
  height: 25.6rem;
  border: 0.8rem dashed grey;
  border-radius: 2.4rem;
}

.drop-area img {
  width: 8rem;
}

.drop-area p {
  font-size: 3.2rem;
  margin: 1.6rem;
}

.drop-area p > * {
  font-size: 3.2rem;
}

.hovered {
  border-color: green;
  cursor: pointer;
}
</style>
