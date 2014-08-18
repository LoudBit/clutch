clutch.controller('GridCtrl', ['$scope',  'Anchor', 'Grid', function($scope, Anchor, Grid) {

  // rebuild the Grid each time the Controller is initialized
  Grid.update()

  $scope.anchor = Anchor

  $scope.grid = Grid

  return this

}])
