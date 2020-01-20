<template>
  <div>
    <h1>Background Color</h1>
    <Color v-bind:color="bg"></Color>
    <i-button @click="randomize" size="sm" variant="dark">Randomize</i-button>
    <ul>
      <li>
        <code>{{ bg.hex }}</code>
      </li>
    </ul>

    <h2>Colors</h2>
    <i-button @click="addColor" size="sm" variant="dark">Add Color</i-button>
    <ol>
      <li v-for="(color, index) in colors" v-bind:key="index">
        <code>{{ color.hex }}</code>
      </li>
    </ol>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Color from '~/components/Color'

export default {
  components: { Color },
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
