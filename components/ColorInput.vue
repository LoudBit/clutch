<template>
  <div class="ColorInput">
    <div class="ui grid">
      <button class="ui span-1" @click="toggleOpen">
        <font-awesome-icon icon="angle-down" />
      </button>
      <div class="color-swatch span-1" :style="colorStyles"></div>
      <input v-model="hex" type="text" class="span-6" />
    </div>
    <template v-if="open">
      <RgbInput v-if="mode === 'rgb'" :input-index="inputIndex" :color-index="colorIndex" :input="input"></RgbInput>
      <LchInput v-if="mode === 'lch'" :input-index="inputIndex" :color-index="colorIndex" :input="input"></LchInput>
      <div class="ui grid">
        <div class="ui select span-6">
          <select v-model="mode">
            <option value="rgb" label="RGB" />
            <option value="lch" label="LCh" />
          </select>
          <font-awesome-icon icon="angle-down" />
        </div>
        <button class="ui span-2" title="Remove Color" @click="removeColor(colorIndex)">
          Delete
        </button>
      </div>
    </template>
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
  margin: 0 0 8px;
}

.color-swatch {
  height: 32px;
  width: 100%;
  border: 1px solid rgba(black, 0.3);
  border-radius: 3px;
}

.color-input--knobs {
  border-bottom: 2px solid rgba(black, 0.1);
  margin: 0 0 6px;
  padding: 0 0 7px;
}
</style>
