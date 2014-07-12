clutch.factory('LCH', function(){
  return {
    toLAB: function(lch) {
      // doing the parseInt'ing here to prevent over-aggressive model updates
      lch = {
        l: parseInt(lch.l, 10),
        c: parseInt(lch.c, 10),
        h: parseInt(lch.h, 10)
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
