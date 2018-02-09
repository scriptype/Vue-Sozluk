const Model = require('../lib/Model')

module.exports = class TopicModel extends Model {
  constructor(data) {
    const scheme = {
      createdAt: Number,
      title: String,
      id: String,
      userID: String
    }

    super('TopicModel', scheme)

    this.set(data)
  }
}
