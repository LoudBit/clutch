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
    <ColorInput
      v-for="(color, i) in input.colors"
      :key="`color-${color.id}`"
      :color-id="color.id"
      :input-index="index"
      :color-index="i"
      :input="input"
    ></ColorInput>
    <div class="ui grid grid--add-color">
      <button class="ui x-100" title="Add Color" @click="addColor()">Add Color</button>
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
    }
  }
}
</script>

<style lang="scss">
.grid--palette-input {
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
  grid-column: 1 / 4;
}
</style>
