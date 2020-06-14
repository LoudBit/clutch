<template>
  <i-row>
    <i-column>
      <i-input :value="l" size="sm" type="number" min="0" max="100" step="0.1" @change="changeL" />
    </i-column>
    <i-column>
      <i-input :value="c" size="sm" type="number" min="0" max="100" step="0.1" @change="changeC" />
    </i-column>
    <i-column>
      <i-input :value="h" size="sm" type="number" min="0" max="360" step="1" @change="changeH" />
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

  computed: {
    l() {
      return this.input.colors[this.colorIndex].lch[0].toFixed(1)
    },
    c() {
      return this.input.colors[this.colorIndex].lch[1].toFixed(1)
    },
    h() {
      const h = this.input.colors[this.colorIndex].lch[2].toFixed(1)
      return isNaN(h) ? 0 : h
    }
  },

  methods: {
    changeL(l) {
      l = parseFloat(l)
      const lch = this.input.colors[this.colorIndex].lch
      this.$store.dispatch('palette/updateLch', {
        colorIndex: this.colorIndex,
        input: this.input,
        inputIndex: this.inputIndex,
        lch: [l, lch[1], lch[2]]
      })
    },
    changeC(c) {
      c = parseFloat(c)
      const lch = this.input.colors[this.colorIndex].lch
      this.$store.dispatch('palette/updateLch', {
        colorIndex: this.colorIndex,
        input: this.input,
        inputIndex: this.inputIndex,
        lch: [lch[0], c, lch[2]]
      })
    },
    changeH(h) {
      h = parseFloat(h)
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
