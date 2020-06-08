<template>
  <i-container>
    <i-row>
      <i-column>
        <BG :color="bg"></BG>
      </i-column>
    </i-row>
    <i-row>
      <i-column>
        <h6>From Inputs</h6>
        <ColorInput v-for="(input, index) in inputs" :key="index" :input="input" :index="index"></ColorInput>
        <i-button size="sm" variant="dark" @click="addInput">Add Input</i-button>
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
import ColorInput from '~/components/ColorInput'

export default {
  components: { BG, ColorInput },
  computed: {
    ...mapGetters({
      bg: 'palette/bg',
      colors: 'palette/colors', // TODO: remove
      inputs: 'palette/rawInputs',
      fromInputs: 'palette/fromInputs', // TODO: rename
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
