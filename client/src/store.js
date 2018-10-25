import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import config from '@/assets/config'

const {
  host
} = config

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    getDetail: false
  },
  mutations: {
    sendDetail(state, payload) {
      state.getDetail = payload
    },
    resetUserToNull(state, payload) {
      state.currentUser = false
    },
    sendToCurrentUser(state, payload) {
      state.currentUser = payload
    }
  },
  actions: {
    newDetail({
      commit
    }, payload) {
      console.log('newDetail')
      commit('sendDetail', true)
      setTimeout(() => {
        commit('sendDetail', false)
      }, 200);
    },
    resetUser({
      commit
    }, payload) {
      commit('resetUserToNull')
    },
    getUser({
      commit
    }, payload) {
      axios({
          url: host + '/users',
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(data => {
          commit('sendToCurrentUser', data.data.data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
  }
})
