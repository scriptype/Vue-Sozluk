const querystring = require('querystring')

const API_URL = 'http://localhost:8081'

export default {
  put(endpoint, payload) {
    return fetch(`${API_URL}/${endpoint}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(response => response.json())
  },

  get(endpoint) {
    return fetch(`${API_URL}/${endpoint}`, {
      method: 'GET'
    }).then(response => response.json())
  },

  post(endpoint, payload) {
    return fetch(`${API_URL}/endpoint`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(response => response.json())
  },

  signUp(data) {
    return this.post('signUp', data)
  },

  login(credentials) {
    return this.post('login', credentials)
  },

  logout(token) {
    return this.post('logout', { token })
  },

  createEntry(entry) {
    return this.put('entries', entry)
  },

  createUser(user) {
    return this.put('user', user)
  },

  createTopic(topic) {
    return this.put('topic', topic)
  },

  getEntry(entryID) {
    return this.get(`entries/${entryID}`)
  },

  getUser(userID) {
    return this.get(`users/${userID}`)
  },

  getTopic(topicID, page) {
    const queryObject = {
      embed: [
        querystring.stringify({
          resource: 'entries',
          limit: 10,
          page,
          attributes: querystring.stringify({
            $parentField: 'id',
            $field: 'topicID'
          })
        }),
        querystring.stringify({
          resource: 'users',
          limit: 1,
          attributes: querystring.stringify({
            $parentField: 'userID',
            $field: 'id'
          })
        })
      ]
    }

    const query = querystring.stringify(queryObject)
    return this.get(`topics/${topicID}?${query}`)
      .then(results => results[0])
  },

  getRandomTopic() {
    const queryObject = {
      limit: 1,
      order: 0
    }

    const query = querystring.stringify(queryObject)

    return this.get(`topics?${query}`).then(results => results[0])
  },

  getRecentTopics(options) {
    const defaultQuery = {
      limit: 50,
      page: 0,
      sortBy: 'lastUpdatedAt',
      order: -1
    }

    const query = querystring.stringify(
      Object.assign({}, defaultQuery, options)
    )

    return this.get(`topics?${query}`)
  }
}
