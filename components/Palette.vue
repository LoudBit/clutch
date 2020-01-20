<template>
  <div>
    <h1>Background Color</h1>
    <i-button @click="randomize">Randomize</i-button>
    <ul>
      <li>
        <code>{{ bg }}</code>
      </li>
    </ul>

    <h2>Colors</h2>
    <i-button @click="addColor">Add Color</i-button>
    <ol>
      <li v-for="(color, index) in colors" v-bind:key="index">
        <code>{{ color.hex }}</code>
      </li>
    </ol>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    bg() {
      return this.$store.state.palette.background.hex
    },
    colors() {
      return this.$store.state.palette.colors
    }
  },
  methods: {
    ...mapMutations({
      randomize: 'palette/randomize',
      addColor: 'palette/addColor'
    })
  }
}
</script>
