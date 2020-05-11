<template>
  <div class="ColorInput">
    <p>
      <small><b>Type:</b> {{ input.type }}</small>
      <br />
      <small><b>Colors:</b> {{ input.colors }}</small>
      <br />
      <small><b>Start:</b> {{ input.start }}</small>
      <br />
      <small><b>Stop:</b> {{ input.stop }}</small>
      <br />
      <small><b>Steps:</b> {{ input.steps }}</small>
      <br />
      <small><b>Mode:</b> {{ input.mode }}</small>
      <br />
    </p>
    <i-container>
      <i-row>
        <i-column>
          <small><b>Type:</b> {{ input.type }}</small>
        </i-column>
        <i-column>
          <i-button size="sm" @click="removeInput(index)">Remove</i-button>
        </i-column>
      </i-row>
      <i-row>
        <i-column>
          <small><b>Colors:</b> {{ input.colors }}</small>
        </i-column>
        <i-column> </i-column>
        <i-column> </i-column>
      </i-row>
      <i-row>
        <i-column>
          <input v-model.number="steps" type="number" min="2" max="32" step="1" />
        </i-column>
        <i-column>
          <small><b>Mode:</b> {{ input.mode }}</small>
          <i-select v-model="mode">
            <i-select-option value="rgb" label="RGB" />
            <i-select-option value="hsl" label="HSL" />
            <i-select-option value="lab" label="LAB" />
            <i-select-option value="lrgb" label="Linear RGB" />
            <i-select-option value="lch" label="LCh" />
          </i-select>
        </i-column>
      </i-row>
    </i-container>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    input: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    mode: {
      get() {
        return this.input.mode
      },
      set(mode) {
        const input = { mode }
        const index = this.index
        this.$store.commit('palette/updateInput', { input, index })
      }
    },
    steps: {
      get() {
        return this.input.steps
      },
      set(steps) {
        const input = { steps }
        const index = this.index
        this.$store.commit('palette/updateInput', { input, index })
      }
    }
  },
  methods: {
    ...mapMutations({
      removeInput: 'palette/removeInput'
    })
  }
}
</script>
