<template>
  <i-input v-model="hex" size="sm" />
</template>

<script>
import Color from '~/lib/color/index'

export default {
  props: {
    color: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
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
        const index = this.index
        const color = Color.fromHex(value)
        if (color) {
          this.$store.commit('palette/updateColor', { color, index })
        }
      }
    }
  }
}
</script>
