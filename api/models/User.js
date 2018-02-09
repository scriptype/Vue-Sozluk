import Model from '../lib/Model'

export default class UserModel extends Model {
  constructor(data) {
    const scheme = {
      createdAt: Number,
      name: String,
      id: String
    }

    super('UserModel', scheme)

    this.set(data)
  }
}
