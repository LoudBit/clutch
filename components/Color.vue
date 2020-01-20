<template>
  <div v-bind:style="colorStyles" class="Color">
    <i-container>
      <i-row>
        <i-column>
          <i-input v-model="hex" size="sm" />
        </i-column>
      </i-row>
      <i-row between-xs>
        <i-column>
          <i-input v-model="r" type="number" size="sm" />
        </i-column>
        <i-column>
          <i-input v-model="g" type="number" size="sm" />
        </i-column>
        <i-column>
          <i-input v-model="b" type="number" size="sm" />
        </i-column>
      </i-row>
    </i-container>
  </div>
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
    colorStyles() {
      return { borderLeft: `4px solid ${this.color.hex}` }
    },
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
    },
    r: {
      get() {
        return this.color.rgb.r
      },
      set(r) {
        const index = this.index
        const color = Color.fromRGB({
          r,
          g: this.color.rgb.g,
          b: this.color.rgb.b
        })
        if (color) {
          this.$store.commit('palette/updateColor', { color, index })
        }
      }
    },
    g: {
      get() {
        return this.color.rgb.g
      },
      set(g) {
        const index = this.index
        const color = Color.fromRGB({
          r: this.color.rgb.r,
          g,
          b: this.color.rgb.b
        })
        if (color) {
          this.$store.commit('palette/updateColor', { color, index })
        }
      }
    },
    b: {
      get() {
        return this.color.rgb.b
      },
      set(b) {
        const index = this.index
        const color = Color.fromRGB({
          r: this.color.rgb.r,
          g: this.color.rgb.g,
          b
        })
        if (color) {
          this.$store.commit('palette/updateColor', { color, index })
        }
      }
    }
  }
}
</script>
