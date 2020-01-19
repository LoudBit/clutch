<template>
  <div v-bind:style="{ backgroundColor: bg }" class="container">
    <div>
      <logo />
      <h1 class="title">clutch</h1>
      <h2 class="subtitle">color palette generator</h2>
      <h2 class="subtitle">Background Color: {{ bg }}</h2>
      <i-button @click="randomize" variant="primary">Randomize</i-button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  computed: {
    bg() {
      return this.$store.state.palette.background.hex
    }
  },
  methods: {
    ...mapMutations({
      randomize: 'palette/randomize'
    })
  }
}
</script>
