/* jshint debug: true */
clutch.controller('UICtrl', ['$scope', 'UI', 'Anchor', 'Spectrum', function($scope, UI, Anchor, Spectrum) {

  // Ideal
  $scope.UI = UI

  $scope.anchor = Anchor

  $scope.spectrum = Spectrum

  // Not sure how best to reduce the repetition here
  $scope.$watch('anchor.color.lch.l', function(newVal, oldVal, scope){
    if (newVal != oldVal) {
      Anchor.update({l:newVal})
      Spectrum.update(Anchor.color.lch)
    }
  })

  $scope.$watch('anchor.color.lch.c', function(newVal, oldVal){
    if (newVal != oldVal) {
      Anchor.update({c:newVal})
      Spectrum.update(Anchor.color.lch)
    }
  })

  $scope.$watch('anchor.color.lch.h', function(newVal, oldVal){
    if (newVal != oldVal) {
      Anchor.update({h:newVal})
      Spectrum.update(Anchor.color.lch)
    }
  })

  $scope.$watch('spectrum.range', function(newVal, oldVal){
    if (newVal != oldVal && UI.selected == 'spectrum') {
      Spectrum.update(Anchor.color.lch)
    }
  })

  return this

}])
