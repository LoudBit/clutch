<template>
  <div>
    <label>Background Color</label>
    <input v-model="hex" size="sm" />
    <button slot="append" size="sm" @click="randomize">Randomize</button>
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
