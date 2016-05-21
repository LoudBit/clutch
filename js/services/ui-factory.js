clutch.factory('UI', ['Anchor', function(Anchor) {

  var UI = {

    generators: [{
      name: 'Single Color',
      slug: 'color'
    }, {
      name: 'Spectrum',
      slug: 'spectrum'
    }, {
      name: 'Grid',
      slug: 'grid'
    }],

    generator: 'color',

    color: {
      tabs: 'lch'
    },

    styles: {

      clutch: function() {
        var bg
        if ( UI.styles.background == 'color' )
          bg = Anchor.color.hex
        else
          bg = UI.styles.background
        return {
          'background-color': bg
        }
      },

      // I find that defaulting to the color background gives the most obvious first impresssion
      background: 'color'

    }

  }

  return UI

}])
