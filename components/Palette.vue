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
        <PaletteInput
          v-for="(input, index) in rawInputs"
          :key="`input-${input.id}`"
          :input="input"
          :index="index"
        ></PaletteInput>
      </i-column>
    </i-row>
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

export default {
  components: { BG, PaletteInput },
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
