<template>
  <main class="ui layout row" :style="{ backgroundColor: bg }">
    <div class="ui layout aside">
      <Palette></Palette>
    </div>
    <div class="ui layout content">
      <div class="color-wrapper">
        <ColorDot v-for="(color, index) in colors" :key="index" :color="color"></ColorDot>
      </div>
    </div>
  </main>
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
      colors: 'palette/fromInputs'
    })
  }
}
</script>

<style lang="scss">
.ui.layout {
  min-height: 100vh;
  max-height: 100vh;
}

.ui.layout.aside {
  background: rgba(#292929, 0.8);
  background-image: url('~assets/img/aside-bg.png');
  color: #d0d0d0;
  max-width: 320px;
  z-index: 1;
  padding: 8px;
  overflow-y: auto;
}

.ui.layout.content {
  flex-grow: 1;
}

.color-wrapper {
  position: relative;
  padding: 32px;
  height: 100%;
  width: 100%;
}
</style>
