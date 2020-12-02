<template>
  <div class="BG">
    <div class="ui grid">
      <label class="ui span-8 block" for="bg">Background Color</label>
      <!-- <button class="ui small span-2" @click="randomize">Random</button> -->
      <button class="ui span-1" @click="toggleOpen">
        <font-awesome-icon icon="angle-down" />
      </button>
      <div class="ui swatch span-1" :style="{ backgroundColor: hex }"></div>
      <input id="bg" v-model="hex" class="span-6" type="text" size="sm" />
    </div>
    <template v-if="open">
      <!-- <LchInput v-if="mode === 'lch'" :input-index="inputIndex" :color-index="colorIndex" :input="input"></LchInput> -->
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
        <!-- <button class="ui span-2" title="Remove Color" @click="removeColor(colorIndex)">
          Delete
        </button> -->
      </div>
    </template>
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
  data() {
    return {
      mode: 'lch',
      open: false
    }
  },
  computed: {
    hex: {
      get() {
        return this.color
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
    toggleOpen() {
      this.open = !this.open
    }
  }
}
</script>
