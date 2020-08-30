<template>
  <div class="">
    <div class="slider-outer-grid">
      <div class="ui slider slider-inner-grid">
        <div class="text-center">
          <label>R</label>
        </div>
        <input :value="r" type="range" min="0" max="255" step="1" @input="changeR" />
      </div>
      <input :value="r" type="number" min="0" max="255" step="1" @change="changeR" />
    </div>
    <div class="slider-outer-grid">
      <div class="ui slider slider-inner-grid">
        <div class="text-center">
          <label>G</label>
        </div>
        <input :value="g" type="range" min="0" max="255" step="1" @input="changeG" />
      </div>
      <input :value="g" type="number" min="0" max="255" step="1" @change="changeG" />
    </div>
    <div class="slider-outer-grid">
      <div class="ui slider slider-inner-grid">
        <div class="text-center">
          <label>B</label>
        </div>
        <input :value="b" type="range" min="0" max="255" step="1" @input="changeB" />
      </div>
      <input :value="b" type="number" min="0" max="255" step="1" @change="changeB" />
    </div>
  </div>
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

  // TODO: use the same pattern as LchInput -- but which one is correct? - LCH!
  methods: {
    changeR(event) {
      const r = parseInt(event.target.value, 10)
      const rgb = this.input.colors[this.colorIndex].rgb
      this.$store.dispatch('palette/updateRgb', {
        colorIndex: this.colorIndex,
        input: this.input,
        inputIndex: this.inputIndex,
        rgb: [r, rgb[1], rgb[2]]
      })
    },
    changeG(event) {
      const g = parseInt(event.target.value, 10)
      const rgb = this.input.colors[this.colorIndex].rgb
      this.$store.dispatch('palette/updateRgb', {
        colorIndex: this.colorIndex,
        input: this.input,
        inputIndex: this.inputIndex,
        rgb: [rgb[0], g, rgb[2]]
      })
    },
    changeB(event) {
      const b = parseInt(event.target.value, 10)
      const rgb = this.input.colors[this.colorIndex].rgb
      this.$store.dispatch('palette/updateRgb', {
        colorIndex: this.colorIndex,
        input: this.input,
        inputIndex: this.inputIndex,
        rgb: [rgb[0], rgb[1], b]
      })
    }
  }
}
</script>
