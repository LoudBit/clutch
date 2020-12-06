<template>
  <div>
    <BG></BG>
    <hr class="ui" />
    <div class="ui grid grid--heading">
      <h1 class="ui h1">Palette</h1>
      <button class="ui small x-100" title="Add Input" @click="addInput">Add Color Set</button>
    </div>
    <template v-for="(input, index) in rawInputs">
      <ColorSet :key="`input-${input.id}`" :input="input" :index="index"></ColorSet>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import BG from '~/components/BG'
import ColorSet from '~/components/ColorSet'

export default {
  components: { BG, ColorSet },
  computed: {
    ...mapGetters({
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
