<template>
  <div>
    <BG :color="bg"></BG>

    <div class="ui row">
      <div class="ui column">
        <h1>Palette</h1>
        <button class="ui button" title="Add Input" @click="addInput">
          &nbsp; Add Input
        </button>
      </div>
    </div>

    <div class="ui row">
      <div class="ui column">
        <template v-for="(input, index) in rawInputs">
          <PaletteInput :key="`input-${input.id}`" :input="input" :index="index"></PaletteInput>
          <ColorInput
            v-for="(color, i) in input.colors"
            :key="`color-${color.id}`"
            :color-id="color.id"
            :input-index="index"
            :color-index="i"
            :input="input"
          ></ColorInput>
        </template>
      </div>
    </div>

    <div class="ui row">
      <div class="ui column">
        <!-- IDEA: This could be a table [ swatch | hex | is an input ] -->
        <h1>Colors</h1>
        <div v-for="(color, index) in fromInputs" :key="index">
          {{ color }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import BG from '~/components/BG'
import PaletteInput from '~/components/PaletteInput'
import ColorInput from '~/components/ColorInput'

export default {
  components: { BG, PaletteInput, ColorInput },
  computed: {
    ...mapGetters({
      bg: 'palette/bg',
      rawInputs: 'palette/rawInputs',
      fromInputs: 'palette/fromInputs',
      scale: 'palette/scale'
    })
  },
  methods: {
    ...mapMutations({
      randomize: 'palette/randomize',
      addInput: 'palette/addInput'
    })
  }
}
</script>
