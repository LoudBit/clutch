clutch.factory('LCH', function(){
  return {
    toLAB: function(lch) {
      // parsing here to prevent over-aggressive model updates
      lch = {
        l: parseFloat(lch.l),
        c: parseFloat(lch.c),
        h: parseFloat(lch.h)
      }

      var h = lch.h * (Math.PI/180)
      return {
        l: lch.l,
        a: Math.cos( h ) * lch.c,
        b: Math.sin( h ) * lch.c
      }
    }
  }
})
