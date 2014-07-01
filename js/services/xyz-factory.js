clutch.factory('XYZ', function(){

  var refX =  95.047
  var refY = 100.000
  var refZ = 108.883

  return {
    toRGB: function(xyz) {
      function compute(x) {
        if ( x > 0.0031308 )
          x = 1.055 * Math.pow(x, 1/2.4) - 0.055
        else
          x = 12.92 * x
        return Math.round( x * 255 )
      }

      var x = xyz.x / 100        //X from 0 to  95.047
      var y = xyz.y / 100        //Y from 0 to 100.000
      var z = xyz.z / 100        //Z from 0 to 108.883

      var r = x *  3.2406 + y * -1.5372 + z * -0.4986
      var g = x * -0.9689 + y *  1.8758 + z *  0.0415
      var b = x *  0.0557 + y * -0.2040 + z *  1.0570

      return {
        r: Math.min(255, Math.max(0, compute(r))),
        g: Math.min(255, Math.max(0, compute(g))),
        b: Math.min(255, Math.max(0, compute(b)))
      }
    },

    toLAB: function(xyz) {
      function prep(x) {
        if ( x > 0.008856 )
          return Math.pow(x, 1/3)
        else
          return ( 7.787 * x ) + ( 16 / 116 )
      }

      var x = prep(xyz.x / refX)
      var y = prep(xyz.y / refY)
      var z = prep(xyz.z / refZ)

      return {
        l: ( 116 * y ) - 16,
        a: 500 * ( x - y ),
        b: 200 * ( y - z )
      }
    }
  }
})
