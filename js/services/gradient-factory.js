clutch.factory('Gradients', ['Color', function(Color) {

  function createGradients(color) {
    return {
      lch: createLChGradients(color),
      rgb: createRGBGradients(color)
    }
  }

  return {
    create: createGradients
  }

  // ---

  function createLChGradients(color) {
    function createHue (i) {
      return Color.lch({
        l: color.lch.l,
        c: color.lch.c,
        h: i === 0 ? 0 : (360 / 12 * i)
      })
    }

    function createHueString(color, i) {
      return [', ', color.hex, ' ', color.lch.h === 0 ? 0 : (color.lch.h/360) * 100, '%'].join('')
    }

    var l = [
      Color.lch({ l: 0, c: color.lch.c, h: color.lch.h }),
      color,
      Color.lch({ l: 100, c: color.lch.c, h: color.lch.h })
    ]

    var c = [
      Color.lch({ l: color.lch.l, c: 0, h: color.lch.h }),
      Color.lch({ l: color.lch.l, c: 50, h: color.lch.h }),
      Color.lch({ l: color.lch.l, c: 100, h: color.lch.h })
    ]

    var h = [
      'linear-gradient(to right',
      _.map(_.times(12, createHue), createHueString).join(''),
      ')'
    ]

    return {
      l: {
        'background-image': [
          'linear-gradient(to right,',
          l[0].hex, ' 0%, ',
          l[1].hex, ' ', l[1].lch.l, '%, ',
          l[2].hex, ' 100%)'
        ].join('')
      },
      c: {
        'background-image': [
          'linear-gradient(to right,',
          c[0].hex, ' 0%, ',
          c[1].hex, ' ', c[1].lch.l, '%, ',
          c[2].hex, ' 100%)'
        ].join('')
      },
      h: { 'background-image': h.join('') }
    }
  }

  function createRGBGradients(color) {
    var r = [
      Color.rgb({ r: 0, g: color.rgb.g, b: color.rgb.b }),
      Color.rgb({ r: 127, g: color.rgb.g, b: color.rgb.b }),
      Color.rgb({ r: 255, g: color.rgb.g, b: color.rgb.b }),
    ]

    var g = [
      Color.rgb({ r: color.rgb.r, g: 0, b: color.rgb.b }),
      Color.rgb({ r: color.rgb.r, g: 127, b: color.rgb.b }),
      Color.rgb({ r: color.rgb.r, g: 255, b: color.rgb.b }),
    ]

    var b = [
      Color.rgb({ r: color.rgb.r, g: color.rgb.g, b: 0 }),
      Color.rgb({ r: color.rgb.r, g: color.rgb.g, b: 127 }),
      Color.rgb({ r: color.rgb.r, g: color.rgb.g, b: 255 }),
    ]

    function parseGardient(x) {
      return {
        'background-image': [
          'linear-gradient(to right,',
          x[0].hex, ' 0%, ',
          x[1].hex, ' 50%, ',
          x[2].hex, ' 100%)'
        ].join('')
      }
    }

    return {
      r: parseGardient(r),
      g: parseGardient(g),
      b: parseGardient(b)
    }
  }

}])
