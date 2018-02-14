const Model = require('../lib/Model')

module.exports = class TopicModel extends Model {
  constructor(data) {
    const scheme = {
      createdAt: {
        type: Number,
        required: true
      },
      lastUpdatedAt: {
        type: Number,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      id: {
        type: String,
        required: true
      },
      userID: {
        type: String,
        required: true
      }
    }

    super('TopicModel', scheme)

    this.set(data)
  }
}
