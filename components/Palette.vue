<template>
  <i-container>
    <i-row>
      <i-column>
        <h6>Background Color</h6>
        <BG :color="bg"></BG>
        <i-button size="sm" variant="dark" @click="randomize">Randomize</i-button>
      </i-column>
    </i-row>
    <i-row>
      <i-column>
        <h6>From Inputs</h6>
        <ColorInput v-for="(input, index) in inputs" :key="index" :input="input" :index="index"></ColorInput>
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
      colors: 'palette/colors',
      inputs: 'palette/rawInputs',
      scale: 'palette/scale'
    })
  },
  methods: {
    ...mapMutations({
      randomize: 'palette/randomize',
      addColor: 'palette/addColor'
    })
  }
}
</script>
