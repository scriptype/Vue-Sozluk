const Model = require('../lib/Model')

module.exports = class EntryModel extends Model {
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
      id: {
        type: String,
        required: true
      },
      userID: {
        type: String,
        required: true
      },
      topicID: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      }
    }

    super('EntryModel', scheme)

    this.set(data)
  }
}
