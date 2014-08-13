// logic for a spectrum export will go here.
// it'll provide the select and the options
// when the select changes it'll update the export code to be copied by the user

clutch.directive('spectrumExport', ['Spectrum', function(Spectrum) {

  function link ( scope, element, attr ) {

    var exports = {
      cssFG:  function() {
        var output = []
        scope.spectrum.colors.forEach(function(color, i){
          output.push(['.color-', i+1, ' { color: ', color.hex, '; }'].join(''))
        })
        return output.join('\n')
      },
      cssBG:  function() {
        var output = []
        scope.spectrum.colors.forEach(function(color, i){
          output.push(['.background-', i+1, ' { background-color: ', color.hex, '; }'].join(''))
        })
        return output.join('\n')
      },
      scss:   function() {
        var output = []
        scope.spectrum.colors.forEach(function(color, i){
          output.push(['$color-', i+1, ': ', color.hex, ';'].join(''))
        })
        return output.join('\n')
      },
      stylus: function() {
        var output = []
        scope.spectrum.colors.forEach(function(color, i){
          output.push(['color-', i+1, ' = ', color.hex].join(''))
        })
        return output.join('\n')
      }
    }

    scope.exportType = scope.exportType || "cssFG"
    scope.exportData = scope.exportData || exports[scope.exportType]()

    scope.doStuff = function() {
      scope.exportData = exports[scope.exportType]()
    }

  }

  return {
    restrict: 'E',
    templateUrl: 'ui/spectrum-export.html',
    scope: {
      spectrum: '=spectrum'
    },
    link: link
  }

}])
