// Grid has many Spectrums
// Spectrum has many Colors
// Color has many objects

// Going from RGB to LCH and back again
// Observer= 2°, Illuminant= D65

clutch.factory('Grid', ['Spectrum', function(Spectrum) {

  var defaults = {
    x: 12,
    y: 10,
    l: 0
  }

  return {

    create: function(x) {
      var i, l, grid = []

      if (!x)
        x = defaults
      else
        x = _.defaults(x, defaults)

      l = 100 / x.y

      for (i = 0; i < x.y; i++) {
        grid.push( Spectrum.create({
          x: x.x,
          l: 100 - (l * i + x.l)
        }))
      }

      return grid
    }

  }

}])
