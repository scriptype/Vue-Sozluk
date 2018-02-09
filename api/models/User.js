const Model = require('../lib/Model')

module.exports = class UserModel extends Model {
  constructor(data) {
    const scheme = {
      createdAt: {
        type: Number,
        required: true
      },
      id: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    }

    super('UserModel', scheme)

    this.set(data)
  }
}
