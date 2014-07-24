/* jshint debug: true */
clutch.controller('SpectrumCtrl', ['$scope',  'Anchor', 'Spectrum', function($scope, Anchor, Spectrum) {

  // rebuild the Spectrum each time the Controller is initialized
  Spectrum.update()

  $scope.anchor = Anchor

  $scope.spectrum = Spectrum

  return this

}])
