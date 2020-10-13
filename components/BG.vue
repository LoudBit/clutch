<template>
  <div class="bg-color-grid">
    <label class="grid-area-label">Background Color</label>
    <button class="grid-area-button ui small" @click="randomize">Random</button>
    <div class="ui swatch grid-area-swatch" :style="{ backgroundColor: hex }"></div>
    <input v-model="hex" class="grid-area-input" type="text" size="sm" />
  </div>
</template>

<script>
import chroma from 'chroma-js'
import { mapMutations } from 'vuex'

export default {
  props: {
    color: {
      type: String,
      required: true
    }
  },
  computed: {
    hex: {
      get() {
        return this.color
      },
      set(value) {
        if (chroma.valid(value)) {
          this.$store.commit('bg/update', value)
        }
      }
    }
  },
  methods: {
    ...mapMutations({
      randomize: 'bg/randomize'
    })
  }
}
</script>

<style>
.bg-color-grid {
  display: grid;
  gap: 8px 8px;
  justify-items: stretch;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: auto;
  grid-template-areas:
    'label label label label label label button button'
    '. swatch input input input input input input ';
}
</style>
