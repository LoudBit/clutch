function hex(str) {
  str = Number(str).toString(16)
  if (str.length === 1) str = '0' + str
  return str
}

export default {
  toXYZ: (rgb) => {
    function calculate(x) {
      x = x / 255
      x = x > 0.04045 ? ((x + 0.055) / 1.055) ** 2.4 : x / 12.92
      return x * 100
    }

    const r = calculate(rgb.r)
    const g = calculate(rgb.g)
    const b = calculate(rgb.b)

    return {
      x: (r * 0.4124 + g * 0.3576 + b * 0.1805).toFixed(3),
      y: (r * 0.2126 + g * 0.7152 + b * 0.0722).toFixed(3),
      z: (r * 0.0193 + g * 0.1192 + b * 0.9505).toFixed(3)
    }
  },
  toHEX: (rgb) => {
    return '#' + hex(rgb.r) + hex(rgb.g) + hex(rgb.b)
  }
}
