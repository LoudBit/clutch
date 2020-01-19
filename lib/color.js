// import hex from '@/lib/hex'

const cssRx = /^#?([a-f0-9]{6})$/i

export default class Color {
  static fields() {
    return {
      id: this.increment(),
      name: this.string(),
      palette_id: this.attr(null),
      hex: this.string(),
      rgb: this.attr(null)
    }
  }

  static mutators() {
    return {
      rgb(input) {
        return {
          r: parseInt(input.r, 10),
          g: parseInt(input.g, 10),
          b: parseInt(input.b, 10)
        }
      }
    }
  }

  // custom behavior
  static fromHex(hex) {
    const match = hex.match(cssRx)
    if (match) {
      const r = parseInt(match[1].substr(0, 2), 16)
      const g = parseInt(match[1].substr(2, 2), 16)
      const b = parseInt(match[1].substr(4, 2), 16)
      return this.fromRGB(r, g, b)
    } else {
      // NOTE: unsure if an error is the best way to go here. Validation?
      throw new Error(`Invalid hexadecimal color value: ${hex}`)
    }
  }

  static fromRGB(r, g, b) {
    const hex = `#` + this.hex(r) + this.hex(g) + this.hex(b)
    return { hex, rgb: { r, g, b } }
  }

  static hex(str) {
    str = Number(str).toString(16)
    if (str.length === 1) str = '0' + str
    return str
  }

  static gradientCSS(x) {
    return {
      backgroundImage: `linear-gradient(to right, rgb(${x[0].r}, ${x[0].g}, ${x[0].b}) 0%, rgb(${x[1].r}, ${x[1].g}, ${x[1].b}) 50%,  rgb(${x[2].r}, ${x[2].g}, ${x[2].b}) 100%)`
    }
  }

  get rgbGradient() {
    const gradient = {
      r: [
        { r: 0, g: this.rgb.g, b: this.rgb.b },
        { r: 127, g: this.rgb.g, b: this.rgb.b },
        { r: 255, g: this.rgb.g, b: this.rgb.b }
      ],
      g: [
        { r: this.rgb.r, g: 0, b: this.rgb.b },
        { r: this.rgb.r, g: 127, b: this.rgb.b },
        { r: this.rgb.r, g: 255, b: this.rgb.b }
      ],
      b: [
        { r: this.rgb.r, g: this.rgb.g, b: 0 },
        { r: this.rgb.r, g: this.rgb.g, b: 127 },
        { r: this.rgb.r, g: this.rgb.g, b: 255 }
      ]
    }

    return {
      r: Color.gradientCSS(gradient.r),
      g: Color.gradientCSS(gradient.g),
      b: Color.gradientCSS(gradient.b)
    }
  }
}
