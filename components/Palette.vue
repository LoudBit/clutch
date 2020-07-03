<template>
  <i-container>
    <div class="ui row">
      <div class="ui column">
        <BG :color="bg"></BG>
      </div>
    </div>
    <div class="ui row">
      <div class="ui column">
        <h6>Palette</h6>
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
        <i-button size="sm" title="Add Input" @click="addInput">
          <i-icon icon="plus" />
          &nbsp; Add Input
        </i-button>
      </div>
    </div>
    <div class="ui row">
      <div class="ui column">
        <!-- IDEA: This could be a table [ swatch | hex | is an input ] -->
        <h6>Colors</h6>
        <div v-for="(color, index) in fromInputs" :key="index">
          {{ color }}
        </div>
      </div>
    </div>
  </i-container>
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
