<template>
  <i-layout v-bind:style="{ backgroundColor: bg.hex }" vertical>
    <i-layout-aside>
      <Palette></Palette>
    </i-layout-aside>
    <i-layout-content>
      <div v-for="(color, index) in colors" v-bind:key="index" class="color">
        <code>{{ color.hex }}</code>
      </div>
    </i-layout-content>
  </i-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import Palette from '~/components/Palette.vue'

export default {
  components: {
    Palette
  },
  computed: mapGetters({
    bg: 'palette/bg',
    colors: 'palette/colors'
  })
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

.color {
  position: absolute;
}
</style>
