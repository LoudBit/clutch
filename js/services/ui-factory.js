clutch.factory('UI', ['Anchor', function(Anchor) {

  var UI = {

    sections: [{
      name: 'Color',
      slug: 'color'
    }, {
      name: 'Spectrum',
      slug: 'spectrum'
    }, {
      name: 'Grid',
      slug: 'grid'
    }],

    selected: 'color',

    color: {
      tabs: 'lch'
    },

    select: function(slug) {
      UI.selected = slug
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

      // I find that defaulting to the color colour gives the best first impresssion
      background: 'color'

    }

  }

  return UI

}])


