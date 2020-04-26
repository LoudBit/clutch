import RGB from './rgb.js'
import XYZ from './xyz.js'
import LAB from './lab.js'
import LCH from './lch.js'

const fromRGB = (input) => {
  const color = {}
  if (!input) throw new Error('Give me an RGB object.')

  color.rgb = RGB.parse(input)
  color.hex = RGB.toHEX(color.rgb)
  color.lch = LAB.toLCH(XYZ.toLAB(RGB.toXYZ(color.rgb)))
  return color
}

const fromLCH = (input) => {
  const color = {}
  if (!input) throw new Error('Give me an LCH object.')

  color.lch = LCH.parse(input)
  color.rgb = XYZ.toRGB(LAB.toXYZ(LCH.toLAB(color.lch)))
  color.hex = RGB.toHEX(color.rgb)
  return color
}

const fromHex = (input) => {
  const cssRx = /^#?([a-f0-9]{6})$/i
  const match = input.match(cssRx)

  if (!match) {
    return
  }

  const color = fromRGB({
    r: parseInt(match[1].substr(0, 2), 16),
    g: parseInt(match[1].substr(2, 2), 16),
    b: parseInt(match[1].substr(4, 2), 16)
  })
  return color
}

const toJSON = () => {
  console.info('💁 toJSON')
}

export default {
  random: () => {
    return fromRGB({
      r: Math.floor(Math.random() * Math.floor(256)),
      g: Math.floor(Math.random() * Math.floor(256)),
      b: Math.floor(Math.random() * Math.floor(256))
    })
  },
  fromRGB,
  fromLCH,
  fromHex,
  toJSON
}
