clutch.factory('Anchor', ['Color', function(Color) {

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
    },

    updateRGB: function(newRGB) {
      Anchor.color = Color.rgb(_.extend(Anchor.color.rgb, newRGB))
      Anchor.styles = stylize(Anchor.color)
    },

    styles: stylize(initialColor)

  }

  return Anchor

}])
