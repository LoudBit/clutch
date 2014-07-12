/* jshint debug: true */
clutch.controller('UICtrl', ['$scope', 'UI', 'Anchor', 'Spectrum', function($scope, UI, Anchor, Spectrum) {

  // Ideal
  $scope.UI = UI

  $scope.anchor = Anchor

  $scope.spectrum = Spectrum

  $scope.$watch('anchor.color.lch.l', function(newVal, oldVal, scope){
    if (newVal != oldVal) {
      Anchor.update({l:newVal})
      if (UI.selected == 'spectrum') {
        Spectrum.update({l:newVal})
      }
    }
  })

  $scope.$watch('anchor.color.lch.c', function(newVal, oldVal){
    if (newVal != oldVal) {
      Anchor.update({c:newVal})
      if (UI.selected == 'spectrum') {
        Spectrum.update({c:newVal})
      }
    }
  })

  $scope.$watch('anchor.color.lch.h', function(newVal, oldVal){
    if (newVal != oldVal) {
      Anchor.update({h:newVal})
      if (UI.selected == 'spectrum') {
        // need this to be an offset instead
        Spectrum.update({h:newVal})
      }
    }
  })

  $scope.$watch('spectrum.range', function(newVal, oldVal){
    if (newVal != oldVal && UI.selected == 'spectrum') {
      Spectrum.update()
    }
  })

  return this

}])
