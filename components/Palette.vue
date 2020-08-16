<template>
  <div>
    <BG :color="bg"></BG>

    <div class="heading-grid">
      <h1 class="ui h1 grid-area-label">Palette</h1>
      <button class="ui button grid-area-button" title="Add Input" @click="addInput">Add</button>
    </div>

    <div class="ui row">
      <div class="ui column">
        <template v-for="(input, index) in rawInputs">
          <PaletteInput :key="`input-${input.id}`" :input="input" :index="index"></PaletteInput>
          <ColorInput
            v-for="(color, i) in input.colors"
            :key="`color-${color.id}`"
            :color-id="color.id"
            :input-index="index"
            :color-index="i"
            :input="input"
          ></ColorInput>
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
import ColorInput from '~/components/ColorInput'

export default {
  components: { BG, PaletteInput, ColorInput },
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
