import RGB from './rgb.js'
import XYZ from './xyz.js'
import LAB from './lab.js'
import LCH from './lch.js'

const rgb = (input) => {
  const color = {}
  if (!input) throw new Error('Give me an rgb object.')

  color.rgb = input
  color.hex = RGB.toHEX(color.rgb)
  color.lch = LAB.toLCH(XYZ.toLAB(RGB.toXYZ(color.rgb)))
  return color
}

const lch = (input) => {
  const color = {}
  if (!input) throw new Error('Give me an lch object.')

  color.lch = input
  color.rgb = XYZ.toRGB(LAB.toXYZ(LCH.toLAB(color.lch)))
  color.hex = RGB.toHEX(color.rgb)
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
  lch
}
