<template>
  <div id="canvas__container" :style="{ width: canvasWidth + 'px' }">
    <canvas id="game__canvas" :style="{ width: canvasWidth + 'px' }">
      Canvas is not supported on your browser.
    </canvas>

    <div id="game__hitCombo__container" :style="{ width: canvasWidth + 'px' }">
      <h1
        id="game__combo"
        :key="hitComboVKey"
        :class="{ game__combo__on: comboOn, game__combo__reset: comboReset }"
      >
        {{ combo ? combo : missedCombo ? missedCombo : null }}
      </h1>
      <h1
        id="game__hitValue"
        :key="hitComboVKey + 1"
        class="game__hitValue__on"
        :style="lastestHitStyle"
      >
        {{ displayedLatestHit }}
      </h1>
    </div>

    <div id="game__hp-bar__container">
      <div id="game__hp-bar" :style="{ height: health + '%' }"></div>
    </div>
  </div>
</template>

<script>
// import NavBar from './NavBar.vue';

/* eslint-disable */

export default {
  props: {
    beatmapData: {
      required: true,
      type: Object,
    },
    paused: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {
      loaded: {
        keydrown: false,
        PIXI: false,
      },
      areAllLoaded: false,
      started: false,

      notes: null,
      beatmapIntro: null,

      score: 0,
      combo: 0,
      index: 0,
      maxCombo: 0,
      dy: 10,
      latestHit: null,
      totalHits: {
        320: 0,
        300: 0,
        200: 0,
        100: 0,
        50: 0,
        0: 0,
      },

      hitBonusValue: null,
      bonus: 100,

      missedCombo: 0,
      comboOn: false,
      comboReset: false,

      hitComboVKey: 0,

      hitJudgement: {
        320: null,
        300: null,
        200: null,
        100: null,
        50: null,
        0: null,
      },

      allKeys: ['A', 'S', 'D', 'F', 'SPACE', 'H', 'J', 'K', 'L'],
      keys: [],
      allColors: ['#E1D5E7', '#DAE8FC', '#F7A5CF', '#FFE6CC', '#F8CECC'],
      colors: [],
      circleTextures: [],
      targetCircleTextures: [],
      /* circleColors: ['#dddcdc', '#F7A5CF', '#F7A5CF', '#dddcdc'], */

      numColumns: null,
      columnWidth: 100, // in px (we change this to rem later)
      canvasWidth: null,

      PIXIapp: null,
      PIXIticker: null,

      stageWidth: null,
      stageColWidth: null,
      stageHeight: null,
      stageFPS: 60,
      // Stands for stageSetup
      ss: {
        setupContainer: null,
        columnContainers: [],
        sliderColumnContainers: [],
        columnBorders: [],
        targetCircles: [],
      },
      notesToFallArray: [],
      readyNotes: [],
      readySliders: [],
      hitPercent: 0.85,
      radius: 40,

      noteHitSound: null,
      music: null,
      songDuration: 0,
      volume: 0.1,
      pbVolProgress: 1,
      scale: 0,
      opacity: 1,
      pbdur: null,
      progressBarVol: null,
      health: 100,
      notesCol: null,
      sliderCol: null,
    };
  },

  head() {
    return {
      script: [
        {
          src: '/lib/keydrown.min.js',
          callback: () => (this.loaded.keydrown = true),
        },
      ],
    };
  },

  mounted() {
    const loadedTimerID = setInterval(() => {
      if (typeof window.PIXI !== 'undefined') {
        this.loaded.PIXI = true;
        clearInterval(loadedTimerID);
      }
    }, 200);
  },

  destroyed() {
    const t = this;

    if (t.music) t.music.stop();
  },

  computed: {
    displayedLatestHit() {
      switch (this.latestHit) {
        case 320:
          return 300;
        case 0:
          return 'MISS';
        default:
          return this.latestHit;
      }
    },
    lastestHitStyle() {
      let color = null;
      switch (this.latestHit) {
        case 320:
          return {
            background:
              'linear-gradient(to top, red 32%, orange, yellow, green, blue, indigo 75%)',
            'background-clip': 'text',
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent',
          };
        case 300:
          color = '#f7d040';
          break;
        case 200:
          color = '#66c010';
          break;
        case 100:
          color = '#1151a7';
          break;
        case 50:
          color = '#6d747e';
          break;
        case 0:
          color = '#bf342f';
          break;
      }

      return { color };
    },
    accuracy() {
      const total = this.totalHits;
      const accuracy =
        (total['0'] * 0 +
          total['50'] * 50 +
          total['100'] * 100 +
          total['200'] * 200 +
          total['300'] * 300 +
          total['320'] * 300) /
        ((total['0'] +
          total['50'] +
          total['100'] +
          total['200'] +
          total['300'] +
          total['320']) *
          300);
      return isNaN(accuracy) ? 1 : accuracy;
    },
  },

  watch: {
    loaded: {
      handler() {
        // If ANY of the boolean values read false, the all scripts are NOT loaded.
        // If NO boolean values read false, then all scripts are loaded.
        if (!Object.values(this.loaded).some((bool) => !bool)) this.onLoad();
      },
      deep: true,
    },
    totalHits: {
      handler() {
        this.$emit('updateStats', this.score, this.accuracy);
      },
      deep: true,
    },
  },

  methods: {
    onLoad() {
      const t = this;

      // console.log(Object.keys(t.beatmapData));

      t.notes = t.beatmapData.hitObjects;
      t.notesCol = t.notes.filter((note) => note.type === 'note');
      t.sliderCol = t.notes.filter((note) => note.type === 'hold');
      t.numColumns = t.beatmapData.columns;

      t.beatmapIntro = t.notes[0].time < 3000 ? 0 : t.notes[0].time - 3000;

      window.addEventListener('wheel', this.onScroll);

      t.keys = [
        ...t.allKeys.slice(-(Math.floor(t.numColumns / 2) + 5), -5),
        ...(t.numColumns % 2 ? [t.allKeys[4]] : []),
        ...t.allKeys.slice(5, Math.floor(t.numColumns / 2) + 5),
      ];

      t.colors = [
        ...t.allColors.slice(-(Math.floor(t.numColumns / 2) + 2), -2),
        ...(t.numColumns % 2 ? [t.allColors[4]] : []),
        ...t.allColors.slice(-(Math.floor(t.numColumns / 2) + 2), -2).reverse(),
      ];

      t.colors.forEach((color) =>
        t.circleTextures.push(
          PIXI.Texture.from(`/textures/${color.slice(1)}_Circle.png`)
        )
      );

      t.targetCircleTextures = [
        PIXI.Texture.from(`/textures/808080_Circle.png`),
        PIXI.Texture.from(`/textures/FFFFFF_Circle.png`),
      ];

      /* ===============
          CANVAS SETUP
          =============== */

      const $canvas = document.querySelector('#game__canvas');

      t.canvasWidth = t.numColumns * t.columnWidth;

      // Sets the canvas width/height pixels = to canvas display size width/height
      t.stageWidth = $canvas.width = t.canvasWidth;
      t.stageHeight = $canvas.getBoundingClientRect().height;
      t.stageColWidth = t.stageWidth / t.numColumns;

      t.PIXIapp = new PIXI.Application({
        width: t.stageWidth,
        height: t.stageHeight,
        antialias: true,
        view: $canvas,
        backgroundColor: 0x181818,
      });

      /* ===============
          TICKER
          =============== */

      t.PIXIticker = PIXI.Ticker.shared;
      t.PIXIticker.speed = t.stageFPS / 60;

      t.PIXIticker.autoStart = false;
      t.PIXIticker.stop();

      /* ===============
          SETUP CONTAINER
          =============== */

      t.ss.setupContainer = new PIXI.Container();
      t.PIXIapp.stage.addChild(t.ss.setupContainer);

      /* ===============x
          STAGE SETUP
          =============== */

      for (let i = 0; i < t.numColumns; i++) {
        // Creates a new column container for each column
        t.ss.columnContainers.push(
          new PIXI.ParticleContainer(100, { tint: true })
        );
        t.ss.sliderColumnContainers.push(new PIXI.Container());

        // Sets the x-offset for each container based off the column index and column width
        t.ss.columnContainers[i].x = i * t.stageColWidth;
        t.ss.sliderColumnContainers[i].x = i * t.stageColWidth;

        // "Mounts" the container to the stage
        t.PIXIapp.stage.addChild(t.ss.columnContainers[i]);
        t.PIXIapp.stage.addChild(t.ss.sliderColumnContainers[i]);

        ////////////////////////////////////////

        const columnBorder = new PIXI.Graphics()
          .lineStyle(1, 0x000000)
          .moveTo(t.stageColWidth * i, 0)
          .lineTo(t.stageColWidth * i, t.stageHeight);

        t.ss.columnBorders.push(columnBorder);
        t.ss.setupContainer.addChild(columnBorder);

        ////////////////////////////////////////

        const targetCircle = new PIXI.Sprite(t.targetCircleTextures[0]);

        targetCircle.anchor.set(0.5);
        targetCircle.setTransform(
          t.stageColWidth * (i + 0.5),
          t.hitPercent * t.stageHeight
        );

        targetCircle.width = targetCircle.height = 2 * t.radius;

        t.ss.targetCircles.push(targetCircle);
        t.ss.setupContainer.addChild(targetCircle);

        ////////////////////////////////////////

        t.readyNotes.push([]);
      }

      t.music = new Howl({
        src: [
          `/beatmaps/${this.beatmapData.metadata.BeatmapSetID}/${this.beatmapData.general.AudioFilename}`,
        ],
        volume: 0.5, // this.$store.state.userSettings.musicVolume,
        preload: 'metadata',
        onload: () => (this.songLoaded = true),
      });

      t.music.seek(t.beatmapIntro / 1000);

      t.areAllLoaded = true;
      // emit this back to play.vue
      // as soon as this is loaded, we want to immediately start the game
    },
    startGame() {
      const t = this;

      /* let testTime = 0;
      setInterval(() => {
        console.log(`${testTime} milliseconds passed`);
        testTime += 300;
      }, 300); */

      t.music.play();
      const durr = Math.round(t.music.duration()) * 1000;
      this.$store.commit('currSongDuration', durr);

      const firstNote = t.notes[0];
      const lastNote = t.notes[t.notes.length - 1];

      setTimeout(() => {
        this.$emit('endGameParent', this.totalHits, this.maxCombo);
      }, (lastNote.endTime ? lastNote.endTime : lastNote.time) - firstNote.time + (1000 * t.stageHeight * t.hitPercent + t.radius) / (t.dy * t.stageFPS) + 3000);

      /* ===============
          HP DRAIN
          =============== */

      const HP = t.beatmapData.difficulty.HPDrainRate;

      function healthbarFinalVal(hitValue) {
        switch (hitValue) {
          case 320:
            t.health += 10;
            break;
          case 300:
            t.health += 10;
            break;
          case 200:
            t.health += 5;
            break;
          case 100:
            t.health += 5;
            break;
          case 50:
            t.health -= 5;
            break;
          case 0:
            t.health -= 10;
            break;
        }

        t.health = t.clamp(t.health, 0, 100);
      }
      /* ===============
          KEY PRESS
          =============== */

      const OD = t.beatmapData.difficulty.OverallDifficulty;

      t.hitJudgement = {
        320: 16.5,
        300: Math.floor(64 - 3 * OD) + 0.5,
        200: Math.floor(97 - 3 * OD) + 0.5,
        100: Math.floor(127 - 3 * OD) + 0.5,
        50: Math.floor(160 - 3 * OD) + 0.5,
        0: Math.floor(170 - 3 * OD) + 0.5,
      };

      document.addEventListener('keydown', function (e) {
        if (e.repeat) return;

        const columnI = t.keys.findIndex(
          (key) => key === (e.key === ' ' ? 'SPACE' : e.key.toUpperCase())
        );

        if (!(columnI === -1)) {
          t.readyNotes[columnI].forEach((thisCircle) => {
            if (thisCircle) thisCircle.hit();
          });

          t.ss.targetCircles[columnI].texture = t.targetCircleTextures[1];
        }
      });

      document.addEventListener('keyup', function (e) {
        if (e.repeat) return;

        const columnI = t.keys.findIndex(
          (key) => key === (e.key === ' ' ? 'SPACE' : e.key.toUpperCase())
        );

        if (!(columnI === -1)) {
          t.ss.targetCircles[columnI].texture = t.targetCircleTextures[0];
        }
      });

      for (let i = 0; i < t.numColumns; i++) {
        kd[t.keys[i]].down(function () {
          if (!t.readySliders[i]) return;

          const slider = t.readySliders[i];

          if (!slider.held) {
            t.PIXIapp.ticker.remove(slider.animateDrop, slider);
            t.PIXIapp.ticker.add(slider.animateShrink, slider);
          }

          slider.held = true;

          if (!slider.initialMs) slider.initialMs = slider.msFrom('bot', true);
        });

        kd[[t.keys[i]]].up(function () {
          if (!t.readySliders[i]) return;

          const slider = t.readySliders[i];

          if (slider.held) {
            t.PIXIapp.ticker.remove(slider.animateShrink, slider);
            t.PIXIapp.ticker.add(slider.animateDrop, slider);
          }

          slider.held = false;

          if (slider.msFrom('top', true) <= t.hitJudgement['50']) slider.hit();
          else {
            if (slider.releasedMs) slider.miss();
            else slider.releasedMs = slider.msFrom('top');
          }
        });

        kd.run(() => kd.tick());
      }

      class Note extends PIXI.Sprite {
        constructor(note) {
          super(t.circleTextures[note.columnIndex]);

          this.i = note.columnIndex;
          this.time = note.time;

          this.remainingTime =
            note.time -
            t.beatmapIntro -
            (1000 * t.stageHeight * t.hitPercent + t.radius) /
              (t.dy * t.stageFPS);

          t.notesToFallArray.push(this);

          this.anchor.set(0.5);
          this.setTransform(t.stageColWidth / 2, -t.radius);

          this.width = this.height = t.radius * 2;

          this.resumeDropTimer();

          this.startTime, this.timerID;
        }

        msFrom(isAbs = false) {
          return isAbs
            ? Math.abs(
                ((this.y - t.stageHeight * t.hitPercent) * 1000) /
                  (t.dy * t.stageFPS)
              )
            : ((this.y - t.stageHeight * t.hitPercent) * 1000) /
                (t.dy * t.stageFPS);
        }

        miss() {
          if (this.missed) return;
          this.missed = true;

          t.latestHit = 0;
          t.totalHits['0']++;
          t.bonus = 0;
          t.missedCombo = t.combo;
          if (t.missedCombo > t.maxCombo) t.maxCombo = t.missedCombo;
          t.combo = 0;
          healthbarFinalVal(t.latestHit);

          t.comboOn = false;
          t.comboReset = true;
          t.hitComboVKey += 2;
        }

        hit() {
          if (this.missed) return;

          let hitBonusValue = 0;

          if (this.msFrom(true) <= t.hitJudgement['320']) {
            t.latestHit = 320;
            t.totalHits['320']++;
            hitBonusValue = 32;
            t.bonus += 2;
          } else if (this.msFrom(true) <= t.hitJudgement['300']) {
            t.latestHit = 300;
            t.totalHits['300']++;
            hitBonusValue = 32;
            t.bonus += 1;
          } else if (this.msFrom(true) <= t.hitJudgement['200']) {
            t.latestHit = 200;
            t.totalHits['200']++;
            hitBonusValue = 16;
            t.bonus -= 8;
          } else if (this.msFrom(true) <= t.hitJudgement['100']) {
            t.latestHit = 100;
            t.totalHits['100']++;
            hitBonusValue = 8;
            t.bonus -= 24;
          } else if (this.msFrom(true) <= t.hitJudgement['50']) {
            t.latestHit = 50;
            t.totalHits['50']++;
            hitBonusValue = 4;
            t.bonus -= 44;
          } else if (this.msFrom(true) <= t.hitJudgement['0']) {
            this.miss();
            return;
          }

          t.bonus = t.clamp(t.bonus, 0, 100);

          const baseScore =
            ((1000000 * 0.5) / t.notes.length) * (t.latestHit / 320);

          const bonusScore =
            ((1000000 * 0.5) / t.notes.length) *
            ((hitBonusValue * Math.sqrt(t.bonus)) / 320);

          t.score += bonusScore + baseScore;
          t.combo += 1;
          healthbarFinalVal(t.latestHit);

          t.comboReset = false;
          t.comboOn = true;
          t.hitComboVKey += 2;

          this.remove();
        }

        remove() {
          t.ss.columnContainers[this.i].removeChild(this);

          t.PIXIapp.ticker.remove(this.animateDrop, this);
          t.readyNotes[this.i].splice(t.readyNotes[this.i].indexOf(this), 1);
        }

        animateDrop() {
          this.y += t.dy;

          if (this.msFrom(true) <= t.hitJudgement['0'] && !this.ready) {
            this.ready = true;
            t.readyNotes[this.i].push(this);
          } else if (this.msFrom() > t.hitJudgement['50']) {
            this.miss();
          }

          if (this.msFrom() >= 0 && !this.fading) {
            this.fading = true;
            t.PIXIapp.ticker.add(this.animateFade, this);
          }
        }

        animateFade() {
          const da = t.dy / (t.stageHeight * (1 - t.hitPercent) + 2 * t.radius);

          if (this.alpha - da <= 0) {
            this.alpha = 0;
            t.PIXIapp.ticker.remove(this.animateFade, this);

            this.remove();
          } else {
            this.alpha -= da;
          }
        }

        resumeDropTimer() {
          this.startTime = new Date();

          this.timerID = setTimeout(() => {
            t.notesToFallArray.splice(t.notesToFallArray.indexOf(this), 1);
            this.timerID = null;

            t.ss.columnContainers[this.i].addChild(this);
            t.PIXIapp.ticker.add(this.animateDrop, this);

            console.log('Added:', Math.round(this.remainingTime));
          }, this.remainingTime);
        }

        pauseDropTimer() {
          clearTimeout(this.timerID);
          this.remainingTime -= new Date() - this.startTime;
        }
      }

      class Slider extends PIXI.Container {
        constructor(note) {
          super();

          this.i = note.columnIndex;
          this.time = note.time;
          this.sliderHeight =
            (t.dy * t.stageFPS * (note.endTime - note.time)) / 1000;

          // Creating the 3 parts of a slider
          const circleTopSprite = new PIXI.Sprite(t.circleTextures[this.i]);
          circleTopSprite.anchor.set(0.5);
          circleTopSprite.setTransform(0, -this.sliderHeight);
          circleTopSprite.width = circleTopSprite.height = 2 * t.radius;
          this.addChild(circleTopSprite);

          const rectSprite = new PIXI.Sprite(PIXI.Texture.WHITE);
          rectSprite.tint = parseInt(t.colors[this.i].slice(1), 16);
          rectSprite.anchor.set(0.5, 1); // anchors to the middle, bottom
          rectSprite.width = 2 * t.radius;
          rectSprite.height = this.sliderHeight;
          this.addChild(rectSprite);

          const circleBotSprite = new PIXI.Sprite(t.circleTextures[this.i]);
          circleBotSprite.anchor.set(0.5);
          circleBotSprite.width = circleBotSprite.height = 2 * t.radius;
          this.addChild(circleBotSprite);

          this.setTransform(t.stageColWidth / 2, -t.radius);

          this.remainingTime =
            note.time -
            t.beatmapIntro -
            (1000 * t.stageHeight * t.hitPercent + t.radius) /
              (t.dy * t.stageFPS);

          t.notesToFallArray.push(this);

          this.resumeDropTimer();

          t.ss.sliderColumnContainers[this.i].addChild(this);

          this.startTime, this.timerID;
        }

        msFrom(position, isAbs = false) {
          if (position === 'bot') {
            return isAbs
              ? Math.abs(
                  ((this.y - t.stageHeight * t.hitPercent) * 1000) /
                    (t.dy * t.stageFPS)
                )
              : ((this.y - t.stageHeight * t.hitPercent) * 1000) /
                  (t.dy * t.stageFPS);
          } else if (position === 'top') {
            return isAbs
              ? Math.abs(
                  ((this.y +
                    this.children[0].y -
                    t.stageHeight * t.hitPercent) *
                    1000) /
                    (t.dy * t.stageFPS)
                )
              : ((this.y + this.children[0].y - t.stageHeight * t.hitPercent) *
                  1000) /
                  (t.dy * t.stageFPS);
          } else console.log('Invalid position in slider.msFrom()');
        }

        miss() {
          if (this.missed) return;
          this.missed = true;

          this.children[0].alpha = this.children[2].alpha = 0.7;
          this.children[1].alpha = 0.6;

          t.latestHit = 0;
          t.totalHits['0']++;
          t.bonus = 0;
          t.missedCombo = t.combo;
          if (t.missedCombo > t.maxCombo) t.maxCombo = t.missedCombo;
          t.combo = 0;
          healthbarFinalVal(t.latestHit);

          t.comboOn = false;
          t.comboReset = true;
          t.hitComboVKey += 2;
        }

        hit() {
          if (this.missed) return;

          this.finalMs = this.msFrom('top', true);
          this.avgMs = (this.initialMs + this.finalMs) / 2;

          let hitBonusValue = 0;

          if (this.avgMs <= t.hitJudgement['320'] && !this.releasedMs) {
            t.latestHit = 320;
            t.totalHits['320']++;
            hitBonusValue = 32;
            t.bonus += 2;
          } else if (this.avgMs <= t.hitJudgement['300'] && !this.releasedMs) {
            t.latestHit = 300;
            t.totalHits['300']++;
            hitBonusValue = 32;
            t.bonus += 1;
          } else if (
            this.avgMs <= t.hitJudgement['300'] ||
            (!this.finalMs && this.initialMs <= t.hitJudgement['300'])
          ) {
            t.latestHit = 200;
            t.totalHits['200']++;
            hitBonusValue = 16;
            t.bonus -= 8;
          } else if (
            this.avgMs <= t.hitJudgement['200'] ||
            (!this.finalMs && this.initialMs <= t.hitJudgement['200'])
          ) {
            t.latestHit = 100;
            t.totalHits['100']++;
            hitBonusValue = 8;
            t.bonus -= 24;
          } else if (
            this.avgMs <= t.hitJudgement['50'] ||
            (!this.finalMs && this.initialMs <= t.hitJudgement['50'])
          ) {
            t.latestHit = 50;
            t.totalHits['50']++;
            hitBonusValue = 4;
            t.bonus -= 44;
          }

          t.bonus = t.clamp(t.bonus, 0, 100);

          const baseScore =
            ((1000000 * 0.5) / t.notes.length) * (t.latestHit / 320);

          const bonusScore =
            ((1000000 * 0.5) / t.notes.length) *
            ((hitBonusValue * Math.sqrt(t.bonus)) / 320);

          t.score += bonusScore + baseScore;
          t.combo += 1;
          healthbarFinalVal(t.latestHit);

          t.comboReset = false;
          t.comboOn = true;
          t.hitComboVKey += 2;

          this.remove();
        }

        remove() {
          t.ss.sliderColumnContainers[this.i].removeChild(this);
          t.PIXIapp.ticker.remove(this.animateDrop, this);
          t.PIXIapp.ticker.remove(() => (this.children[0].y += t.dy), this);

          t.readySliders[this.i] = null;
        }

        animateDrop() {
          this.y += t.dy;

          if (this.msFrom('bot', true) <= t.hitJudgement['50'] && !this.ready) {
            this.ready = true;
            t.readySliders[this.i] = this;
            //
          } else if (
            this.msFrom('bot') > t.hitJudgement['50'] &&
            !this.initialMs
          ) {
            this.miss();
            //
          } else if (this.msFrom('top') > t.hitJudgement['50']) {
            if (this.held && this.initialMs) this.hit();
            else this.miss();
            //
          } else if (this.y + this.children[0].y > t.stageHeight) this.remove();
        }

        animateShrink() {
          this.children[1].height -= t.dy;
          this.children[0].y += t.dy;

          /* if (this.children[2].y < t.stageHeight * t.hitPercent) {
            this.children[1].y += t.dy;
            this.children[2].y += t.dy;
          } */

          if (this.children[0].y >= this.children[2].y) {
            t.PIXIapp.ticker.remove(this.animateShrink, this);

            t.PIXIapp.ticker.add(() => (this.children[0].y += t.dy), this);

            this.hit();
          }
        }

        resumeDropTimer() {
          this.startTime = new Date();

          this.timerID = setTimeout(() => {
            t.ss.sliderColumnContainers[this.i].addChild(this);
            t.notesToFallArray.splice(t.notesToFallArray.indexOf(this), 1);
            this.timerID = null;

            t.PIXIapp.ticker.add(this.animateDrop, this);
            console.log('Added:', Math.round(this.remainingTime));
          }, this.remainingTime);
        }

        pauseDropTimer() {
          clearTimeout(this.timerID);
          this.remainingTime -= new Date() - this.startTime;
        }
      }

      // const Slider = function (note) {
      //   const sliderHeight =
      //     (t.dy * t.stageFPS * (note.endTime - note.time)) / 1000;

      //   const slider = new PIXI.Graphics();

      //   slider.i = note.columnIndex;
      //   slider.sliderHeight = sliderHeight;

      //   /* slider
      //     .lineStyle(1)
      //     .beginFill(parseInt(t.colors[slider.i].slice(1), 16))
      //     .drawRoundedRect(
      //       t.stageColWidth / 2 - t.radius,
      //       slider.sliderHeight + 2 * t.radius,
      //       2 * t.radius,
      //       slider.sliderHeight + 2 * t.radius,
      //       t.radius
      //     )
      //     .endFill(); */

      //   slider
      //     .lineStyle(1)
      //     .beginFill(parseInt(t.colors[slider.i].slice(1), 16))
      //     .drawRoundedRect(
      //       t.stageColWidth / 2 - t.radius,
      //       -t.stageHeight / 5,
      //       2 * t.radius,
      //       slider.sliderHeight + 2 * t.radius,
      //       t.radius
      //     )
      //     .endFill();

      //   slider.time = note.time;
      //   slider.remainingTime =
      //     note.time -
      //     t.beatmapIntro -
      //     (1000 * t.stageHeight * t.hitPercent + t.radius) /
      //       (t.dy * t.stageFPS);

      //   t.notesToFallArray.push(slider);

      //   slider.resumeDropTimer();

      //   t.ss.sliderColumnContainers[slider.i].addChild(slider);
      //   t.PIXIapp.ticker.add(() => {
      //     slider.y += t.dy / 10;
      //   });
      // };

      for (let index = 0; index < t.notesCol.length; index++) {
        new Note(t.notesCol[index]);
      }
      for (let index = 0; index < t.sliderCol.length; index++) {
        new Slider(t.sliderCol[index]);
      }
    },
    onPauseKey(isPaused) {
      if (isPaused) {
        this.notesToFallArray.forEach((note) => note.pauseDropTimer());
        // createjs.Ticker.paused = true;
        // this.music.pause();
      } else {
        this.notesToFallArray.forEach((note) => note.resumeDropTimer());
        // createjs.Ticker.paused = false;
        // this.music.play();
      }
    },
    clamp(value, min, max) {
      return value > max ? max : value < min ? min : value;
    },
  },
};
</script>

<style scoped>
#canvas__container {
  height: 100%;

  display: flex;
  flex-direction: column-reverse;
}

#canvas__container > * {
  position: absolute;
  height: 100%;
}

#game__hitCombo__container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  color: #fff;
}

#game__hitCombo__container > h1 {
  line-height: 1;
  height: 10rem;
}

#game__combo {
  font-size: 9rem;
  font-weight: 400;
}

.game__combo__on {
  animation: comboOnAnimation 0.15s linear forwards;
}

@keyframes comboOnAnimation {
  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

.game__combo__reset {
  animation: comboResetAnimation 0.2s ease-in forwards;
}

@keyframes comboResetAnimation {
  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 0;
  }
}

#game__hitValue {
  font-size: 14.5rem;
  font-weight: 300;

  opacity: 0;
}

.game__hitValue__on {
  animation: hitValueAnimation 0.25s linear forwards;
}

@keyframes hitValueAnimation {
  8% {
    transform: scale(1.1);
    opacity: 1;
  }

  23% {
    transform: scale(1);
  }

  100% {
    filter: brightness(1.1);
    transform: scale(0.75);
    opacity: 0;
  }
}

#game__hp-bar__container {
  transform: rotate(180deg);
  height: 40rem;
  width: 2rem;

  position: relative;
  left: calc(100% + 1rem);
  bottom: 1rem;

  padding: 0.4rem;
  border-radius: 1rem;

  background-color: white;
}

#game__hp-bar {
  height: 0%;

  transition: height 0.15s linear;

  background-color: #8bff95;
  border-radius: 0.5rem;
  box-shadow: inset -0.1rem -0.1rem 1rem rgb(0 0 0 / 0.5);
}
</style>
