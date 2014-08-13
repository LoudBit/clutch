/* jshint debug: true */
clutch.controller('UICtrl', ['$scope', 'UI', 'Anchor', 'Spectrum', function($scope, UI, Anchor, Spectrum) {

  $scope.UI = UI

  $scope.anchor = Anchor

  $scope.spectrum = Spectrum

  $scope.exportingSpectrum = false

  $scope.showExport = function() {
    $scope.exportingSpectrum = true
    // console.log('show me the export');
  }

  return this

}])
