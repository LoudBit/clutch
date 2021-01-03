import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    key: 'clutch',
    storage: window.localStorage
  }).plugin(store)
}
