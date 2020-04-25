import Color from '~/lib/color'
import Scale from '~/lib/scale'

export const state = () => ({
  background: Color.random(),
  colors: [],
  scale: {
    type: 'scale',
    start: Color.fromHex('#000000'),
    stop: Color.fromHex('#ffffff'),
    steps: 2,
    space: 'lch'
  }
})

export const getters = {
  bg(state) {
    return state.background
  },
  colors(state) {
    const colours = state.colors.map((color) => {
      const pad = 1 + color.lch.c / 50
      const margin = ' ' + pad * -1 + 'em'
      color.style = {
        background: color.hex,
        bottom: `${color.lch.l}%`,
        left: `${(color.lch.h / 360) * 100}%`,
        padding: `${1 + color.lch.c / 50}em`,
        margin: '0 0' + margin + margin
      }
      return color
    })
    return colours
  },
  // TODO: move this
  scale(state) {
    return Scale(state.scale)
  }
}

export const mutations = {
  randomize(state) {
    state.background = Color.random()
  },
  updateBG(state, bg) {
    state.background = bg
  },
  updateColor(state, { color, index }) {
    state.colors = [...state.colors.slice(0, index), color, ...state.colors.slice(index + 1)]
  },
  addColor(state) {
    state.colors = [...state.colors, Color.random()]
  },
  removeColor(state, ndx) {
    state.colors.splice(ndx, 1)
  }
}
