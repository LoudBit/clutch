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
  }
}
