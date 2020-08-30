<template>
  <div class="palette-input-grid">
    <div class="grid-area-delete">
      <br class="ui" />
      <button class="ui x-100" title="Delete Input">Delete</button>
    </div>
    <div class="grid-area-visibility">
      <br class="ui" />
      <button v-if="hidden" class="ui x-100" title="Show Colors" @click="toggleVisibility()">
        Show
      </button>
      <button v-if="!hidden" class="ui x-100" title="Hide Colors" @click="toggleVisibility()">
        Hide
      </button>
    </div>
    <div class="grid-area-steps">
      <label>Steps</label>
      <input v-model.number="steps" type="number" min="2" max="32" step="1" />
    </div>
    <div class="grid-area-blend">
      <label>Blend</label>
      <div class="ui select">
        <select v-model="mode" class="ui">
          <option value="rgb" label="RGB" />
          <option value="hsl" label="HSL" />
          <option value="lab" label="LAB" />
          <option value="lrgb" label="Linear RGB" />
          <option value="lch" label="LCh" />
        </select>
        <font-awesome-icon icon="angle-down" />
      </div>
    </div>
    <div class="">
      <button class="ui x-100" title="Add Color" @click="addColor()"><font-awesome-icon icon="plus" /> Add</button>
    </div>
  </div>
</template>

<script>
import chroma from 'chroma-js'
import { mapMutations } from 'vuex'
import { createColor } from '~/store/palette'

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
    toggleVisibility() {
      this.hidden = !this.hidden
    },
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

<style lang="scss">
.palette-input-grid {
  margin-top: 16px;
  margin-bottom: 8px;
  display: grid;
  gap: 8px 8px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  grid-template-areas: 'delete visibility steps blend';
}
</style>
