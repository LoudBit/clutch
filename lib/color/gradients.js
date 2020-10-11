import chroma from 'chroma-js'

export function createLchGradients(l, c, h) {
  function createHueString(h, hex) {
    return `, ${hex} ${h === 0 ? 0 : (h / 360) * 100}%`
  }

  // color scales for each slider input
  const l2 = [chroma.lch(0, c, h), chroma.lch(l, c, h), chroma.lch(100, c, h)]
  const c2 = [chroma.lch(l, 0, h), chroma.lch(l, 50, h), chroma.lch(l, 100, h)]

  // const h = []
  let h2 = ''
  for (let i = 0; i < 12; i++) {
    const hue = i * (360 / 12)
    h2 += createHueString(hue, chroma.lch(l, c, hue).hex())
  }

  return {
    // eslint-disable-next-line prettier/prettier
    l: { backgroundImage: `linear-gradient(to right, ${l2[0].hex()} 0%, ${l2[1].hex()} ${l2[1].lch()[0]}%, ${l2[2].hex()} 100%)` },
    // eslint-disable-next-line prettier/prettier
    c: { backgroundImage: `linear-gradient(to right, ${c2[0].hex()} 0%, ${c2[1].hex()} ${c2[1].lch()[1]}%, ${c2[2].hex()} 100%)` },
    h: { backgroundImage: `linear-gradient(to right${h2})` }
  }
}

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
