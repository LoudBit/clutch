import chroma from 'chroma-js'
import Color from '~/lib/color'
import stylize from '~/lib/color/stylize'

// TODO: add support to name inputs
function Input() {
  return {
    type: 'scale',
    colors: [chroma.random().hex(), chroma.random().hex()],
    steps: 3,
    mode: 'lch',
    hidden: false
  }
}

export const state = () => ({
  background: chroma.random().hex(),
  inputs: [new Input()], // NOTE: proper default
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
    const colours = []
    state.inputs.forEach((input) => {
      if (input.type === 'scale' && !input.hidden) {
        const scale = chroma
          .scale(input.colors)
          .mode(input.mode)
          .colors(input.steps, null)
        colours.push(...scale)
      }
    })
    return colours
  },

  colors(state) {
    return state.colors.map((color) => stylize(color))
  }
}

export const mutations = {
  randomize(state) {
    state.background = chroma.random()
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
