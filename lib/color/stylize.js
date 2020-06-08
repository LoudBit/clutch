export default function stylize(color) {
  const pad = 1 + color.lch.c / 50
  const margin = ' ' + pad * -1 + 'em'
  color.style = {
    background: color.hex,
    bottom: `${color.lch.l}%`,
    left: `${(color.lch.h / 360) * 100}%`,
    padding: `${1 + color.lch.c / 50}em`,
    margin: '0 0' + margin + margin
  }
  return color
}
