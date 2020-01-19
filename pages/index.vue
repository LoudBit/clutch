<template>
  <i-layout v-bind:style="{ backgroundColor: bg }" vertical>
    <i-layout-aside>
      <p>Background Color: {{ bg }}</p>
      <i-button @click="randomize">Randomize</i-button>
    </i-layout-aside>
    <i-layout-content>
      <div>
        <logo />
        <h1>clutch</h1>
        <h2>color palette generator</h2>
      </div>
    </i-layout-content>
  </i-layout>
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

<style lang="scss">
#__layout,
#__layout > main {
  min-height: 100vh;
}

.layout-aside-children {
  background: rgba(#292929, 0.8);
  color: #d0d0d0;
}
</style>
