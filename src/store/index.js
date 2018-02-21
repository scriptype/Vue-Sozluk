import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: true,

    user: {},
    userContributedTopics: [],
    getUserContributedTopicsStatus: null,
    getUserStatus: null,

    topics: [],
    recentTopics: [],
    activeTopic: {},
    getRandomTopicStatus: null,
    getRandomTopicError: null,
    getTopicStatus: null,
    getTopicError: null,
    getRecentTopicsError: null,

    createEntryStatus: null
  },

  getters: {},

  actions: {

    getUser({ commit }) {
      commit('getUserStarted')
      api
        .getUser('HkjoAMMwf')
        .then(user => commit('getUserSuccess', user))
        .catch(() => commit('getUserSuccess'))
    },

    getUserContributedTopics({ commit, state }) {
      commit('getUserContributedTopicsStarted')
      api
        .getUserContributedTopics(state.user.id)
        .then(topics => commit('getUserContributedTopicsSuccess', topics))
        .catch(() => commit('getUserContributedTopicsFail'))
    },

    createEntry({ commit, state }, entryContent) {
      commit('createEntryStarted')
      setTimeout(() => {
        api
          .createEntry({
            userID: state.user.id,
            topicID: state.activeTopic.id,
            content: entryContent
          })
          .then(entry => commit('createEntrySuccess', entry))
          .catch(() => commit('createEntryFail'))
      }, 1500)
    },

    pushOptimisticEntry({ commit }, entry) {
      commit('pushOptimisticEntry', entry)
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

    getUserStarted(state) {
      state.getUserStatus = 'started'
    },

    getUserSuccess(state, user) {
      state.getUserStatus = 'success'
      state.user = user
    },

    getUserFail(state) {
      state.getUserStatus = 'fail'
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

    pushOptimisticEntry(state, entry) {
      state.activeTopic.entries.push(entry)
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

    getUserContributedTopicsStarted(state) {
      state.getUserContributedTopicsStatus = 'started'
    },

    getUserContributedTopicsSuccess(state, topics) {
      state.getUserContributedTopicsStatus = 'success'
      state.userContributedTopics = topics
    },

    getUserContributedTopicsFail(state) {
      state.getUserContributedTopicsStatus = 'fail'
    }

  }
})
