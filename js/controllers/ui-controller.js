/* jshint debug: true */
clutch.controller('UICtrl', ['$scope', 'UI', 'Anchor', 'Spectrum', 'Grid', function($scope, UI, Anchor, Spectrum, Grid) {

  if (window.navigator.standalone) {
    console.info('app loaded full screen')
    $scope.fullscreen = true
  }

  $scope.UI = UI

  $scope.anchor = Anchor

  $scope.spectrum = Spectrum

  $scope.grid = Grid

  return this

}])
