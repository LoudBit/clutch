<template>
  <div class="ColorInput">
    <div class="colorFlair" :style="colorStyles"></div>
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
      return { borderLeft: `5px solid ${this.input.colors[this.colorIndex].hex}` }
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
  position: relative;
  margin-left: 10px;
}
.colorFlair {
  position: absolute;
  height: 100%;
  left: -15px;
}
</style>
