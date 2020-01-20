import Color from '@/lib/color/index'

export const state = () => ({
  background: Color.random(),
  colors: []
})

export const getters = {
  bg(state) {
    return state.background
  },
  colors(state) {
    return state.colors
  }
}

export const mutations = {
  randomize(state) {
    state.background = Color.random()
  },
  addColor(state) {
    state.colors = [...state.colors, Color.random()]
  }
}
