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
        <h1>Scale</h1>
        <div v-for="(color, index) in scale" :key="index" :color="color" :index="index">
          {{ color.hex }}
          {{ color.lch.l }}, {{ color.lch.c }}, {{ color.lch.h }}
        </div>
      </i-column>
    </i-row>

    <i-row>
      <i-column>
        <h6>Colors</h6>
        <i-button size="sm" variant="dark" @click="addColor">Add Color</i-button>
        <Color v-for="(color, index) in colors" :key="index" :color="color" :index="index"></Color>
      </i-column>
    </i-row>
  </i-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import BG from '~/components/BG'
import Color from '~/components/Color'

export default {
  components: { BG, Color },
  computed: {
    ...mapGetters({
      bg: 'palette/bg',
      colors: 'palette/colors',
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
