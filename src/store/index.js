
import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutations'
import * as actions from './actions'
import * as getters from './getters'
import data from '../components/Ticket'

Vue.use(Vuex)

const state = {
  items: data.data().rows,
  lastTicket: data.data().rows.length + 1
}

const mutations = {
  [types.setItems] (state, items) {
    state.items = items
  },
  [types.addInter] (state, payload) {
    payload.ticket = state.lastTicket++
    console.log(Object.values(payload))
    let inter = payload
    state.items.push(
      inter
    )
  },
  [types.delInter] (state, payload) {
    let inter = payload
    state.items.pop(
      inter
    )
  }
}

const options = {
  state,
  mutations,
  actions,
  getters
}

export default new Vuex.Store(options)
export { options }
