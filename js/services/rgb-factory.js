clutch.factory('RGB', function(){

  function hex(str) {
    str = str.toString(16)
    if (str.length === 1) str = '0'+str
    return str
  }

  return {
    // RGB -> XYZ
    // 255, 0, 0, => 41.240, 21.260, 1.930
    toXYZ: function(rgb) {
      function prep(x) {
        x = x / 255
        if ( x > 0.04045 )
          x = Math.pow((x + 0.055) / 1.055, 2.4 )
        else
          x = x / 12.92
        return x * 100
      }

      var r = prep(rgb.r)
      var g = prep(rgb.g)
      var b = prep(rgb.b)

      return {
        x: (r * 0.4124 + g * 0.3576 + b * 0.1805).toFixed(3),
        y: (r * 0.2126 + g * 0.7152 + b * 0.0722).toFixed(3),
        z: (r * 0.0193 + g * 0.1192 + b * 0.9505).toFixed(3)
      }
    },

    toHEX: function(rgb) {
      return '#' + hex(rgb.r) + hex(rgb.g) + hex(rgb.b)
    }

  }
})
