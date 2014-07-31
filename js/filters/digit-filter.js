clutch.filter('toFixed', function() {
  return function(input, digits) {
    input = parseFloat(input)
    digits = parseFloat(digits) || 3
    return input.toFixed(digits)
  }
})
