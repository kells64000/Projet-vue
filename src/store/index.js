
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
    let inter = payload
    state.items.push(
      inter
    )
  },
  [types.editValue] (data) {
    let oldData = data
    console.log(oldData)
  },
  [types.delInter] (state, payload) {
    let delRow = payload
    for (let i = 0; i < state.items.length; i++) {
      if (delRow.indexOf(state.items[i].ticket) > -1) {
        state.items.splice(i, 1)
      }
    }
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
