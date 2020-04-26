<template>
  <i-container>
    <i-row>
      <i-column>
        <h6>Background Color</h6>
        <BG :color="bg"></BG>
        <i-button size="sm" variant="dark" @click="randomize">Randomize</i-button>
      </i-column>
    </i-row>

    <!--
    <i-row>
      <i-column>
        <h6>Colors</h6>
        <i-button size="sm" variant="dark" @click="addColor">Add Color</i-button>
        <Color v-for="(color, index) in colors" :key="index" :color="color" :index="index"></Color>
      </i-column>
    </i-row>
    -->

    <i-row>
      <i-column>
        <h6>From Inputs</h6>
        <ColorInput v-for="(color, index) in inputs" :key="index" :color="color" :index="index"></ColorInput>
      </i-column>
    </i-row>
  </i-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import BG from '~/components/BG'
// import Color from '~/components/Color'
import ColorInput from '~/components/ColorInput'

export default {
  components: { BG, ColorInput },
  computed: {
    ...mapGetters({
      bg: 'palette/bg',
      colors: 'palette/colors',
      inputs: 'palette/fromInputs',
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
