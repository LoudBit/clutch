clutch.factory('Spectrum', ['Anchor', 'Color', function(Anchor, Color) {

  function stylize(color) {
    var styl = {
      bottom: color.lch.l + '%'
    }
    return styl
  }

  function createSpectrum(lch) {
    var i, hue, hueOffset, spectrum = []

    lch = lch && _.defaults(lch, defaults) || defaults
    hue = 360 / Spectrum.range
    hueOffset = lch.h % hue

    for (i = 0; i < Spectrum.range; i++) {
      spectrum.push(Color.lch({
        l: lch.l,
        c: lch.c,
        h: hue * i + hueOffset
      }))
    }

    return spectrum
  }

  // necessary because I'm using an input[type="number"] on the front end, and this is easier than a getter/setter
  function setRange() {
    var _range = parseInt(Spectrum.range, 10)
    if (isNaN(_range)) { _range = 12 }
    if (_range < 1) { _range = 1 }
    if (_range > 16) {_range = 16}
    Spectrum.range = _range
  }

  var defaults = {
    l: 50,
    c: 50,
    h: 0
  }

  var Spectrum = {
    range: 12,
    colors: [],
    create: createSpectrum,
    update: function() {
      setRange()
      Anchor.updateLch()
      Spectrum.colors = createSpectrum(Anchor.color.lch)
      Spectrum.styles = stylize(Spectrum.colors[0])
    },
    styles: {
      spectrum: {},
      color: {}
    }
  }

  Spectrum.colors = createSpectrum(Anchor.color.lch)
  Spectrum.styles = stylize(Anchor.color)

  return Spectrum

}])
