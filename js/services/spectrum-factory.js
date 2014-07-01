// Grid has many Spectrums
// Spectrum has many Colors
// Color has many objects

// Going from RGB to LCH and back again
// Observer= 2°, Illuminant= D65

clutch.factory('Spectrum', ['Color', function(color) {

  var defaults = {
    x: 12,
    l: 50,
    c: 50,
    h: 0
  }

  return {

    create: function(x) {
      var i
      var spectrum = []
      var hue

      x = x && _.defaults(x, defaults) || defaults
      hue = 360 / x.x

      for (i = 0; i < x.x; i++) {
        spectrum.push( color.lch({
          l: x.l,
          c: x.c,
          h: hue * i + x.h
        }))
      }

      return spectrum
    }

  }

}])
