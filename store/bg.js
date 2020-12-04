import chroma from 'chroma-js'

import { createColor } from '~/store/palette'

export const state = () => ({
  background: createColor(chroma.random())
})

export const getters = {
  bg(state) {
    return state.background
  }
}

export const actions = {}

export const mutations = {
  randomize(state) {
    state.background = createColor(chroma.random())
  },
  update(state, bg) {
    state.background = createColor(chroma(bg))
  },
  updateLch(state, lch) {
    state.background = createColor(chroma.lch(lch[0], lch[1], lch[2]))
  },
  updateRGB(state, rgb) {
    state.background = createColor(chroma.rgb(rgb[0], rgb[1], rgb[2]))
  }
}
