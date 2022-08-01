<template>
  <div id="parse-container">
    <h1>Check Vue-Dev Tools</h1>

    <input
      id="file-upload"
      ref="fileInput"
      type="file"
      accept=".osu"
      hidden
      multiple
      @change="(e) => (fileList = e.target.files)"
    />

    <div
      class="drop-area"
      :class="{ hovered: isHovered }"
      v-on="dropboxEventHandlers"
    >
      <img src="/img/upload-icon.png" alt="Upload Icon" />
      <p><b>Drop</b> your .osu files here!</p>
      <p>Or <b>click</b> to browse through files to upload</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropboxEventHandlers: {
        dragover: this.dropboxEvents,
        dragleave: this.dropboxEvents,
        drop: this.dropboxEvents,

        mouseover: this.dropboxEvents,
        mouseleave: this.dropboxEvents,

        click: this.dropboxEvents,
      },
      isHovered: false,

      fileList: [],
    };
  },

  watch: {
    fileList(fileList) {
      const bmIDs = [];

      for (let i = 0; i < fileList.length; i++) {
        const reader = new FileReader();

        reader.onload = () => {
          const bmData = this.getBmData(reader.result);

          bmIDs.push(bmData.metadata.BeatmapID);

          this.downloadJSON(bmData);
        };

        reader.readAsText(fileList[i]);
      }

      setTimeout(function () {
        console.log('Length: ', bmIDs.length);
        console.log(bmIDs.join(','));
      }, 1000);
    },
  },

  methods: {
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

          this.fileList = event.dataTransfer.files;
          break;

        case 'click':
          this.$refs.fileInput.click();
          break;

        default:
          alert(`Dropbox event listener does not exist: ${event.type}`);
          break;
      }
    },
    getBmData(beatmapData) {
      const beatmap = {
        general: {},
        metadata: {},
        difficulty: {},
        events: [],
        timingPoints: [],
        hitObjects: [],
        columns: null,
      };
      // Split the data by line breaks into an array
      const lines = beatmapData.replaceAll('\r', '').split('\n');

      // If it is NOT an osu file
      if (!lines[0].includes('osu file format')) {
        console.log('Not an osu file!');
      } else {
        // If it is an osu file but not the latest version
        if (lines[0] !== 'osu file format v14') {
          console.log(
            `Careful: The osu file version is ${lines[0].match('1[0-3]|[1-9]')}`
          );
        }

        let section;
        const xValues = [];

        for (let i = 0; i < lines.length; i++) {
          // removes whitespace at beginning/end of line
          const line = lines[i].trim();

          // "continue" terminates current iteration of for loop and starts new iteration
          if (line === '') continue;
          if (line.indexOf('//') === 0) continue;
          if (line.indexOf('[') === 0) {
            section = line;
            continue;
          }

          let key, value, array, parts, t, hit, hitSample;

          switch (section) {
            case '[General]':
              key = line.slice(0, line.indexOf(':'));
              value = line.slice(line.indexOf(':') + 1).trim();

              if (key === 'Mode' && value !== '3') {
                console.log('Not an osu!mania song');
                return;
              }
              //  the +_ operator converts "value" to a number
              beatmap.general[key] = isNaN(value) ? value : +value;
              break;
            case '[Metadata]':
              key = line.slice(0, line.indexOf(':'));
              value = line.slice(line.indexOf(':') + 1).trim();
              beatmap.metadata[key] = value;
              break;
            case '[Events]':
              array = line
                .replaceAll('"', '')
                .split(',')
                .map((e) => {
                  return isNaN(e) ? e : +e;
                });
              beatmap.events.push(array);
              break;
            case '[Difficulty]':
              key = line.slice(0, line.indexOf(':'));
              if (key === 'HPDrainRate' || key === 'OverallDifficulty') {
                value = line.slice(line.indexOf(':') + 1).trim();
                beatmap.difficulty[key] = +value;
              } else continue;
              break;
            case '[TimingPoints]':
              parts = line.split(',');
              t = {
                time: +parts[0],
                millisecondsPerBeat: +parts[1],
                beatsPerMeasure: +parts[2],
                sampleSet: +parts[3],
                sampleIndex: +parts[4],
                volume: +parts[5],
                uninherited: +parts[6],
                kiaiMode: +parts[7],
              };
              if (t.millisecondsPerBeat < 0) {
                t.uninherited = 0;
              }
              beatmap.timingPoints.push(t);
              break;
            case '[HitObjects]':
              parts = line.split(',');

              // Columns are indexed 0.

              hit = {
                x: +parts[0],
                time: +parts[2],
                type: +parts[3],
                hitSound: +parts[4],
              };

              // Stores all possible x-values in order to calculate numColumns with array.length
              if (!xValues.includes(hit.x)) {
                xValues.push(hit.x);
              }

              // Decode specific hit object type
              switch (hit.type) {
                case 1:
                case 5:
                  hit.type = 'note';

                  hitSample = parts[5].split(':');

                  hit.hitSample = {
                    normalSet: +hitSample[0],
                    additionSet: +hitSample[1],
                    index: +hitSample[2],
                    volume: +hitSample[3],
                    filename: hitSample[4],
                  };

                  break;
                case 128: // hold
                  hit.type = 'hold';

                  hitSample = parts[5].split(':');

                  hit.endTime = +hitSample[0];
                  hit.hitSample = {
                    normalSet: +hitSample[1],
                    additionSet: +hitSample[2],
                    index: +hitSample[3],
                    volume: +hitSample[4],
                    filename: hitSample[5],
                  };

                  break;
                default:
                  // Unknown hit type
                  console.log(
                    `Attempted to decode unknown hit object type ${hit.type}: ${line}`
                  );
                  break;
              }

              beatmap.hitObjects.push(hit);
              break;
          }
        }

        // Calculates the number of columns in beatmap with the number of distinct x-values.
        beatmap.columns = xValues.length;

        // Calculates the column for each hit object
        beatmap.hitObjects.forEach((hit) => {
          hit.columnIndex = Math.floor((hit.x * beatmap.columns) / 512);
        });
      }

      return beatmap;
    },
    downloadJSON(jsObject) {
      const a = document.createElement('a');
      const file = new Blob([JSON.stringify(jsObject)], {
        type: 'application/json',
      });
      a.href = URL.createObjectURL(file);
      a.download = jsObject.metadata.BeatmapID;
      a.click();
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
