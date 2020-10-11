<template>
  <div class="ColorInput">
    <div class="ui grid grid--color-input">
      <button class="ui" @click="toggleOpen">
        <font-awesome-icon icon="angle-down" />
      </button>
      <div class="color-swatch" :style="colorStyles"></div>
      <input v-model="hex" type="text" />
    </div>
    <div class="ui grid grid--3-1">
      <div v-if="open" class="color-input--knobs">
        <RgbInput v-if="mode === 'rgb'" :input-index="inputIndex" :color-index="colorIndex" :input="input"></RgbInput>
        <LchInput v-if="mode === 'lch'" :input-index="inputIndex" :color-index="colorIndex" :input="input"></LchInput>
        <div class="ui">
          <div class="ui select">
            <select v-model="mode">
              <option value="rgb" label="RGB" />
              <option value="lch" label="LCh" />
            </select>
            <font-awesome-icon icon="angle-down" />
          </div>
          <button class="ui" title="Remove Color" @click="removeColor(colorIndex)">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RgbInput from '~/components/RgbInput'
import LchInput from '~/components/LchInput'

export default {
  components: {
    LchInput,
    RgbInput
  },

  props: {
    colorId: { type: String, required: true },
    colorIndex: { type: Number, required: true },
    inputIndex: { type: Number, required: true },
    input: { type: Object, required: true }
  },

  data() {
    return {
      mode: 'lch',
      open: false
    }
  },

  computed: {
    colorStyles() {
      return { backgroundColor: this.input.colors[this.colorIndex].hex }
    },
    hex: {
      get() {
        return this.input.colors[this.colorIndex].hex
      },
      set(hex) {
        this.$store.dispatch('palette/updateColor', {
          inputId: this.input.id,
          colorId: this.colorId,
          mode: 'hex',
          value: hex
        })
      }
    }
  },

  methods: {
    removeColor(index) {
      this.$store.dispatch('palette/removeColor', { inputIndex: this.inputIndex, colorIndex: this.colorIndex })
    },
    toggleOpen() {
      this.open = !this.open
    }
  }
}
</script>

<style lang="scss">
.ColorInput {
  position: relative;
  padding-bottom: 8px;
}

.color-swatch {
  height: 32px;
  width: 100%;
  border: 1px solid rgba(black, 0.3);
  border-radius: 3px;
}

.ui.grid.grid--color-input {
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: auto;
}
.grid--color-input > :nth-child(1) {
  grid-column: 1 / 2;
}
.grid--color-input > :nth-child(2) {
  grid-column: 2 / 3;
}
.grid--color-input > :nth-child(3) {
  grid-column: 3 / 9;
}

.color-input-options-grid {
  margin-top: 8px;
  grid-template-columns: 3fr 1fr;
}

.color-input--knobs {
  border-bottom: 2px solid rgba(black, 0.1);
  margin: 0 0 4px;
  padding: 0 0 12px;
}
</style>
