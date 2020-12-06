<template>
  <div class="ColorInput">
    <div class="ui grid drag-handle">
      <button class="ui span-1" @click="toggleOpen">
        <font-awesome-icon icon="angle-down" />
      </button>
      <div class="color-swatch span-1 " :style="colorStyles"></div>
      <input v-model="hex" type="text" class="span-6" />
    </div>
    <template v-if="open">
      <Lch2 v-if="mode === 'lch'" :l="l" :c="c" :h="h" @l="setL" @c="setC" @h="setH"></Lch2>
      <Rgb2 v-if="mode === 'rgb'" :r="r" :g="g" :b="b" @r="setR" @g="setG" @b="setB"></Rgb2>
      <div class="ui grid">
        <div class="ui select span-4">
          <select v-model="mode">
            <option value="rgb" label="RGB" />
            <option value="lch" label="LCh" />
          </select>
          <font-awesome-icon icon="angle-down" />
        </div>
        <button class="ui start-7 span-2" title="Remove Color" @click="removeColor(colorIndex)">
          Delete
        </button>
      </div>
    </template>
  </div>
</template>

<script>
import Rgb2 from '~/components/Rgb2'
import Lch2 from '~/components/Lch2'

export default {
  components: {
    Lch2,
    Rgb2
  },

  props: {
    colorId: { type: String, required: true },
    colorIndex: { type: Number, required: true },
    inputIndex: { type: Number, required: true },
    input: { type: Object, required: true }
  },

  data() {
    return {
      mode: 'lch',
      open: false
    }
  },

  computed: {
    color() {
      return this.input.colors[this.colorIndex]
    },
    l() {
      return this.color.lch[0]
    },
    c() {
      return this.color.lch[1]
    },
    h() {
      return this.color.lch[2]
    },
    r() {
      return this.color.rgb[0]
    },
    g() {
      return this.color.rgb[1]
    },
    b() {
      return this.color.rgb[2]
    },
    colorStyles() {
      return { backgroundColor: this.input.colors[this.colorIndex].hex }
    },
    hex: {
      get() {
        return this.color.hex
      },
      set(hex) {
        this.$store.dispatch('palette/updateColor', {
          inputId: this.input.id,
          colorId: this.colorId,
          mode: 'hex',
          value: hex
        })
      }
    }
  },

  methods: {
    removeColor(index) {
      this.$store.dispatch('palette/removeColor', { inputIndex: this.inputIndex, colorIndex: this.colorIndex })
    },
    setL(l) {
      const lch = this.color.lch
      this.$store.dispatch('palette/updateLch', {
        colorIndex: this.colorIndex,
        input: this.input,
        inputIndex: this.inputIndex,
        lch: [l, lch[1], lch[2]]
      })
    },
    setC(c) {
      const lch = this.color.lch
      this.$store.dispatch('palette/updateLch', {
        colorIndex: this.colorIndex,
        input: this.input,
        inputIndex: this.inputIndex,
        lch: [lch[0], c, lch[2]]
      })
    },
    setH(h) {
      const lch = this.color.lch
      this.$store.dispatch('palette/updateLch', {
        colorIndex: this.colorIndex,
        input: this.input,
        inputIndex: this.inputIndex,
        lch: [lch[0], lch[1], h]
      })
    },
    setR(r) {
      const rgb = this.color.rgb
      this.$store.dispatch('palette/updateRgb', {
        colorIndex: this.colorIndex,
        input: this.input,
        inputIndex: this.inputIndex,
        rgb: [r, rgb[1], rgb[2]]
      })
    },
    setG(g) {
      const rgb = this.color.rgb
      this.$store.dispatch('palette/updateRgb', {
        colorIndex: this.colorIndex,
        input: this.input,
        inputIndex: this.inputIndex,
        rgb: [rgb[0], g, rgb[2]]
      })
    },
    setB(b) {
      const rgb = this.color.rgb
      this.$store.dispatch('palette/updateRgb', {
        colorIndex: this.colorIndex,
        input: this.input,
        inputIndex: this.inputIndex,
        rgb: [rgb[0], rgb[1], b]
      })
    },

    toggleOpen() {
      this.open = !this.open
    }
  }
}
</script>

<style lang="scss">
.ColorInput {
  position: relative;
  margin: 0 0 8px;
}

.color-swatch {
  height: 32px;
  width: 100%;
  border: 1px solid rgba(black, 0.3);
  border-radius: 3px;
}

.color-input--knobs {
  border-bottom: 2px solid rgba(black, 0.1);
  margin: 0 0 6px;
  padding: 0 0 7px;
}
</style>
