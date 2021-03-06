const InvalidKeyError = require('./InvalidKeyError')
const InvalidTypeError = require('./InvalidTypeError')
const RequiredKeyError = require('./RequiredKeyError')

module.exports = class Model {
  constructor(name, scheme) {
    this.name = name
    this.scheme = scheme
    this.data = Object.keys(scheme).reduce((data, key) => (
      Object.assign(data, { [key]: null })
    ), {})
  }

  toJSON() {
    return this.data
  }

  validateGet(key) {
    const { name, scheme } = this

    if (!scheme[key]) {
      throw new InvalidKeyError(key, name)
    }
  }

  validateSet(key, value) {
    const { name, scheme } = this

    if (scheme[key].required && !value) {
      throw new RequiredKeyError(key, name)
    }

    const candidateType = typeof value
    const validType = typeof scheme[key].type()
    if (candidateType !== validType) {
      throw new InvalidTypeError(candidateType, validType, key, name)
    }
  }

  set(data) {
    Object.keys(this.scheme).forEach((key) => {
      const value = data[key]
      this.validateSet(key, value)
      this.data[key] = value
    })
    return this
  }

  get(key) {
    this.validateGet(key)
    return this.data[key]
  }
}
