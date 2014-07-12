/* jshint debug: true */
clutch.controller('UICtrl', ['$scope', 'Anchor', function($scope, Anchor) {

  $scope.sections = [{
    name: 'Color',
    slug: 'color'
  }, {
    name: 'Spectrum',
    slug: 'spectrum'
  }, {
    name: 'Grid',
    slug: 'grid'
  }]

  $scope.selected = 'color'

  $scope.select = function(slug) {
    $scope.selected = slug
  }

  $scope.anchor = Anchor

  $scope.$watch('anchor.color.lch.l', function(newVal, oldVal){
    Anchor.update({l:newVal})
  })

  $scope.$watch('anchor.color.lch.c', function(newVal, oldVal){
    Anchor.update({c:newVal})
  })

  $scope.$watch('anchor.color.lch.h', function(newVal, oldVal){
    Anchor.update({h:newVal})
  })

  return this

}])
