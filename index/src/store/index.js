import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  config: {}
}

const mutations = {
  CONFIG (state, { item, data }) {
    state.config[item] = data
  }
}

const actions = {
  setConfig ({ commit }, payload) {
    commit('CONFIG', payload)
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
