<template>
  <i-row>
    <i-column>
      <i-input v-model.number="r" size="sm" type="number" min="0" max="255" step="1" />
    </i-column>
    <i-column>
      <i-input v-model.number="g" size="sm" type="number" min="0" max="255" step="1" />
    </i-column>
    <i-column>
      <i-input v-model.number="b" size="sm" type="number" min="0" max="255" step="1" />
    </i-column>
  </i-row>
</template>

<script>
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

  watch: {
    r(r, oldR) {
      const rgb = this.input.colors[this.colorIndex].rgb
      this.$store.dispatch('palette/updateRgb', {
        colorIndex: this.colorIndex,
        input: this.input,
        inputIndex: this.inputIndex,
        rgb: [r, rgb[1], rgb[2]]
      })
    },
    g(g, oldG) {
      const rgb = this.input.colors[this.colorIndex].rgb
      this.$store.dispatch('palette/updateLch', {
        colorIndex: this.colorIndex,
        input: this.input,
        inputIndex: this.inputIndex,
        lch: [rgb[0], g, rgb[2]]
      })
    },
    b(b, oldB) {
      const rgb = this.input.colors[this.colorIndex].rgb
      this.$store.dispatch('palette/updateRgb', {
        colorIndex: this.colorIndex,
        input: this.input,
        inputIndex: this.inputIndex,
        lch: [rgb[0], rgb[1], b]
      })
    }
  }
}
</script>
