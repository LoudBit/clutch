import Color from '~/lib/color'
import Scale from '~/lib/scale'

function applyUiStyles(color) {
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
}

export const state = () => ({
  background: Color.random(),
  inputs: [
    { type: 'color', from: 'fromHex', value: '#000000' },
    {
      type: 'scale',
      start: { type: 'color', from: 'fromHex', value: '#333333' },
      stop: { type: 'color', from: 'fromHex', value: '#999999' },
      steps: 1,
      space: 'rgb'
    },
    { type: 'color', from: 'fromHex', value: '#ffffff' }
  ],
  colors: [],
  scale: {
    type: 'scale',
    start: Color.fromHex('#333333'),
    stop: Color.fromHex('#999999'),
    steps: 1,
    space: 'rgb'
  }
})

export const getters = {
  bg(state) {
    return state.background
  },
  fromInputs(state) {
    const colours = []
    state.inputs.forEach((input) => {
      console.debug(`🔊 input:`, input)
      if (input.type === 'color') {
        console.info('💁 color!')
        const color = Color[input.from](input.value)
        applyUiStyles(color)
        colours.push(color)
      } else if (input.type === 'scale') {
        console.info('💁 scale!')
        console.debug(`🔊 input.start:`, input.start)
        const config = {
          type: 'scale',
          start: Color[input.start.from](input.start.value),
          stop: Color[input.stop.from](input.stop.value),
          steps: input.steps,
          space: input.space
        }

        const scale = Scale(config)
        console.debug(`🔊 scale:`, scale)
        scale.forEach((color) => {
          applyUiStyles(color)
        })
        colours.push(...scale)
      }
    })
    console.debug(`🔊 colours:`, colours)
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
  }
}
