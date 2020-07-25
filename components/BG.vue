<template>
  <div class="ui grid">
    <label>Background Color</label>
    <button class="ui small" @click="randomize">Randomize</button>
    <input v-model="hex" type="text" size="sm" />
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
          this.$store.commit('palette/updateBG', value)
        }
      }
    }
  },
  methods: {
    ...mapMutations({
      randomize: 'palette/randomize'
    })
  }
}
</script>
