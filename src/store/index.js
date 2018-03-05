
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
    console.log(state.items.length)
    for (let i = 0; i < payload.length; i++) {
      for (let j = 0; j < state.items.length; j++) {
        if (payload[i] === state.items[j].ticket) {
          state.items.splice(j, 1)
        }
      }
    }
  },
  [types.editInter] (state, payload) {
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
