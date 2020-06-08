<template>
  <div>
    <h6>Background Color</h6>
    <i-row>
      <i-column>
        <i-input v-model="hex" variant="dark" size="sm" />
      </i-column>
      <i-column>
        <i-button size="sm" variant="dark" @click="randomize">Randomize</i-button>
      </i-column>
    </i-row>
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
