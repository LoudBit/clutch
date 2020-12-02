<template>
  <div class="BG">
    <div class="ui grid">
      <label class="ui span-8 block" for="bg">Background Color</label>
      <button class="ui span-1" @click="toggleOpen">
        <font-awesome-icon icon="angle-down" />
      </button>
      <div class="ui swatch span-1" :style="{ backgroundColor: hex }"></div>
      <input id="bg" v-model="hex" class="span-6" type="text" size="sm" />
    </div>
    <template v-if="open">
      <Lch2 v-if="mode === 'lch'" :l="l" :c="c" :h="h" @l="setL" @c="setC" @h="setH"></Lch2>
      <!-- <RgbInput v-if="mode === 'rgb'" :input-index="inputIndex" :color-index="colorIndex" :input="input"></RgbInput> -->
      <div class="ui grid">
        <div class="ui select span-6">
          <select v-model="mode">
            <option value="rgb" label="RGB" />
            <option value="lch" label="LCh" />
          </select>
          <font-awesome-icon icon="angle-down" />
        </div>
        <button class="ui span-2" @click="randomize">Random</button>
      </div>
    </template>
  </div>
</template>

<script>
import chroma from 'chroma-js'
import { mapGetters, mapMutations } from 'vuex'

import Lch2 from '~/components/Lch2'

export default {
  components: {
    Lch2
  },

  data() {
    return {
      mode: 'lch',
      open: false
    }
  },

  computed: {
    ...mapGetters({
      bg: 'bg/bg'
    }),
    l() {
      return this.bg.lch[0]
    },
    c() {
      return this.bg.lch[1]
    },
    h() {
      return this.bg.lch[2]
    },
    hex: {
      get() {
        return this.bg.hex
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
    }),
    setL(l) {
      this.$store.commit('bg/updateLch', [l, this.bg.lch[1], this.bg.lch[2]])
    },
    setC(c) {
      this.$store.commit('bg/updateLch', [this.bg.lch[0], c, this.bg.lch[2]])
    },
    setH(h) {
      this.$store.commit('bg/updateLch', [this.bg.lch[0], this.bg.lch[1], h])
    },
    toggleOpen() {
      this.open = !this.open
    }
  }
}
</script>
