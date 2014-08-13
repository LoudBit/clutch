/* jshint debug: true */
clutch.controller('UICtrl', ['$scope', 'UI', 'Anchor', 'Spectrum', function($scope, UI, Anchor, Spectrum) {

  if (window.navigator.standalone) {
    console.info('app loaded full screen')
    $scope.fullscreen = true
  }

  $scope.UI = UI

  $scope.anchor = Anchor

  $scope.spectrum = Spectrum

  return this

}])
