<template>
  <div>
    <BG :color="bg"></BG>
    <div class="ui grid grid--heading">
      <h1 class="ui h1">Palette</h1>
      <button class="ui small x-100" title="Add Input" @click="addInput">Add Palette</button>
    </div>
    <template v-for="(input, index) in rawInputs">
      <PaletteInput :key="`input-${input.id}`" :input="input" :index="index"></PaletteInput>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import BG from '~/components/BG'
import PaletteInput from '~/components/PaletteInput'

export default {
  components: { BG, PaletteInput },
  computed: {
    ...mapGetters({
      bg: 'bg/bg',
      rawInputs: 'palette/rawInputs',
      fromInputs: 'palette/fromInputs',
      scale: 'palette/scale'
    })
  },
  methods: {
    ...mapMutations({
      randomize: 'palette/randomize',
      addInput: 'palette/addInput'
    })
  }
}
</script>

<style lang="scss">
.grid--heading {
  margin-top: 32px;
  grid-template-columns: repeat(8, 1fr);
}

.grid--heading h1 {
  font-size: 18px;
  line-height: 24px;
  font-weight: 400;
  grid-column: 1 / 6;
}

.grid--heading button {
  grid-column: 6 / 9;
}
</style>
