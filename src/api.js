const API_URL = 'http://localhost:8081'

export default {
  create(endpoint, payload) {
    return fetch(`${API_URL}/${endpoint}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    }).then(response => response.json())
  },

  get(endpoint, query) {
    return fetch(`${API_URL}/${endpoint}`, {
      method: 'GET',
      body: JSON.stringify({ query })
    }).then(response => response.json())
  },

  post(endpoint, payload) {
    return fetch(`${API_URL}/endpoint`, {
      method: 'POST',
      body: JSON.stringify(payload)
    }).then(response => response.json())
  },

  login(credentials) {
    return this.post('login', { credentials })
  },

  logout(token) {
    return this.post('logout', { token })
  },

  createEntry(entry) {
    return this.create('entry', { entry })
  },

  createUser(user) {
    return this.create('user', { user })
  },

  createTopic(topic) {
    return this.create('topic', { topic })
  },

  getEntry(entryID) {
    return this.get('entry', { entryID })
  },

  getUser(userID) {
    return this.get('user', { userID })
  },

  getTopic(topicID) {
    return this.get('topic', { topicID })
  }
}
