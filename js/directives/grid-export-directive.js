clutch.directive('gridExport', ['Grid', function(Grid) {

  function link ( scope, element, attr ) {

    // TODO: Rewrite this to suit grids
    // var exports = {
    //   cssFG:  function() {
    //     var output = []
    //     scope.spectrum.colors.forEach(function(color, i){
    //       output.push(['.color-', i+1, ' { color: ', color.hex, '; }'].join(''))
    //     })
    //     return output.join('\n')
    //   },
    //   cssBG:  function() {
    //     var output = []
    //     scope.spectrum.colors.forEach(function(color, i){
    //       output.push(['.background-', i+1, ' { background-color: ', color.hex, '; }'].join(''))
    //     })
    //     return output.join('\n')
    //   },
    //   scss:   function() {
    //     var output = []
    //     scope.spectrum.colors.forEach(function(color, i){
    //       output.push(['$color-', i+1, ': ', color.hex, ';'].join(''))
    //     })
    //     return output.join('\n')
    //   },
    //   sass:   function() {
    //     var output = []
    //     scope.spectrum.colors.forEach(function(color, i){
    //       output.push(['$color-', i+1, ': ', color.hex].join(''))
    //     })
    //     return output.join('\n')
    //   },
    //   stylus: function() {
    //     var output = []
    //     scope.spectrum.colors.forEach(function(color, i){
    //       output.push(['color-', i+1, ' = ', color.hex].join(''))
    //     })
    //     return output.join('\n')
    //   }
    // }

    // function updateExport() {
    //   scope.exportData = exports[scope.exportType]()
    // }

    scope.exportType = scope.exportType || 'cssFG'
    // scope.exportData = scope.exportData || exports[scope.exportType]()
    // scope.updateExport = updateExport

    // scope.$watch('spectrum.colors[0]', function () {
    //   updateExport()
    // })

  }

  return {
    restrict: 'E',
    templateUrl: 'ui/grid-export.html',
    scope: {
      grid: '=grid'
    },
    link: link
  }

}])
