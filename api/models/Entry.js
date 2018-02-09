const Model = require('../lib/Model')

module.exports = class EntryModel extends Model {
  constructor(data) {
    const scheme = {
      createdAt: Number,
      id: String,
      userID: String,
      topicID: String
    }

    super('EntryModel', scheme)

    this.set(data)
  }
}
