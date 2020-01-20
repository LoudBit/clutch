import RGB from './rgb.js'
import XYZ from './xyz.js'
import LAB from './lab.js'
import LCH from './lch.js'

// TODO: rename: fromRGB
const rgb = (input) => {
  const color = {}
  if (!input) throw new Error('Give me an RGB object.')

  color.rgb = input
  color.hex = RGB.toHEX(color.rgb)
  color.lch = LAB.toLCH(XYZ.toLAB(RGB.toXYZ(color.rgb)))
  return color
}

// TODO: rename: fromLCH
const lch = (input) => {
  const color = {}
  if (!input) throw new Error('Give me an LCH object.')

  color.lch = input
  color.rgb = XYZ.toRGB(LAB.toXYZ(LCH.toLAB(color.lch)))
  color.hex = RGB.toHEX(color.rgb)
  return color
}

const fromHex = (input) => {
  const cssRx = /^#?([a-f0-9]{6})$/i
  const match = input.match(cssRx)

  if (!match) {
    // eslint-disable-next-line no-console
    console.warn(`invalid hex: ${input}`)
    return
  }

  const color = rgb({
    r: parseInt(match[1].substr(0, 2), 16),
    g: parseInt(match[1].substr(2, 2), 16),
    b: parseInt(match[1].substr(4, 2), 16)
  })
  return color
}

export default {
  random: () => {
    return rgb({
      r: Math.floor(Math.random() * Math.floor(256)),
      g: Math.floor(Math.random() * Math.floor(256)),
      b: Math.floor(Math.random() * Math.floor(256))
    })
  },
  rgb,
  lch,
  fromHex
}
