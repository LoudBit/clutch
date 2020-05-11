<template>
  <div class="ColorInput">
    <i-container>
      <!--
      <i-row>
        <i-column>
          <small><b>Type:</b> {{ input.type }}</small>
        </i-column>
        <i-column>
          <i-button size="sm" @click="removeInput(index)">Remove</i-button>
        </i-column>
      </i-row>
      -->
      <i-row v-for="(color, i) in input.colors" :key="i" :style="colorStyles[i]">
        <i-column>
          <i-input size="sm" :value="color" @input="updateColor($event, i)" />
        </i-column>
        <i-column>
          <i-button size="sm" @click="removeColor(i)">Remove Color</i-button>
        </i-column>
      </i-row>
      <i-row>
        <i-column>
          <i-button size="sm" @click="addColor()">Add Color</i-button>
        </i-column>
      </i-row>
      <i-row>
        <i-column>
          <i-input v-model.number="steps" size="sm" type="number" min="2" max="32" step="1" />
        </i-column>
        <i-column>
          <i-select v-model="mode" size="sm">
            <i-select-option value="rgb" label="RGB" />
            <i-select-option value="hsl" label="HSL" />
            <i-select-option value="lab" label="LAB" />
            <i-select-option value="lrgb" label="Linear RGB" />
            <i-select-option value="lch" label="LCh" />
          </i-select>
        </i-column>
      </i-row>
    </i-container>
  </div>
</template>

<script>
import chroma from 'chroma-js'
import { mapMutations } from 'vuex'

export default {
  props: {
    input: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    colorStyles() {
      return this.input.colors.map((color) => {
        return { borderLeft: `4px solid ${color}` }
      })
    },
    mode: {
      get() {
        return this.input.mode
      },
      set(mode) {
        const input = { mode }
        const index = this.index
        this.$store.commit('palette/updateInput', { input, index })
      }
    },
    steps: {
      get() {
        return this.input.steps
      },
      set(steps) {
        const input = { steps }
        const index = this.index
        this.$store.commit('palette/updateInput', { input, index })
      }
    }
  },
  methods: {
    addColor() {
      const color = chroma.random()
      const colors = [...this.input.colors, color.hex()]
      const input = { colors }
      const index = this.index
      this.$store.commit('palette/updateInput', { input, index })
    },
    removeColor(ndx) {
      const colors = [...this.input.colors]
      colors.splice(ndx, 1)
      const input = { colors }
      const index = this.index
      this.$store.commit('palette/updateInput', { input, index })
    },
    updateColor(color, i) {
      if (chroma.valid(color)) {
        const colors = [...this.input.colors]
        colors[i] = color
        const input = { colors }
        const index = this.index
        this.$store.commit('palette/updateInput', { input, index })
      }
    },
    ...mapMutations({
      removeInput: 'palette/removeInput'
    })
  }
}
</script>

<style>
.ColorInput {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 8px;
}
.ColorInput + .ColorInput {
  margin-top: 8px;
}
</style>
