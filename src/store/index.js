import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    entries: [],
    users: [],

    user: {
      loggedIn: true,
      name: 'Enes',
      id: 'S1JqHGo8M'
    },

    topics: [],
    recentTopics: [],
    activeTopic: {},
    getRandomTopicStatus: null,
    getRandomTopicError: null,
    getTopicStatus: null,
    getTopicError: null,

    signUpStatus: null,
    signUpError: null,
    loginStatus: null,
    loginError: null,
    getRecentTopicsError: null,
    userToken: null,
    createEntryStatus: null,
    createUserStatus: null,
    createTopicStatus: null
  },

  getters: {

    // Entries
    entriesByTopic: state => topicID =>
      state.entries.filter(entry => entry.topic === topicID),

    entriesByUser: state => userID =>
      state.entries.filter(entry => entry.user === userID),

    // Topics
    topicsByUser: state => userID =>
      state.topics.filter(topic => topic.user === userID)

  },

  actions: {

    signUp({ commit }, userData) {
      commit('signUpStarted')
      api
        .signUp(userData)
        .then((token) => {
          commit('signUpSuccess', { token, userData })
          localStorage.setItem('userToken', token)
        })
        .catch(error => commit('signUpFail', error))
    },

    login({ commit }, credentials) {
      commit('loginStarted')
      api
        .login(credentials)
        .then((token) => {
          commit('loginSuccess', token)
          localStorage.setItem('userToken', token)
        })
        .catch(error => commit('loginFail', error))
    },

    logout({ commit, state }) {
      commit('logoutStarted')

      if (!state.userToken) {
        commit('logoutFail', {
          message: 'You are not logged in'
        })
      }

      api
        .logout(state.userToken)
        .then(() => {
          commit('logoutSuccess')
          localStorage.removeItem('usertoken')
        })
        .catch(error => commit('logoutFail', error))
    },

    createEntry({ commit, state }, entryContent) {
      commit('createEntryStarted')
      api
        .createEntry({
          userID: state.user.id,
          topicID: state.activeTopic.id,
          content: entryContent
        })
        .then(entry => commit('createEntrySuccess', entry))
        .catch(() => commit('createEntryFail'))
    },

    createUser({ commit }, user) {
      commit('createUserStarted')
      api
        .createUser(user)
        .then(() => commit('createUserSuccess', user))
        .catch(() => commit('createUserFail'))
    },

    createTopic({ commit }, topic) {
      commit('createTopicStarted')
      api
        .createTopic(topic)
        .then(() => commit('createTopicSuccess', topic))
        .catch(() => commit('createTopicFail'))
    },

    getRecentTopics({ commit }) {
      commit('getRecentTopicsStarted')
      api
        .getRecentTopics()
        .then(topics => commit('getRecentTopicsSuccess', topics))
        .catch(error => commit('getRecentTopicsFail', error))
    },

    getRandomTopic({ commit }) {
      commit('getRandomTopicStarted')
      api
        .getRandomTopic()
        .then(topic => commit('getRandomTopicSuccess', topic))
        .catch(error => commit('getRandomTopicFail', error))
    },

    getTopic({ commit }, topicID) {
      commit('getTopicStarted')
      api
        .getTopic(topicID)
        .then(topic => commit('getTopicSuccess', topic))
        .catch(error => commit('getTopicFail', error))
    }

  },

  mutations: {

    // SignUp
    signUpStarted(state) {
      state.signUpStatus = 'started'
    },

    signUpSuccess(state, token) {
      state.signUpStatus = 'success'
      state.usertoken = token
    },

    signUpFail(state, error) {
      state.signUpStatus = 'fail'
      state.signUpError = error
    },

    // Login
    loginStarted(state) {
      state.loginStatus = 'started'
    },

    loginSuccess(state, token) {
      state.loginStatus = 'success'
      state.usertoken = token
    },

    loginFail(state, error) {
      state.loginStatus = 'fail'
      state.loginError = error
    },

    // Logout
    logoutStarted(state) {
      state.logoutStatus = 'started'
    },

    logoutSuccess(state) {
      state.logoutStatus = 'success'
      state.usertoken = null
    },

    logoutFail(state, error) {
      state.logoutStatus = 'fail'
      state.logoutError = error
    },

    // Entry
    createEntryStarted(state) {
      state.createEntryStatus = 'started'
    },

    createEntrySuccess(state) {
      state.createEntryStatus = 'success'
    },

    createEntryFail(state) {
      state.createEntryStatus = 'fail'
    },

    getRecentTopicsStarted(state) {
      state.getRecentTopicsStatus = 'started'
    },

    getRecentTopicsSuccess(state, topics) {
      state.getRecentTopicsStatus = 'success'
      state.recentTopics = topics
    },

    getRecentTopicsFail(state, error) {
      state.getRecentTopicsStatus = 'fail'
      state.getRecentTopicsError = error
    },

    getRandomTopicStarted(state) {
      state.getRandomTopicStatus = 'started'
    },

    getRandomTopicSuccess(state, topic) {
      state.getRandomTopicStatus = 'success'
      state.activeTopic = topic
    },

    getRandomTopicFail(state, error) {
      state.getRandomTopicStatus = 'fail'
      state.getRandomTopicError = error
    },

    getTopicStarted(state) {
      state.getTopicStatus = 'started'
    },

    getTopicSuccess(state, topic) {
      state.getTopicStatus = 'success'
      state.activeTopic = topic
    },

    getTopicFail(state, error) {
      state.getTopicStatus = 'fail'
      state.getTopicError = error
    },

    // User
    createUserStarted(state) {
      state.createUserStatus = 'started'
    },

    createUserSuccess(state) {
      state.createUserStatus = 'success'
    },

    createUserFail(state) {
      state.createUserStatus = 'fail'
    }

  }
})
