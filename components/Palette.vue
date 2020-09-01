<template>
  <div>
    <BG :color="bg"></BG>

    <div class="heading-grid">
      <div class="grid-area-label">
        <h1 class="ui h1">Palette</h1>
      </div>
      <div class="grid-area-button">
        <button class="ui small x-100" title="Add Input" @click="addInput">Add</button>
      </div>
    </div>

    <div class="ui row">
      <div class="ui column">
        <template v-for="(input, index) in rawInputs">
          <PaletteInput :key="`input-${input.id}`" :input="input" :index="index"></PaletteInput>
        </template>
      </div>
    </div>

    <div class="ui row">
      <div class="ui column">
        <!-- IDEA: This could be a table [ swatch | hex | is an input ] -->
        <h1>Colors</h1>
        <div v-for="(color, index) in fromInputs" :key="index">
          {{ color }}
        </div>
      </div>
    </div>
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
      bg: 'palette/bg',
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
.heading-grid {
  margin-top: 32px;
  display: grid;
  gap: 8px 8px;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: auto;
  grid-template-areas: 'label label label label label label button button';
}

.heading-grid h1 {
  font-size: 18px;
  line-height: 24px;
  font-weight: 400;
}
</style>
