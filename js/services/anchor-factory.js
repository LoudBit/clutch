clutch.factory('Anchor', ['Color', 'Gradients', function(Color, Gradients) {

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
      Anchor.gradients = Gradients.create(Anchor.color)
    },

    updateRGB: function(newRGB) {
      Anchor.color = Color.rgb(_.extend(Anchor.color.rgb, newRGB))
      Anchor.styles = stylize(Anchor.color)
      Anchor.gradients = Gradients.create(Anchor.color)
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
