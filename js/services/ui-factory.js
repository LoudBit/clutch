clutch.factory('UI', [function() {

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

    select: function(slug) {
      UI.selected = slug
    }

  }

  return UI

}])
