import chroma from 'chroma-js'
import Color from '~/lib/color'

function Input() {
  return {
    type: 'scale',
    colors: [chroma.random().hex(), chroma.random().hex()],
    steps: 3,
    mode: 'lch'
  }
}

export const state = () => ({
  // TODO: use chroma instead of my color lib
  background: Color.random(),
  inputs: [new Input()],
  colors: []
})

export const getters = {
  bg(state) {
    return state.background
  },

  rawInputs(state) {
    return state.inputs
  },

  fromInputs(state) {
    console.info('💁 fromInputs')
    const colours = []
    state.inputs.forEach((input) => {
      if (input.type === 'color') {
        // const color = Color[input.from](input.value)
        // applyUiStyles(color)
        // colours.push(color)
      } else if (input.type === 'scale') {
        const scale = chroma
          .scale(input.colors)
          .mode(input.mode)
          .colors(input.steps, null)
        // const scale = chroma.scale(input.colors).classes(input.steps)
        colours.push(...scale)
      }
    })
    return colours
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
  },

  updateInput(state, { input, index }) {
    const newInput = { ...state.inputs[index], ...input }
    state.inputs = [...state.inputs.slice(0, index), newInput, ...state.inputs.slice(index + 1)]
  },
  addInput(state) {
    state.inputs = [...state.inputs, new Input()]
  },
  removeInput(state, ndx) {
    state.inputs.splice(ndx, 1)
  }
}
