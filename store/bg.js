import chroma from 'chroma-js'

export const state = () => ({
  background: chroma.random().hex()
})

export const getters = {
  bg(state) {
    return state.background
  }
}

export const actions = {}

export const mutations = {
  randomize(state) {
    state.background = chroma.random().hex()
  },
  update(state, bg) {
    state.background = bg
  }
}
