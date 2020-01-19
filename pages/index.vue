<template>
  <i-layout>
    <i-layout-header>
      Header
    </i-layout-header>

    <i-layout vertical>
      <i-layout-aside>
        <p>Background Color: {{ bg }}</p>
        <i-button @click="randomize">Randomize</i-button>
      </i-layout-aside>

      <i-layout-content v-bind:style="{ backgroundColor: bg }">
        <div>
          <logo />
          <h1>clutch</h1>
          <h2>color palette generator</h2>
        </div>
      </i-layout-content>
    </i-layout>

    <i-layout-footer>
      Footer
    </i-layout-footer>
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
