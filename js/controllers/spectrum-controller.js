/* jshint debug: true */
clutch.controller('SpectrumCtrl', ['$scope',  'Anchor', 'Spectrum', function($scope, Anchor, Spectrum) {

  $scope.anchor = Anchor

  $scope.spectrum = Spectrum

  return this

}])
