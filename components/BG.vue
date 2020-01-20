<template>
  <i-input v-model="hex" />
</template>

<script>
import Color from '~/lib/color/index'

export default {
  props: {
    color: {
      type: Object,
      required: true
    }
  },
  computed: {
    hex: {
      get() {
        return this.color.hex
      },
      // TODO: validate the input
      set(value) {
        const bg = Color.fromHex(value)
        if (bg) {
          this.$store.commit('palette/updateBG', bg)
        }
      }
    }
  }
}
</script>
