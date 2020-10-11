<template>
  <div class="ui subgrid">
    <!-- <div class="slider-outer-grid"> -->
    <div class="ui slider slider-inner-grid">
      <div class="text-center">
        <label>L</label>
      </div>
      <input :value="l" type="range" min="0" max="100" step="0.1" :style="gradients.l" @input="changeL" />
    </div>
    <input :value="l" type="number" min="0" max="100" step="0.1" @change="changeL" />
    <!-- </div> -->
    <!-- <div class="slider-outer-grid"> -->
    <div class="ui slider slider-inner-grid">
      <div class="text-center">
        <label>C</label>
      </div>
      <input :value="c" type="range" min="0" max="100" step="0.1" :style="gradients.c" @input="changeC" />
    </div>
    <input :value="c" type="number" min="0" max="100" step="0.1" @change="changeC" />
    <!-- </div> -->
    <!-- <div class="slider-outer-grid"> -->
    <div class="ui slider slider-inner-grid">
      <div class="text-center">
        <label>h</label>
      </div>
      <input :value="h" type="range" min="0" max="360" step="1" :style="gradients.h" @input="changeH" />
    </div>
    <input :value="h" type="number" min="0" max="360" step="1" @change="changeH" />
    <!-- </div> -->
  </div>
</template>

<script>
import { createLchGradients } from '~/lib/color/gradients'

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
    },
    gradients() {
      return createLchGradients(this.l, this.c, this.h)
    }
  },

  methods: {
    changeL(event) {
      const l = parseFloat(event.target.value)
      const lch = this.input.colors[this.colorIndex].lch
      this.$store.dispatch('palette/updateLch', {
        colorIndex: this.colorIndex,
        input: this.input,
        inputIndex: this.inputIndex,
        lch: [l, lch[1], lch[2]]
      })
    },
    changeC(event) {
      const c = parseFloat(event.target.value)
      const lch = this.input.colors[this.colorIndex].lch
      this.$store.dispatch('palette/updateLch', {
        colorIndex: this.colorIndex,
        input: this.input,
        inputIndex: this.inputIndex,
        lch: [lch[0], c, lch[2]]
      })
    },
    changeH(event) {
      const h = parseFloat(event.target.value)
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

<style lang="scss">
// .slider-outer-grid {
//   margin-top: 8px;
//   display: grid;
//   gap: 8px 8px;
//   grid-template-columns: 3fr 1fr;
//   grid-template-rows: auto;
// }
.slider-inner-grid {
  background: rgba(black, 0.2);
  align-items: center;
  display: grid;
  gap: 8px 8px;
  grid-template-columns: 1fr 6fr;
  grid-template-rows: none;
  padding: 0 8px 0 0;

  label {
    line-height: 32px;
  }
}
</style>
