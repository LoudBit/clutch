clutch.factory('UI', ['Anchor', function(Anchor) {

  var UI = {

    sections: [{
      name: 'Color',
      slug: 'color'
    }, {
      name: 'Spectrum',
      slug: 'spectrum'
    }],

    selected: 'color',

    select: function(slug) {
      UI.selected = slug
    },

    styles: {
      clutch: function() {
        var bg
        if ( UI.styles.background == 'anchor' )
          bg = Anchor.color.hex
        else
          bg = UI.styles.background
        return {
          'background-color': bg
        }
      },
      background: 'black'
    }

  }

  return UI

}])
