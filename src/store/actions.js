import * as types from './mutations'
import rows from '../components/Ticket'

export const setItems = ({commit}) => {
  rows.rows
    .then((items) => {
      commit(types.setItems, items)
    })
    .catch((err) => console.log(err))
}

export const addInter = ({commit}, payload) => {
  commit(types.addInter, payload)
}

export const delInter = ({commit}, payload) => {
  commit(types.delInter, payload)
}