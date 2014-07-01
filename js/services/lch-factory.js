clutch.factory('LCH', function(){
  return {
    toLAB: function(lch) {
      var h = lch.h * (Math.PI/180)
      return {
        l: lch.l,
        a: Math.cos( h ) * lch.c,
        b: Math.sin( h ) * lch.c
      }
    }
  }
})
