import Model from '../lib/Model'

export default class EntryModel extends Model {
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
