<template>
  <i-layout v-bind:style="{ backgroundColor: bg.hex }" vertical>
    <i-layout-aside>
      <Palette></Palette>
    </i-layout-aside>
    <i-layout-content>
      <div class="color-wrapper">
        <div
          v-for="(color, index) in colors"
          v-bind:key="index"
          v-bind:style="color.style"
          class="color"
        ></div>
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

.color {
  box-sizing: border-box;
  height: 24px;
  width: 24px;
  border-radius: 96px;
  position: absolute;
}

.color code {
  background: transparent;
  color: #fff;
}
</style>
