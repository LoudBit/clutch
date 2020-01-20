import Color from '@/lib/color/index'

export const state = () => ({
  background: Color.random()
})

export const mutations = {
  randomize(state) {
    state.background = Color.random()
  }
}
