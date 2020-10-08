<template>
  <div class="PaletteInput">
    <div class="ui grid grid--palette-input">
      <div class="grid-area-delete">
        <br class="ui" />
        <button class="ui x-100" title="Delete Input" @click="removeInput">Delete</button>
      </div>
      <div class="grid-area-visibility">
        <br class="ui" />
        <button v-if="hidden" class="ui x-100" title="Show Colors" @click="toggleVisibility()">
          Show
        </button>
        <button v-if="!hidden" class="ui x-100" title="Hide Colors" @click="toggleVisibility()">
          Hide
        </button>
      </div>
      <div class="grid-area-steps">
        <label>Steps</label>
        <input v-model.number="steps" type="number" min="2" max="32" step="1" />
      </div>
      <div class="grid-area-blend">
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
    <div>
      <div v-if="gridOrList === 'grid'">
        <h6>Grid</h6>
        <div v-for="(color, index) in inputColors" :key="index" class="palette-swatch-cell">
          <span class="palette-swatch" :style="{ backgroundColor: color.hex() }" :title="color.hex()"></span>
        </div>
      </div>
      <ul v-if="gridOrList === 'list'" class="ui list list-tight list--palette-colors">
        <li v-for="(color, index) in inputColors" :key="index" class="ui grid grid--palette-colors">
          <div class="palette-swatch-cell">
            <span class="palette-swatch" :style="{ backgroundColor: color.hex() }" :title="color.hex()"></span>
          </div>
          <span>{{ color.hex() }}</span>
        </li>
      </ul>
    </div>
    <ColorInput
      v-for="(color, i) in input.colors"
      :key="`color-${color.id}`"
      :color-id="color.id"
      :input-index="index"
      :color-index="i"
      :input="input"
    ></ColorInput>
    <div class="ui grid grid--add-color">
      <button class="ui x-100" title="Add Color" @click="addColor()">
        <font-awesome-icon icon="plus" />
      </button>
    </div>
  </div>
</template>

<script>
import chroma from 'chroma-js'
import { createColor } from '~/store/palette'
import ColorInput from '~/components/ColorInput'

export default {
  components: { ColorInput },
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
      gridOrList: 'list'
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
    inputColors() {
      const inputColors = this.$store.getters['palette/getInputColorsById'](this.input.id)
      return inputColors
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
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  grid-template-areas: 'delete visibility steps blend';
}

.grid--add-color {
  grid-template-columns: repeat(8, 1fr);
}
.grid--add-color button {
  grid-column: 1 / 2;
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
