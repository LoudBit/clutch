<template>
  <div class="PaletteInput">
    <i-container>
      <i-row>
        <i-column xs="3">
          <i-input v-model.number="steps" size="sm" type="number" min="2" max="32" step="1" />
        </i-column>
        <i-column xs="5">
          <i-select v-model="mode" size="sm">
            <i-select-option value="rgb" label="RGB" />
            <i-select-option value="hsl" label="HSL" />
            <i-select-option value="lab" label="LAB" />
            <i-select-option value="lrgb" label="Linear RGB" />
            <i-select-option value="lch" label="LCh" />
          </i-select>
        </i-column>
        <i-column xs="2">
          <i-checkbox-button v-model="hidden" size="sm">
            <span :style="isHiddenStyles">👁</span>
          </i-checkbox-button>
        </i-column>
        <i-column xs="2">
          <i-button circle size="sm" title="Add Color" @click="addColor()">
            <i-icon icon="plus" />
          </i-button>
        </i-column>
      </i-row>
      <!-- TODO: Add undo button somewhere -->
      <template v-for="(color, i) in input.colors">
        <ColorInput
          :key="`color-${color.id}`"
          :color-id="color.id"
          :input-index="index"
          :color-index="i"
          :input="input"
        ></ColorInput>
      </template>
    </i-container>
  </div>
</template>

<script>
import chroma from 'chroma-js'
import { mapMutations } from 'vuex'
import { extract } from '~/store/palette'
import ColorInput from '~/components/ColorInput'

export default {
  components: {
    ColorInput
  },
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
    hidden: {
      get() {
        return this.input.hidden
      },
      set(hidden) {
        const input = { hidden }
        const index = this.index
        this.$store.commit('palette/updateInput', { input, index })
      }
    },
    isHiddenStyles() {
      return this.input.hidden ? { opacity: 0.25 } : { opacity: 1 }
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
      // TODO: move this logic to the store
      const color = chroma.random()
      const colors = [...this.input.colors, extract(color)]
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
    ...mapMutations({
      removeInput: 'palette/removeInput'
    })
  }
}
</script>
