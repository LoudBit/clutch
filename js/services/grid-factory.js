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
    var i, l, lOffset,
        grid = [],
        defaults = { l: 50, c: 50, h: 180 }

    lch = lch && _.defaults(lch, defaults) || defaults
    l = 100 / Grid.lights.length
    lOffset = lch.l % l

    for (i = 0; i < Grid.lights.length; i++) {
      grid.unshift(Spectrum.create({
        l: Grid.lights[i],
        c: lch.c,
        h: lch.h
      }))
    }

    return grid
  }

  function setRows() {
    var min = 1
    var max = 16
    var def = 3
    var _rows = parseInt(Grid.rows, 10)

    if (isNaN(_rows)) { _rows = def }
    if (_rows < min)  { _rows = min }
    if (_rows > max)  { _rows = max }
    Grid.rows = _rows
  }

  function updateGrid() {
    Anchor.updateLch()
    Grid.lights = lights(Anchor.color.lch)
    Grid.colors = createGrid(Anchor.color.lch)
    Grid.styles = stylize()
  }

  function lights(lch) {
    setRows()
    var l = 100 / Grid.rows,
        lOffset = lch.l % l,
        output = []
    _.times(Grid.rows, function(i) {
      output.push(l * i + lOffset)
    })
    return output
  }

  var Grid = {
    rows: 3,
    lights: [75, 50, 25],
    colors: [[]],
    create: createGrid,
    update: updateGrid
  }

  updateGrid()

  return Grid

}])
