clutch.directive('gridExport', ['Grid', function(Grid) {

  function link ( scope, element, attr ) {

    function exports(format) {
      var output = []
      var col = ''
      scope.grid.colors.forEach(function(row, i){
        row.forEach(function(color, j){
          col = j+1
          col = col < 10 ? col + ' ' : col
          output.push( outputThisShit[format](String.fromCharCode(65+i), col, color.hex) )
        })
        output.push( '' )
      })
      return output.join('\n')
    }

    function updateExport() {
      scope.exportData = exports(scope.exportType)
    }

    var outputThisShit = {
      cssFG: function(row, num, hex) {
        return ['.color-', row, num, ' { color: ', hex, '; }'].join('')
      },
      cssBG: function(row, num, hex) {
        return ['.background-', row, num, ' { background-color: ', hex, '; }'].join('')
      },
      scss: function(row, num, hex) {
        return ['$color-', row, num, ': ', hex, ';'].join('')
      },
      sass: function(row, num, hex) {
        return ['$color-', row, num, ': ', hex].join('')
      },
      stylus: function(row, num, hex) {
        return ['color-', row, num, ' = ', hex].join('')
      }
    }

    scope.exportType = scope.exportType || 'cssFG'
    scope.exportData = scope.exportData || exports(scope.exportType)
    scope.updateExport = updateExport

    scope.$watch('grid.colors[0]', function () {
      updateExport()
    })

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
