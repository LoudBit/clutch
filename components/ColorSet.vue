<template>
  <div class="ColorSet">
    <div class="ui grid grid--palette-input">
      <div class="ui span-1 column flex-end">
        <button v-if="open" class="ui x-100" title="Open Palette Controls" @click="toggleOpen()">
          <font-awesome-icon icon="angle-up" />
        </button>
        <button v-if="!open" class="ui x-100" title="Close Palette Controls" @click="toggleOpen()">
          <font-awesome-icon icon="angle-down" />
        </button>
      </div>
      <div class="ui span-1 column flex-end">
        <button v-if="!hidden" class="ui x-100" title="Hide Colors" @click="toggleVisibility()">
          <font-awesome-icon icon="eye" />
        </button>
        <button v-if="hidden" class="ui x-100" title="Show Colors" @click="toggleVisibility()">
          <font-awesome-icon icon="eye-slash" />
        </button>
      </div>
      <div class="ui span-3 column flex-end">
        <label>Steps</label>
        <input v-model.number="steps" type="number" min="2" max="32" step="1" />
      </div>
      <div class="ui span-3 column flex-end">
        <label>Blend</label>
        <div class="ui select">
          <select v-model="mode" class="ui">
            <option value="rgb" label="RGB" />
            <option value="hsl" label="HSL" />
            <option value="lab" label="LAB" />
            <option value="lrgb" label="Linear RGB" />
            <option value="lch" label="LCh" />
          </select>
          <font-awesome-icon icon="angle-down" />
        </div>
      </div>
    </div>
    <div class="ui row palette-lines">
      <span
        v-for="(color, index) in paletteColors"
        :key="index"
        class="palette-line"
        :style="{ backgroundColor: color.hex() }"
        :title="color.hex()"
      ></span>
    </div>

    <div v-if="open" class="palette-details">
      <draggable v-model="inputColors" handle=".drag-handle" @start="drag = true" @end="drag = false">
        <ColorInput
          v-for="(color, i) in inputColors"
          :key="`color-${color.id}`"
          :color-id="color.id"
          :input-index="index"
          :color-index="i"
          :input="input"
        ></ColorInput>
      </draggable>
      <div class="ui grid">
        <button class="ui span-1" title="Add Color" @click="addColor()">
          <font-awesome-icon icon="plus" />
        </button>
        <button class="ui start-6 span-3" title="Delete Input" @click="removeInput">Delete Set</button>
      </div>
    </div>

    <!-- <div v-if="!open"></div> -->
  </div>
</template>

<script>
import chroma from 'chroma-js'
import draggable from 'vuedraggable'

import { createColor } from '~/store/palette'
import ColorInput from '~/components/ColorInput'

export default {
  components: { ColorInput, draggable },
  props: {
    input: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      open: false
    }
  },
  computed: {
    hidden: {
      get() {
        return this.input.hidden
      },
      set(hidden) {
        const input = { hidden }
        const index = this.index
        this.$store.commit('palette/updateInput', { input, index })
      }
    },
    isHiddenStyles() {
      return this.input.hidden ? { opacity: 0.25 } : { opacity: 1 }
    },
    mode: {
      get() {
        return this.input.mode
      },
      set(mode) {
        const input = { mode }
        const index = this.index
        this.$store.commit('palette/updateInput', { input, index })
      }
    },
    steps: {
      get() {
        return this.input.steps
      },
      set(steps) {
        const input = { steps }
        const index = this.index
        this.$store.commit('palette/updateInput', { input, index })
      }
    },
    inputColors: {
      get() {
        return this.input.colors
      },
      set(newColors) {
        this.$store.commit('palette/orderColors', { inputId: this.input.id, newColors })
      }
    },
    paletteColors() {
      const paletteColors = this.$store.getters['palette/getInputColorsById'](this.input.id)
      return paletteColors
    }
  },
  methods: {
    toggleVisibility() {
      this.hidden = !this.hidden
    },
    addColor() {
      // TODO: move this logic to the store
      const color = chroma.random()
      const colors = [...this.input.colors, createColor(color)]
      const input = { colors }
      const index = this.index
      this.$store.commit('palette/updateInput', { input, index })
    },
    removeInput(ndx) {
      this.$store.commit('palette/removeInput', { index: this.index })
    },
    toggleOpen() {
      this.open = !this.open
    }
  }
}
</script>

<style lang="scss">
.ui.grid.grid--palette-input {
  margin-top: 16px;
  margin-bottom: 8px;
}

.grid--palette-swatches {
  grid-template-columns: repeat(8, 1fr);
}
.grid--palette-swatches > div {
  height: 32px;
  width: 100%;
  border: 1px solid rgba(black, 0.1);
  border-radius: 2px;
}

.palette-swatch-cell {
  text-align: center;
}
.palette-swatch {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 1px solid rgba(black, 0.1);
  border-radius: 2px;
  vertical-align: text-bottom;
}

.palette-details {
  padding: 0 0 8px;
}

.palette-lines {
  margin: -1px 0 7px;
}
.palette-lines:empty {
  padding: 2px 0 0;
}

.palette-line {
  display: inline-block;
  width: 100%;
  height: 2px;
}

.ui.list.list--palette-colors {
  margin: 8px 0 0 0;
}

.grid--palette-colors {
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: auto;
  align-content: center;
}
.grid--palette-colors > :nth-child(1) {
  grid-column: 1 / 2;
}
.grid--palette-colors > :nth-child(2) {
  grid-column: 2 / 4;
}
.grid--palette-colors > :nth-child(3) {
  grid-column: 4 / 5;
}
.grid--palette-colors > :nth-child(4) {
  grid-column: 5 / 6;
}
.grid--palette-colors > :nth-child(5) {
  grid-column: 6 / 7;
}
</style>
