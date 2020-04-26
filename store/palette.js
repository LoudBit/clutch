import Color from '~/lib/color'
import Scale from '~/lib/scale'

function applyUiStyles(color) {
  const pad = 1 + color.lch.c / 50
  const margin = ' ' + pad * -1 + 'em'
  color.style = {
    background: color.hex,
    bottom: `${Math.abs(color.lch.l).toFixed(4)}%`,
    left: `${Math.abs((color.lch.h / 360) * 100).toFixed(3)}%`,
    padding: `${Math.abs(1 + color.lch.c / 50).toFixed(3)}em`,
    margin: '0 0' + margin + margin
  }
  return color
}

export const state = () => ({
  background: Color.random(),
  inputs: [
    { type: 'color', from: 'fromHex', value: '#000000' },
    {
      type: 'scale',
      start: { type: 'color', from: 'fromHex', value: '#003366' },
      stop: { type: 'color', from: 'fromHex', value: '#336699' },
      steps: 3,
      space: 'lch'
    },
    { type: 'color', from: 'fromHex', value: '#ffffff' }
  ],
  colors: []
})

export const getters = {
  bg(state) {
    return state.background
  },
  fromInputs(state) {
    const colours = []
    state.inputs.forEach((input) => {
      if (input.type === 'color') {
        const color = Color[input.from](input.value)
        applyUiStyles(color)
        colours.push(color)
      } else if (input.type === 'scale') {
        const config = {
          type: 'scale',
          start: Color[input.start.from](input.start.value),
          stop: Color[input.stop.from](input.stop.value),
          steps: input.steps,
          space: input.space
        }

        let scale = Scale(config)
        scale = scale.map((color) => applyUiStyles(color))
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
  },

  updateInput(state, { input, index }) {
    state.inputs = [...state.inputs.slice(0, index), input, ...state.inputs.slice(index + 1)]
  },
  addInput(state) {
    // state.inputs = [...state.inputs, Color.random()]
  },
  removeInput(state, ndx) {
    state.inputs.splice(ndx, 1)
  }
}
