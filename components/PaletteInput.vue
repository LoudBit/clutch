<template>
  <div class="ui row">
    <div class="ui column">
      <div>
        <label>Steps</label>
        <input v-model.number="steps" type="number" min="2" max="32" step="1" />
      </div>
    </div>
    <div class="ui column">
      <div>
        <label>Mode</label>
        <select v-model="mode" size="sm">
          <option value="rgb" label="RGB" />
          <option value="hsl" label="HSL" />
          <option value="lab" label="LAB" />
          <option value="lrgb" label="Linear RGB" />
          <option value="lch" label="LCh" />
        </select>
      </div>
    </div>
    <div class="ui column">
      <div>
        <label></label>
        <!-- TODO: change this to 'visible' -->
        <input v-model="hidden" type="checkbox" name="Visibility" title="Toggle Visibility" />
        <span :style="isHiddenStyles">👁</span>
      </div>
    </div>
    <div class="ui column">
      <br />
      <button circle size="sm" title="Add Color" @click="addColor()">
        <!-- <i-icon icon="plus" /> -->
        +
      </button>
    </div>
  </div>
</template>

<script>
import chroma from 'chroma-js'
import { mapMutations } from 'vuex'
import { createColor } from '~/store/palette'
// import ColorInput from '~/components/ColorInput'

export default {
  // components: {
  //   ColorInput
  // },
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
      const colors = [...this.input.colors, createColor(color)]
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
