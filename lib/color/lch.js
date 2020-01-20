export default {
  toLAB: (lch) => {
    lch = {
      l: parseFloat(lch.l),
      c: parseFloat(lch.c),
      h: parseFloat(lch.h)
    }

    const h = lch.h * (Math.PI / 180)
    return {
      l: lch.l,
      a: Math.cos(h) * lch.c,
      b: Math.sin(h) * lch.c
    }
  }
}
