clutch.factory('LAB', function(){

  var refX =  95.047
  var refY = 100.000
  var refZ = 108.883

  return {

    toXYZ: function(lab) {
      function compute(x) {
        x = (Math.pow(x, 3) > 0.008856) ? Math.pow(x, 3) : (x - 16/116) / 7.787;
        return x
      }

      var y = ( lab.l + 16 ) / 116
      var x = lab.a / 500 + y
      var z = y - lab.b / 200

      return {
        x: (refX * compute(x)).toFixed(3),
        y: (refY * compute(y)).toFixed(3),
        z: (refZ * compute(z)).toFixed(3)
      }
    },

    toLCH: function(lab) {
      var h = Math.atan2(lab.b, lab.a)
      if ( h > 0 )
        h = ( h / Math.PI ) * 180
      else
        h = 360 - ( Math.abs( h ) / Math.PI ) * 180

      return {
        l: Math.round( lab.l ),
        c: Math.round( Math.sqrt( Math.pow(lab.a, 2) + Math.pow(lab.b, 2) )),
        h: Math.round( h )
      }
    }

  }
})
