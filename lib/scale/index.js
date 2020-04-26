import Color from '~/lib/color'

const spaces = {
  lch: ['l', 'c', 'h'],
  rgb: ['r', 'g', 'b']
}

// TODO: try this algorithm - stackoverflow.com/questions/22607043/color-gradient-algorithm
export default function(options) {
  const { start, stop, steps, space } = options
  const s = space.toLowerCase()
  const output = [start]

  // need to map each step, not each space
  for (let x = 0; x < steps; x++) {
    const last = output[output.length - 1]
    const next = { [space]: {} }

    // output
    spaces[s].forEach((key) => {
      const increment = Math.abs((start[space][key] - stop[space][key]) / (steps + 1))
      next[space][key] = last[space][key] + increment
    })
    const nextColor = Color[`from${space.toUpperCase()}`](next[space])
    output.push(nextColor)
  }
  output.push(stop)
  return output
}
