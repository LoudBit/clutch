<template>
  <div class="ColorInput">
    <div class="color-input-grid">
      <div>
        <button class="ui x-100">
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
    <RgbInput v-if="mode === 'rgb'" :input-index="inputIndex" :color-index="colorIndex" :input="input"></RgbInput>
    <LchInput v-if="mode === 'lch'" :input-index="inputIndex" :color-index="colorIndex" :input="input"></LchInput>
    <div class="color-input-options-grid">
      <div class="ui select grid-area-input">
        <select v-model="mode">
          <option value="rgb" label="RGB" />
          <option value="lch" label="LCh" />
        </select>
        <font-awesome-icon icon="angle-down" />
      </div>
      <div class="ui-text-right grid-area-button">
        <button class="ui x-100" title="Remove Color" @click="removeColor(colorIndex)">
          Delete
        </button>
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
      mode: 'lch'
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
    }
  }
}
</script>

<style lang="scss">
.ColorInput {
  position: relative;
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
  display: grid;
  gap: 8px 8px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  grid-template-areas: 'input input input button';
}
</style>
