const refX = 95.047
const refY = 100.0
const refZ = 108.883

export default {
  toXYZ: (lab) => {
    function compute(x) {
      x = x ** 3 > 0.008856 ? x ** 3 : (x - 16 / 116) / 7.787
      return x
    }

    const y = (lab.l + 16) / 116
    const x = lab.a / 500 + y
    const z = y - lab.b / 200

    return {
      x: (refX * compute(x)).toFixed(3),
      y: (refY * compute(y)).toFixed(3),
      z: (refZ * compute(z)).toFixed(3)
    }
  },
  toLCH: (lab) => {
    let h = Math.atan2(lab.b, lab.a)
    if (h > 0) h = (h / Math.PI) * 180
    else h = 360 - (Math.abs(h) / Math.PI) * 180

    return {
      l: lab.l.toFixed(3),
      c: Math.sqrt(lab.a ** 2 + lab.b ** 2).toFixed(3),
      h: Math.round(h)
    }
  }
}
