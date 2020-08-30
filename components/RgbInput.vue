<template>
  <div class="">
    <div class="slider-outer-grid">
      <div class="ui slider slider-inner-grid">
        <div class="text-center">
          <label>R</label>
        </div>
        <input :value="r" type="range" min="0" max="255" step="1" :style="gradients.r" @input="changeR" />
      </div>
      <input :value="r" type="number" min="0" max="255" step="1" @change="changeR" />
    </div>
    <div class="slider-outer-grid">
      <div class="ui slider slider-inner-grid">
        <div class="text-center">
          <label>G</label>
        </div>
        <input :value="g" type="range" min="0" max="255" step="1" :style="gradients.g" @input="changeG" />
      </div>
      <input :value="g" type="number" min="0" max="255" step="1" @change="changeG" />
    </div>
    <div class="slider-outer-grid">
      <div class="ui slider slider-inner-grid">
        <div class="text-center">
          <label>B</label>
        </div>
        <input :value="b" type="range" min="0" max="255" step="1" :style="gradients.b" @input="changeB" />
      </div>
      <input :value="b" type="number" min="0" max="255" step="1" @change="changeB" />
    </div>
  </div>
</template>

<script>
import { createRGBGradients } from '~/lib/color/gradients'

export default {
  props: {
    colorIndex: { type: Number, required: true },
    inputIndex: { type: Number, required: true },
    input: { type: Object, required: true }
  },

  data() {
    return {
      r: this.input.colors[this.colorIndex].rgb[0],
      g: this.input.colors[this.colorIndex].rgb[1],
      b: this.input.colors[this.colorIndex].rgb[2]
    }
  },

  computed: {
    gradients() {
      return createRGBGradients(this.r, this.g, this.b)
    }
  },

  methods: {
    changeR(event) {
      this.r = parseInt(event.target.value, 10)
      const rgb = this.input.colors[this.colorIndex].rgb
      this.$store.dispatch('palette/updateRgb', {
        colorIndex: this.colorIndex,
        input: this.input,
        inputIndex: this.inputIndex,
        rgb: [this.r, rgb[1], rgb[2]]
      })
    },
    changeG(event) {
      this.g = parseInt(event.target.value, 10)
      const rgb = this.input.colors[this.colorIndex].rgb
      this.$store.dispatch('palette/updateRgb', {
        colorIndex: this.colorIndex,
        input: this.input,
        inputIndex: this.inputIndex,
        rgb: [rgb[0], this.g, rgb[2]]
      })
    },
    changeB(event) {
      this.b = parseInt(event.target.value, 10)
      const rgb = this.input.colors[this.colorIndex].rgb
      this.$store.dispatch('palette/updateRgb', {
        colorIndex: this.colorIndex,
        input: this.input,
        inputIndex: this.inputIndex,
        rgb: [rgb[0], rgb[1], this.b]
      })
    }
  }
}
</script>
