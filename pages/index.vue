<template>
  <i-layout :style="{ backgroundColor: bg }" vertical>
    <i-layout-aside>
      <Palette></Palette>
    </i-layout-aside>
    <i-layout-content>
      <div class="color-wrapper">
        <ColorDot v-for="(color, index) in colors" :key="index" :color="color"></ColorDot>
      </div>
    </i-layout-content>
  </i-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import ColorDot from '~/components/ColorDot.vue'
import Palette from '~/components/Palette.vue'

export default {
  components: {
    ColorDot,
    Palette
  },
  computed: {
    ...mapGetters({
      bg: 'palette/bg',
      // colors: 'palette/colors'
      colors: 'palette/fromInputs'
    })
  }
}
</script>

<style lang="scss">
#__layout,
#__layout > main {
  min-height: 100vh;
  max-height: 100vh;
}

.layout-aside {
  z-index: 1;
}

.layout-aside-children {
  background: rgba(#292929, 0.8);
  color: #d0d0d0;
  overflow-y: auto;
  max-width: 320px;
}

.layout-aside-children input {
  background: rgba(#121212, 0.2);
  border: 1px solid rgba(#121212, 0.8);
  border-radius: 2px;
  color: #d0d0d0;
  width: 100%;
  padding: 4px 8px;
  font-size: 14px;
}

.row {
  margin-top: 8px;
  margin-bottom: 8px;
}
.col,
.column {
  padding-left: 8px;
  padding-right: 8px;
}

.color-wrapper {
  position: relative;
  height: 100%;
}
</style>
