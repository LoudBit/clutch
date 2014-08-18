clutch.factory('Grid', ['Anchor', 'Spectrum', function(Anchor, Spectrum) {

  function stylize() {
    var styl = []

    styl.push(_.map(Grid.colors, function(row){
      return _.map(row, function(color){
        console.log(color.hex, color.lch.l, color.lch.c, color.lch.h)
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
    l = 100 / Grid.lightnesses.length
    lOffset = lch.l % l

    for (i = 0; i < Grid.lightnesses.length; i++) {

      grid.unshift(Spectrum.create({
        l: Grid.lightnesses[i],
        c: lch.c,
        h: lch.h
      }))
    }

    return grid
  }

  function lightnesses(lch) {
    var l = 100 / Grid.lightnesses.length
    var lOffset = lch.l % l
    var lightnesses = []

    _.times(Grid.rows, function(i) {
      lightnesses.push(l * i + lOffset)
    })

    return lightnesses
  }

  var defaults = {
    l: 50,
    c: 50,
    h: 180
  }

  var Grid = {
    rows: 3,
    lightnesses: [75, 50, 25],
    colors: [[]],
    create: createGrid,
    update: function() {
      Anchor.updateLch()
      Grid.colors = createGrid(Anchor.color.lch)
      Grid.lightnesses = lightnesses(Anchor.color.lch)
      Grid.styles = stylize()
    }
  }

  Grid.colors = createGrid(Anchor.color.lch)
  Grid.lightnesses = lightnesses(Anchor.color.lch)
  Grid.styles = stylize()

  return Grid

}])
