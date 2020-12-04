<template>
  <div class="ui grid">
    <div class="ui slider slider-inner-grid span-6">
      <div class="text-center">
        <label>R</label>
      </div>
      <input :value="r" type="range" min="0" max="255" step="1" :style="gradients.r" @input="changeR" />
    </div>
    <input :value="r" type="number" min="0" max="255" step="1" class="span-2" @change="changeR" />
    <div class="ui slider slider-inner-grid span-6">
      <div class="text-center">
        <label>G</label>
      </div>
      <input :value="g" type="range" min="0" max="255" step="1" :style="gradients.g" @input="changeG" />
    </div>
    <input :value="g" type="number" min="0" max="255" step="1" class="span-2" @change="changeG" />
    <div class="ui slider slider-inner-grid span-6">
      <div class="text-center">
        <label>B</label>
      </div>
      <input :value="b" type="range" min="0" max="255" step="1" :style="gradients.b" @input="changeB" />
    </div>
    <input :value="b" type="number" min="0" max="255" step="1" class="span-2" @change="changeB" />
  </div>
</template>

<script>
import { createRGBGradients } from '~/lib/color/gradients'

export default {
  props: {
    r: { type: Number, required: true },
    g: { type: Number, required: true },
    b: { type: Number, required: true }
  },

  computed: {
    gradients() {
      return createRGBGradients(this.r, this.g, this.b)
    }
  },

  methods: {
    changeR(event) {
      const r = parseFloat(event.target.value)
      this.$emit('r', r)
    },
    changeG(event) {
      const g = parseFloat(event.target.value)
      this.$emit('g', g)
    },
    changeB(event) {
      const b = parseFloat(event.target.value)
      this.$emit('b', b)
    }
  }
}
</script>

<style lang="scss">
.slider-inner-grid {
  background: rgba(black, 0.2);
  border-radius: 2px;
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
