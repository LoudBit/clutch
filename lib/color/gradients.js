import chroma from 'chroma-js'

// function createGradients(color) {
//   return {
//     lch: createLChGradients(color),
//     rgb: createRGBGradients(color)
//   }
// }

// return {
//   create: createGradients
// }

// ---

// function createLChGradients(color) {
//   function createHue(i) {
//     return Color.lch({
//       l: color.lch.l,
//       c: color.lch.c,
//       h: i === 0 ? 0 : (360 / 12) * i
//     })
//   }

//   function createHueString(color, i) {
//     return [', ', color.hex, ' ', color.lch.h === 0 ? 0 : (color.lch.h / 360) * 100, '%'].join('')
//   }

//   // // color scales for each slider input
//   // const l = [
//   //   chroma.lch(0, color.lch.c, color.lch.h),
//   //   chroma.lch(color.lch),
//   //   chroma.lch(100, color.lch.c, color.lch.h),
//   // ]

//   const l = [
//     Color.lch({ l: 0, c: color.lch.c, h: color.lch.h }),
//     color,
//     Color.lch({ l: 100, c: color.lch.c, h: color.lch.h })
//   ]

//   const c = [
//     Color.lch({ l: color.lch.l, c: 0, h: color.lch.h }),
//     Color.lch({ l: color.lch.l, c: 50, h: color.lch.h }),
//     Color.lch({ l: color.lch.l, c: 100, h: color.lch.h })
//   ]

//   const h = ['linear-gradient(to right', _.map(_.times(12, createHue), createHueString).join(''), ')']

//   return {
//     l: {
//       'background-image': [
//         'linear-gradient(to right,',
//         l[0].hex,
//         ' 0%, ',
//         l[1].hex,
//         ' ',
//         l[1].lch.l,
//         '%, ',
//         l[2].hex,
//         ' 100%)'
//       ].join('')
//     },
//     c: {
//       'background-image': [
//         'linear-gradient(to right,',
//         c[0].hex,
//         ' 0%, ',
//         c[1].hex,
//         ' ',
//         c[1].lch.l,
//         '%, ',
//         c[2].hex,
//         ' 100%)'
//       ].join('')
//     },
//     h: { 'background-image': h.join('') }
//   }
// }

// create three colors based on the provided color and the min/mid/max of rgb
export function createRGBGradients(r, g, b) {
  // color scales for each slider input
  const r2 = [chroma([0, g, b]), chroma([127, g, b]), chroma([255, g, b])]
  const g2 = [chroma([r, 0, b]), chroma([r, 127, b]), chroma([r, 255, b])]
  const b2 = [chroma([r, g, 0]), chroma([r, g, 127]), chroma([r, g, 255])]

  // styles for each hex range
  return {
    r: { backgroundImage: `linear-gradient(to right, ${r2[0].hex()} 0%, ${r2[1].hex()} 50%, ${r2[2].hex()} 100%)` },
    g: { backgroundImage: `linear-gradient(to right, ${g2[0].hex()} 0%, ${g2[1].hex()} 50%, ${g2[2].hex()} 100%)` },
    b: { backgroundImage: `linear-gradient(to right, ${b2[0].hex()} 0%, ${b2[1].hex()} 50%, ${b2[2].hex()} 100%)` }
  }
}
