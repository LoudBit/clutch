const refX = 95.047
const refY = 100.0
const refZ = 108.883

export default {
  toRGB: (xyz) => {
    function compute(x) {
      if (x > 0.0031308) x = 1.055 * x ** (1 / 2.4) - 0.055
      else x = 12.92 * x
      return Math.round(x * 255)
    }

    const x = xyz.x / 100 // X from 0 to  95.047
    const y = xyz.y / 100 // Y from 0 to 100.000
    const z = xyz.z / 100 // Z from 0 to 108.883

    const r = x * 3.2406 + y * -1.5372 + z * -0.4986
    const g = x * -0.9689 + y * 1.8758 + z * 0.0415
    const b = x * 0.0557 + y * -0.204 + z * 1.057

    return {
      r: Math.min(255, Math.max(0, compute(r))),
      g: Math.min(255, Math.max(0, compute(g))),
      b: Math.min(255, Math.max(0, compute(b)))
    }
  },
  toLAB: (xyz) => {
    function prep(x) {
      if (x > 0.008856) return x ** (1 / 3)
      else return 7.787 * x + 16 / 116
    }

    const x = prep(xyz.x / refX)
    const y = prep(xyz.y / refY)
    const z = prep(xyz.z / refZ)

    return {
      l: 116 * y - 16,
      a: 500 * (x - y),
      b: 200 * (y - z)
    }
  }
}
