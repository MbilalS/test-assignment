import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: []
  },
  getters: {
    users (state) {
      return state.users
    }
  },
  mutations: {
    setUsers (state, users) {
      state.users = users
    },
    addNewUser (state, user) {
      state.users.push(user)
    },
    updateUser (state, payload) {
      const index = state.users.findIndex(user => user.id === payload.id)
      if (index !== -1) state.users.splice(index, 1, payload)
    },
    removeUser (state, userIndex) {
      state.users.splice(userIndex, 1)
    }
  },
  actions: {
    setInitialUsers (context, users) {
      context.commit('setUsers', users)
    },
    removeUser (context, userIndex) {
      context.commit('removeUser', userIndex)
    },
    addUser (context, user) {
      context.commit('addNewUser', user)
    },
    updateUser (context, payload) {
      context.commit('updateUser', payload)
    }
  }
})
