<template>
  <i-row>
    <i-column>
      <i-input v-model.number="l" size="sm" type="number" min="0" max="100" step="0.1" />
    </i-column>
    <i-column>
      <i-input v-model.number="c" size="sm" type="number" min="0" max="100" step="0.1" />
    </i-column>
    <i-column>
      <i-input v-model.number="h" size="sm" type="number" min="0" max="360" step="1" />
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
      l: this.input.colors[this.colorIndex].lch[0].toFixed(1),
      c: this.input.colors[this.colorIndex].lch[1].toFixed(1),
      h: this.input.colors[this.colorIndex].lch[2].toFixed(1)
    }
  },

  watch: {
    l(l, oldL) {
      const lch = this.input.colors[this.colorIndex].lch
      this.$store.dispatch('palette/updateLch', {
        colorIndex: this.colorIndex,
        input: this.input,
        inputIndex: this.inputIndex,
        lch: [l, lch[1], lch[2]]
      })
    },
    c(c, oldC) {
      const lch = this.input.colors[this.colorIndex].lch
      this.$store.dispatch('palette/updateLch', {
        colorIndex: this.colorIndex,
        input: this.input,
        inputIndex: this.inputIndex,
        lch: [lch[0], c, lch[2]]
      })
    },
    h(h, oldH) {
      const lch = this.input.colors[this.colorIndex].lch
      this.$store.dispatch('palette/updateLch', {
        colorIndex: this.colorIndex,
        input: this.input,
        inputIndex: this.inputIndex,
        lch: [lch[0], lch[1], h]
      })
    }
  }
}
</script>
