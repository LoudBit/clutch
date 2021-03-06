import chroma from 'chroma-js'
import cloneDeep from 'lodash/cloneDeep'
import { v4 as uuidv4 } from 'uuid'

export function createColor(color) {
  return {
    id: color.id || uuidv4(),
    hex: color.hex(),
    rgb: color.rgb(),
    lch: color.lch()
  }
}

export function extract(color) {
  return {
    hex: color.hex(),
    rgb: color.rgb(),
    lch: color.lch()
  }
}

// TODO: add support to name inputs
// NOTE: the only way to ensure the integrity of the interface is to track the exact input values
function Input(options) {
  options = options || {}

  const colors =
    options.random === false
      ? [createColor(chroma.rgb(255, 0, 0)), createColor(chroma.rgb(0, 255, 0)), createColor(chroma.rgb(0, 0, 255))]
      : [createColor(chroma.random()), createColor(chroma.random())]

  const steps = options.random === false ? colors.length : Math.max(4, colors.length + 1)

  return {
    colors,
    hidden: options.hidden || false,
    id: uuidv4(),
    mode: options.mode || 'lch',
    steps,
    type: options.type || 'scale'
  }
}

export const state = () => ({
  inputs: [new Input({ random: false })]
})

export const getters = {
  colorById: (state) => (id) => {
    return state.colors.find((color) => color.id === id)
  },

  rawInputs(state) {
    return cloneDeep(state.inputs)
  },

  getInputById: (state) => (id) => {
    return state.inputs.find((input) => input.id === id)
  },

  getInputColorsById: (state) => (id) => {
    const input = state.inputs.find((input) => input.id === id)
    const colours = []
    if (input.type === 'scale' && !input.hidden) {
      const c = input.colors.map((color) => chroma.lch(color.lch))
      const scale = chroma
        .scale(c)
        .mode(input.mode)
        .colors(input.steps, null)
      colours.push(...scale)
    }
    return colours
  },

  fromInputs(state) {
    const colours = []
    state.inputs.forEach((input) => {
      if (input.type === 'scale' && !input.hidden) {
        const c = input.colors.map((color) => chroma.lch(color.lch))
        const scale = chroma
          .scale(c)
          .mode(input.mode)
          .colors(input.steps, null)
        colours.push(...scale)
      }
    })
    return colours
  }
}

// TODO: create actions for updating any of the attributes on an input
// TODO: convert actions to use IDs instead of indexes
export const actions = {
  updateColor({ commit }, data) {
    switch (data.mode) {
      case 'hex':
        if (data.value.length >= 6 && chroma.valid(data.value)) {
          const newColor = extract(chroma(data.value))
          commit('updateColor', { inputId: data.inputId, colorId: data.colorId, color: newColor })
        }
        break
      default:
        break
    }
  },
  // TODO: don't delete the last color
  removeColor({ commit, state }, data) {
    const input = cloneDeep(state.inputs[data.inputIndex])
    input.colors.splice(data.colorIndex, 1)
    commit('updateInput', { input, index: data.inputIndex })
  },
  updateLch({ commit }, data) {
    const color = chroma.lch(data.lch)

    if (chroma.valid(color)) {
      const def = {
        hex: color.hex(),
        lch: data.lch,
        rgb: color.rgb()
      }

      const colors = [...data.input.colors]
      colors[data.colorIndex] = { ...colors[data.colorIndex], ...def }
      const input = { colors }
      commit('updateInput', { input, index: data.inputIndex })
    }
  },
  updateRgb({ commit }, data) {
    const color = chroma.rgb(data.rgb)

    if (chroma.valid(color)) {
      const def = {
        hex: color.hex(),
        lch: color.lch(),
        rgb: data.rgb
      }
      const colors = [...data.input.colors]
      colors[data.colorIndex] = { ...colors[data.colorIndex], ...def }
      const input = { colors }
      commit('updateInput', { input, index: data.inputIndex })
    }
  }
}

// TODO: convert mutations to use IDs instead of indexes
// TODO: remove Input
export const mutations = {
  orderColors(state, { inputId, newColors }) {
    let inputIndex = NaN
    const oldInput = state.inputs.find((input, i) => {
      if (input.id === inputId) {
        inputIndex = i
        return true
      }
    })
    oldInput.colors = newColors
    state.inputs = [...state.inputs.slice(0, inputIndex), oldInput, ...state.inputs.slice(inputIndex + 1)]
  },
  updateColor(state, { inputId, colorId, color }) {
    let inputIndex = NaN
    let colorIndex = NaN
    const oldInput = state.inputs.find((input, i) => {
      if (input.id === inputId) {
        inputIndex = i
        return true
      }
    })
    const oldColor = oldInput.colors.find((color, j) => {
      if (color.id === colorId) {
        colorIndex = j
        return true
      }
    })
    const newColor = { ...oldColor, ...color }
    oldInput.colors = [...oldInput.colors.slice(0, colorIndex), newColor, ...oldInput.colors.slice(colorIndex + 1)]
    state.inputs = [...state.inputs.slice(0, inputIndex), oldInput, ...state.inputs.slice(inputIndex + 1)]
  },
  updateInput(state, { input, index, id }) {
    // TODO: clean up and always use IDs
    const newInput = { ...state.inputs[index], ...input }
    state.inputs = [...state.inputs.slice(0, index), newInput, ...state.inputs.slice(index + 1)]
  },
  addInput(state) {
    state.inputs = [...state.inputs, new Input()]
  },
  removeInput(state, { index }) {
    state.inputs.splice(index, 1)
  }
}
