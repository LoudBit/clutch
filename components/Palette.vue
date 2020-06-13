<template>
  <i-container>
    <i-row>
      <i-column>
        <BG :color="bg"></BG>
      </i-column>
    </i-row>
    <i-row>
      <i-column>
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
      </i-column>
    </i-row>
    <!-- <i-row>
      <i-column>
        <h6>Palette</h6>
        <PaletteInput
          v-for="(input, index) in rawInputs"
          :key="`input-${input.id}`"
          :input="input"
          :index="index"
        ></PaletteInput>
      </i-column>
    </i-row> -->
    <i-row>
      <i-column>
        <i-button size="sm" title="Add Input" @click="addInput">
          <i-icon icon="plus" />
          &nbsp; Add Input
        </i-button>
      </i-column>
    </i-row>
    <i-row>
      <i-column>
        <h6>Colors</h6>
        <div v-for="(color, index) in fromInputs" :key="index">
          {{ color }}
        </div>
      </i-column>
    </i-row>
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
