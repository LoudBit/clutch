<template>
  <i-layout v-bind:style="{ backgroundColor: bg }" vertical>
    <i-layout-aside>
      <Palette></Palette>
    </i-layout-aside>
    <i-layout-content> </i-layout-content>
  </i-layout>
</template>

<script>
import Palette from '~/components/Palette.vue'

export default {
  components: {
    Palette
  },
  computed: {
    bg() {
      return this.$store.state.palette.background.hex
    }
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
