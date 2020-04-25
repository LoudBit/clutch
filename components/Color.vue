<template>
  <div :style="colorStyles" class="Color">
    <i-container>
      <i-row>
        <i-column>
          <input v-model="hex" />
        </i-column>
        <i-column>
          <i-button size="sm" @click="removeColor(index)">Remove</i-button>
        </i-column>
      </i-row>
      <i-row>
        <i-column>
          <input v-model="r" type="number" step="1" min="0" max="255" />
        </i-column>
        <i-column>
          <input v-model.number="g" type="number" step="1" min="0" max="255" />
        </i-column>
        <i-column>
          <input v-model.number="b" type="number" step="1" min="0" max="255" />
        </i-column>
      </i-row>
      <i-row>
        <i-column>
          <input v-model.number="l" type="number" min="0" max="100" step="0.001" />
        </i-column>
        <i-column>
          <input v-model.number="c" type="number" min="0" max="100" step="0.001" />
        </i-column>
        <i-column>
          <input v-model.number="h" type="number" min="0" max="360" step="1" />
        </i-column>
      </i-row>
    </i-container>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
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
      set(value) {
        const color = Color.fromHex(value)
        if (color) {
          this.$store.commit('palette/updateColor', {
            color,
            index: this.index
          })
        }
      }
    },
    r: {
      get() {
        return this.color.rgb.r
      },
      set(r) {
        const color = Color.fromRGB({
          r,
          g: this.color.rgb.g,
          b: this.color.rgb.b
        })
        if (color) {
          this.$store.commit('palette/updateColor', {
            color,
            index: this.index
          })
        }
      }
    },
    g: {
      get() {
        return this.color.rgb.g
      },
      set(g) {
        const color = Color.fromRGB({
          r: this.color.rgb.r,
          g,
          b: this.color.rgb.b
        })
        if (color) {
          this.$store.commit('palette/updateColor', {
            color,
            index: this.index
          })
        }
      }
    },
    b: {
      get() {
        return this.color.rgb.b
      },
      set(b) {
        const color = Color.fromRGB({
          r: this.color.rgb.r,
          g: this.color.rgb.g,
          b
        })
        if (color) {
          this.$store.commit('palette/updateColor', {
            color,
            index: this.index
          })
        }
      }
    },

    l: {
      get() {
        return this.color.lch.l
      },
      set(l) {
        const color = Color.fromLCH({
          l,
          c: this.color.lch.c,
          h: this.color.lch.h
        })
        if (color) {
          this.$store.commit('palette/updateColor', {
            color,
            index: this.index
          })
        }
      }
    },
    c: {
      get() {
        return this.color.lch.c
      },
      set(c) {
        const color = Color.fromLCH({
          l: this.color.lch.l,
          c,
          h: this.color.lch.h
        })
        if (color) {
          this.$store.commit('palette/updateColor', {
            color,
            index: this.index
          })
        }
      }
    },
    h: {
      get() {
        return this.color.lch.h
      },
      set(h) {
        const color = Color.fromLCH({
          l: this.color.lch.l,
          c: this.color.lch.c,
          h
        })
        if (color) {
          this.$store.commit('palette/updateColor', {
            color,
            index: this.index
          })
        }
      }
    }
  },
  methods: {
    ...mapMutations({
      removeColor: 'palette/removeColor'
    })
  }
}
</script>
