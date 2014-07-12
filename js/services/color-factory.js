// Grid has many Spectrums
// Spectrum has many Colors
// Color has many objects
clutch.factory('Color', ['RGB', 'XYZ', 'LAB', 'LCH', function(rgb, xyz, lab, lch) {

  return {

    rgb: function(input) {
      var color = {}
      if (!input) throw new Error('Give me an rgb object.')

      color.rgb = input
      color.hex = rgb.toHEX(color.rgb)
      color.lch = lab.toLCH(xyz.toLAB(rgb.toXYZ(color.rgb)))
      color.styles = {
        fg: { color: color.hex },
        bg: { background: color.hex }
      }

      return color
    },

    lch: function(input) {
      var color = {}
      if (!input) throw new Error('Give me an lch object.')

      color.lch = input
      color.rgb = xyz.toRGB(lab.toXYZ(lch.toLAB(color.lch)))
      color.hex = rgb.toHEX(color.rgb)
      color.styles = {
        fg: { color: color.hex },
        bg: { background: color.hex }
      }

      return color
    }

  }

}])
