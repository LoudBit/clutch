// Grid has many Spectrums
// Spectrum has many Colors
// Color has many objects
clutch.factory('Color', ['RGB', 'XYZ', 'LAB', 'LCH', function(rgb, xyz, lab, lch) {

  function background(color) {
    var pad = 1 + color.lch.c/50
    var margin = ' ' + (pad * -1) + 'em'
    var styl = {
      background: color.hex,
      bottom:     color.lch.l + '%',
      left:       (color.lch.h/360*100) + '%',
      padding:    pad + 'em',
      margin:     '0 0' + margin + margin
    }
    return styl
  }

  return {

    rgb: function(input) {
      var color = {}
      if (!input) throw new Error('Give me an rgb object.')

      color.rgb = input
      color.hex = rgb.toHEX(color.rgb)
      color.lch = lab.toLCH(xyz.toLAB(rgb.toXYZ(color.rgb)))
      color.styles = {
        fg: { color: color.hex },
        bg: background(color)
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
        bg: background(color)
      }

      return color
    }

  }

}])
