function hex() {
  return Math.floor(Math.random() * Math.floor(256)).toString(16)
}

export const state = () => ({
  background: {
    name: 'Red',
    hex: '#ffcccc'
  }
})

export const mutations = {
  randomize(state) {
    state.background = {
      name: 'Random',
      hex: `#${hex()}${hex()}${hex()}`
    }
  }
}
