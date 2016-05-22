clutch.factory('Gradients', ['Color', function(Color) {

  // This could be performance intensive.
  // Be sure to test the performance impact during development.
  // Should be extracted to a factory once it's ready.
  function createGradients(color) {

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

    // --

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
      lch: {
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
        h: {
          'background-image': h.join('')
        }
      }
    }
  }

  return {
    create: createGradients
  }

}])
