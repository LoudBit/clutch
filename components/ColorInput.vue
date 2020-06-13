<template>
  <div class="ColorInput" :style="colorStyles">
    <i-row>
      <i-column xs="5">
        <i-select v-model="mode" size="sm">
          <i-select-option value="rgb" label="RGB" />
          <i-select-option value="lch" label="LCh" />
        </i-select>
      </i-column>
      <i-column xs="5">
        <i-input v-model="hex" size="sm" />
      </i-column>
      <i-column xs="2" class="_text-right">
        <i-button circle size="sm" title="Remove Color" @click="removeColor(colorIndex)">
          <i-icon icon="minus" />
        </i-button>
      </i-column>
    </i-row>
    <RgbInput v-if="mode === 'rgb'" :input-index="inputIndex" :color-index="colorIndex" :input="input"></RgbInput>
    <LchInput v-if="mode === 'lch'" :input-index="inputIndex" :color-index="colorIndex" :input="input"></LchInput>
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
      mode: 'lch'
    }
  },

  computed: {
    colorStyles() {
      return { borderLeft: `4px solid ${this.input.colors[this.colorIndex].hex}` }
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
    }
  }
}
</script>

<style>
.ColorInput {
  padding: 0 15px;
  margin: 20px -15px;
  position: relative;
}
.ColorInput::after {
  display: block;
  content: '';
  width: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: absolute;
  bottom: -10px;
  left: -5px;
}
.ColorInput .dropdown.select input {
  border: 1px solid red;
}
</style>
