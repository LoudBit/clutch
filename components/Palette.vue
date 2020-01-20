<template>
  <i-container>
    <i-row>
      <i-column>
        <h1>Background Color</h1>
        <BG v-bind:color="bg"></BG>
        <i-button @click="randomize" size="sm" variant="dark"
          >Randomize</i-button
        >
      </i-column>
    </i-row>
    <i-row>
      <i-column>
        <h2>Colors</h2>
        <i-button @click="addColor" size="sm" variant="dark"
          >Add Color</i-button
        >
        <Color
          v-for="(color, index) in colors"
          v-bind:key="index"
          v-bind:color="color"
          v-bind:index="index"
        ></Color>
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
      colors: 'palette/colors'
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
