function Color() {
  return {
    name: 'New Color',
    hex: `#${hex()}${hex()}${hex()}`
  }
}

function hex() {
  let str = Math.floor(Math.random() * Math.floor(256)).toString(16)
  str = str.length === 1 ? `0${str}` : str
  return str
}

export const state = () => ({
  background: {
    name: 'Red',
    hex: '#ffcccc'
  }
})

export const mutations = {
  randomize(state) {
    state.background = new Color()
  }
}
