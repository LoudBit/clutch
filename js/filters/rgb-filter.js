// lab color to rgb filter?
clutch.filter('rgb', function() {
  'use strict';
  return function(args) {
    return 'rgb(' + args[0] + ', ' + args[1] + ', ' + args[2] + ')'
  }
})
