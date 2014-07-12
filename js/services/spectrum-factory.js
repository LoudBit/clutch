clutch.factory('Spectrum', ['Color', function(color) {

  function createSpectrum(lch) {
    var i, hue, hueOffset, spectrum = []

    lch = lch && _.defaults(lch, defaults) || defaults
    hue = 360 / Spectrum.range

    hueOffset = lch.h % hue

    for (i = 0; i < Spectrum.range; i++) {
      spectrum.push( color.lch({
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
    update: function(lch) {
      Spectrum.colors = createSpectrum(lch)
    }
  }

  Spectrum.colors = createSpectrum()

  return Spectrum

}])
