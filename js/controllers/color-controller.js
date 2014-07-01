/* jshint debug: true */
clutch.controller('ColorCtrl', ['$scope', 'Color', 'Spectrum', 'Grid', function($scope, Color, Spectrum, Grid) {

  $scope.rgb = Color.rgb({r:255, g:0, b:0})

  $scope.lch = Color.lch({l:50, c:50, h:0})

  $scope.spectrum = Spectrum.create()

  $scope.grid = Grid.create()

  return this
}])
