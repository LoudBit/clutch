clutch.controller('ColorColorColorController', ['$scope', 'Hue', function($scope, Hue) {
  'use strict';

  var hues = []

  function spectrum(lch, off) {
    lch = lch || { l: 50, c: $scope.chromaticity, h: 0 }
    off = off || { l:  0, c:  0, h: 0 }
    return [
      // Core Colors
      { l: lch.l, c: lch.c, h:   0+off.h, name: 'Magenta' },
      { l: lch.l, c: lch.c, h:  30+off.h, name: 'Red' },
      { l: lch.l, c: lch.c, h:  60+off.h, name: 'Orange' },
      { l: lch.l, c: lch.c, h:  90+off.h, name: 'Yellow' },
      { l: lch.l, c: lch.c, h: 120+off.h, name: 'Olive' },
      { l: lch.l, c: lch.c, h: 150+off.h, name: 'Green' },
      { l: lch.l, c: lch.c, h: 180+off.h, name: 'Teal' },
      { l: lch.l, c: lch.c, h: 210+off.h, name: 'Cyan' },
      { l: lch.l, c: lch.c, h: 240+off.h, name: 'LightBlue' },
      { l: lch.l, c: lch.c, h: 270+off.h, name: 'Blue' },
      { l: lch.l, c: lch.c, h: 300+off.h, name: 'Indigo' },
      { l: lch.l, c: lch.c, h: 330+off.h, name: 'Purple' },

      // Greys
      { l: lch.l, c:     0, h:   0+off.h, name:'Grey' },
      { l: lch.l, c: 3.444, h:  60+off.h, name:'WarmGrey' },
      { l: lch.l, c: 3.444, h: 240+off.h, name:'CoolGrey' },
    ]
  }

  function buildHues() {
    hues = []

    _.each(spectrum(), function(hue){
      hues.push( Hue.create(hue) )
    })

    _.extend($scope, {
      hues: hues,
      background: 'transparent',
      stylus: generateStylus(hues),
      scss: generateScss(hues)
    })
  }

  function generateStylus(hues) {
    hues = hues || $scope.hues
    var text = []
    hues.forEach(function(hue){
      text.push( '// ' + hue.name + '\n');
      hue.scale.forEach(function(color, index){
        var prefix = (index <= 3) ? 0 : (index >= 6) ? 2 : 1;
        var suffix = (index % 3)
        text.push( $scope.shades.prefixes[prefix] + hue.name.toLowerCase() + $scope.shades.suffixes[suffix] + ' = ' + color + ';\n');
      })
      text.push( '\n\n' );
    })
    return text.join('')
  }

  function generateScss(hues) {
    hues = hues || $scope.hues
    var text = []
    hues.forEach(function(hue){
      text.push( '// ' + hue.name + '\n');
      // console.log(hue.name, hue.scale)
      hue.scale.forEach(function(color, index){
        var prefix = (index <= 2) ? 0 : (index >= 6) ? 2 : 1;
        var suffix = (index % 3)
        text.push( '$' + $scope.shades.prefixes[prefix] + hue.name.toLowerCase() + $scope.shades.suffixes[suffix] + ': ' + color + ';\n');
      })
      text.push( '\n\n' );
    })
    return text.join('')
  }


  _.extend($scope, {

    anchor: { l: 0, c: 0, h: 0 },
    anchorInput: '',
    background: 'transparent',
    chromaticity: Hue.lightness[Math.round(Hue.lightness.length/2 - 1)],
    chromaticityScale: Hue.scale({ l: 0, c: 0, h: 0 }, true),
    Hue: Hue,
    hues: hues,
    offsets: { l: 0, c: 0, h: 0 },
    scale: Hue.lightness,
    shades: {
      prefixes: [
        'light-',
        '',
        'dark-'
      ],
      suffixes: [
        '-highlight',
        '',
        '-shadow'
      ]
    },

    stylus: '',

    anchorIt: function() {
      // debugger
      if (!$scope.anchorInput) {
        buildHues()
        return
      }

      var lch = Hue.parse($scope.anchorInput)

      var offsets = {
        l: Hue.round(lch.l - 50),
        c: 0,
        h: Hue.round(lch.h % 30)
      }

      hues = []

      _.each(spectrum(lch, offsets), function(hue){
        hues.push( Hue.create(hue, offsets) )
      })

      _.extend($scope, {
        anchor: lch,
        background: chroma.css($scope.anchorInput).hex(),
        anchorInput: chroma.css($scope.anchorInput).hex(),
        hues: hues,
        offsets: offsets,
        scale: Hue.scale(offsets, false),
        stylus: generateStylus(hues),
        scss: generateScss(hues)
      })

    },

    setBackground: function(hue) {
      $scope.background = hue
    },

    textColor: function(hue, index) {
      var half = hue.scale.length * 0.5
      var last = hue.scale.length - 1
      if (index < half) {
        return hue.scale[last]
      } else {
        return hue.scale[0]
      }
    }

  })


  $scope.$watch('chromaticity', function(){
    // debugger;
    buildHues()
  })

}])
