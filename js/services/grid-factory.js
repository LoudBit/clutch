// Grid has many Spectrums
// Spectrum has many Colors
// Color has many objects

// Going from RGB to LCH and back again
// Observer= 2°, Illuminant= D65

clutch.factory('Grid', ['Anchor', 'Spectrum', function(Anchor, Spectrum) {

  function stylize() {
    var styl = []

    styl.push(_.map(Grid.colors, function(row){
      return _.map(row, function(color){
        return {
          bottom: color.lch.l + '%'
        }
      })
    }))

    return styl
  }

  function createGrid(lch) {
    var i, l, lOffset, grid = []

    lch = lch && _.defaults(lch, defaults) || defaults
    l = 100 / Grid.rows
    lOffset = lch.l % l

    for (i = 0; i < Grid.rows; i++) {
      grid.unshift(Spectrum.create({
        l: lch.l * i + lOffset,
        c: lch.c,
        h: lch.h
      }))
    }

    console.log(grid);

    return grid
  }

  var defaults = {
    l: 50,
    c: 50,
    h: 0
  }

  var Grid = {
    rows: 3,
    colors: [[]],
    create: createGrid,
    update: function() {
      Anchor.updateLch()
      Grid.colors = createGrid(Anchor.color.lch)
      Grid.styles = stylize()
    }
  }

  Grid.colors = createGrid(Anchor.color.lch)
  Grid.styles = stylize()

  return Grid

}])
