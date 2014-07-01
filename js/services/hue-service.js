clutch.factory('Hue', function(){
  'use strict';

  var phi = 1.6180339888

  function round(x) {
    return x
    // return Number(parseFloat(x).toFixed(3))
  }

  // creates a scale of light, medium, dark color, and light medium dark shades of those
  function scale(offsets, full) {
    var o     = (offsets && offsets.l) || 0,
    // var o = 0,
        max = 50*2 + o,
        range = [],
        lightness

    // mid tones
    range.push( round(50 + o) )

    _.times(7, function(i){
      if (full && !i) return;
      if (!full && i % 2 < 1 ) return;
      lightness = max

      _.times(i+1, function(){
        lightness = lightness/phi
      })

      range.push(round(max - lightness))
      range.unshift(round(lightness))
    })

    range.push(100)
    range.unshift(0)

    return range
  }

  var Hue = {

    lightness: scale(),

    scale: scale,

    parse: function(color) {
      var lch = chroma.css(color).lch()
      return {
        l: round(lch[0]),
        c: round(lch[1]),
        h: round(lch[2])
      }
    },

    round: round,

    toObj: function(lch) {
      lch = lch || { l:0, c:0, h:0 }
      lch.l = round(lch.l)
      lch.c = round(lch.c)
      lch.h = round(lch.h)
      lch.name = lch.name || lch.h
      return lch
    },

    build: function(lch, offsets) {
      var range = []
      _.forEachRight(scale(offsets), function(l){
        range.push( chroma.lch(l, lch.c, lch.h).hex() )
      })
      return range
    },

    create: function(lch, offsets) {
      lch = this.toObj(lch)
      lch.scale = this.build(lch, offsets)
      return lch
    }

  }

  return Hue

})
