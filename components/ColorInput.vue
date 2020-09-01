<template>
  <div class="ColorInput">
    <div class="color-input-grid">
      <div>
        <button class="ui x-100" @click="toggleOpen">
          <font-awesome-icon icon="angle-down" />
        </button>
      </div>
      <div>
        <div class="color-swatch" :style="colorStyles"></div>
      </div>
      <div class="grid-area-input">
        <input v-model="hex" type="text" />
      </div>
    </div>

    <div v-if="open" class="color-input--knobs">
      <RgbInput v-if="mode === 'rgb'" :input-index="inputIndex" :color-index="colorIndex" :input="input"></RgbInput>
      <LchInput v-if="mode === 'lch'" :input-index="inputIndex" :color-index="colorIndex" :input="input"></LchInput>
      <div class="ui grid color-input-options-grid">
        <button class="ui x-100" title="Remove Color" @click="removeColor(colorIndex)">
          Delete
        </button>
        <div class="ui select x-100">
          <select v-model="mode">
            <option value="rgb" label="RGB" />
            <option value="lch" label="LCh" />
          </select>
          <font-awesome-icon icon="angle-down" />
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

.color-input-grid {
  display: grid;
  gap: 8px 8px;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: auto;
  grid-template-areas: 'button swatch input input input input input input ';
}

.color-input-options-grid {
  margin-top: 8px;
  grid-template-columns: 1fr 3fr;
}

.color-input--knobs {
  border-bottom: 2px solid rgba(black, 0.1);
  margin: 0 0 4px;
  padding: 0 0 12px;
}
</style>
