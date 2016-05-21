clutch.factory('Anchor', ['Color', function(Color) {

  // This could be performance intensive.
  // Be sure to test the performance impact during development.
  // Should be extracted to a factory once it's ready.
  function createGradients(color) {
    var l = [
      Color.lch({
        l: 0,
        c: color.lch.c,
        h: color.lch.h
      }),
      color,
      Color.lch({
        l: 100,
        c: color.lch.c,
        h: color.lch.h
      })
    ];

    var c = [
      Color.lch({
        l: color.lch.l,
        c: 0,
        h: color.lch.h
      }),
      color,
      Color.lch({
        l: color.lch.l,
        c: 100,
        h: color.lch.h
      })
    ];

    var hi = []
    for (var i = 0; i < 13; i++) {
      hi.push(Color.lch({
        l: color.lch.l,
        c: color.lch.c,
        h: i === 0 ? 0 : (360 / 12 * i)
      }))
    }
    console.log(hi);
    var h = ['linear-gradient(to right']
    for (var j = 0; j < hi.length; j++) {
      h.push(', ', hi[j].hex, ' ', hi[j].lch.h === 0 ? 0 : (hi[j].lch.h/360) * 100, '%')
    }
    h.push(')')

    console.log('h', h, h.join(''))

    var gradients = {
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
    console.log(gradients);
    return gradients;
  }

  function stylize(color) {
    var pad = 1 + color.lch.c/50
    var margin = ' ' + (pad * -1) + 'em'
    var styl = {
      background: color.hex,
      bottom:     color.lch.l + '%',
      left:       (color.lch.h/360*100) + '%',
      padding:    pad + 'em',
      margin:     '0 0' + margin + margin
    }
    return styl
  }

  var initialColor = Color.lch({
    l: Math.round( Math.random() * 100 ),
    c: Math.round( Math.random() * 100 ),
    h: Math.round( Math.random() * 360 )
  })

  // Anchor
  var Anchor = {

    color: initialColor,

    updateLch: function(newLch) {
      Anchor.color = Color.lch(_.extend(Anchor.color.lch, newLch))
      Anchor.styles = stylize(Anchor.color)
      Anchor.gradients = createGradients(Anchor.color)
    },

    updateRGB: function(newRGB) {
      Anchor.color = Color.rgb(_.extend(Anchor.color.rgb, newRGB))
      Anchor.styles = stylize(Anchor.color)
      Anchor.gradients = createGradients(Anchor.color)
    },

    updateHex: function(newHex) {
      var cssRx = /^\#?([a-f0-9]{6})$/i
      var match = newHex.match(cssRx)
      if (match) {
        this.updateRGB({
          r: parseInt(match[1].substr(0,2), 16),
          g: parseInt(match[1].substr(2,2), 16),
          b: parseInt(match[1].substr(4,2), 16)
        })
      }
    },

    styles: stylize(initialColor)

  }

  return Anchor

}])
