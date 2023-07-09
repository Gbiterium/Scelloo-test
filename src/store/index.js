import Vue from 'vue'
import Vuex from 'vuex'
import TableData from '../assets/data.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tableData: []
  },
  getters: {
    getData: state => state.tableData,
  },
  mutations: {
    setData(state, tableData) {
      state.tableData = tableData
    }
  },
  actions: {
    setTableData({ commit }) {
      const data = TableData
      commit('setData', TableData)
    } 
  },
  modules: {
  }
})
