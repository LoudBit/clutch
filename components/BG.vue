<template>
  <i-form-group>
    <i-form-label>Background Color</i-form-label>
    <i-input v-model="hex" size="sm">
      <i-button slot="append" size="sm" @click="randomize">Randomize</i-button>
    </i-input>
  </i-form-group>
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
