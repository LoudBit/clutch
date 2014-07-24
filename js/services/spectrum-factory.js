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
