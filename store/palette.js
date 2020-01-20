import Color from '@/lib/color/index'

export const state = () => ({
  background: Color.random(),
  colors: []
})

export const mutations = {
  randomize(state) {
    state.background = Color.random()
  },
  addColor(state) {
    state.colors = [...state.colors, Color.random()]
  }
}
