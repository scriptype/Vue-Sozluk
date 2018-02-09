import InvalidKeyError from './InvalidKeyError'
import InvalidTypeError from './InvalidTypeError'

export default class Model {
  constructor(name, scheme) {
    this.name = name
    this.scheme = scheme
    this.data = Object.keys(scheme).reduce((data, key) => (
      Object.assign(data, { [key]: null })
    ), {})
  }

  validateGet(key) {
    const { name, scheme } = this

    if (!scheme[key]) {
      throw new InvalidKeyError(key, name)
    }
  }

  validateSet(key, value) {
    const { name, scheme } = this

    this.validateGet(key)

    const candidateType = typeof value
    const validType = typeof scheme[key]()
    if (candidateType !== validType) {
      throw new InvalidTypeError(candidateType, validType, key, name)
    }
  }

  set(data) {
    Object.keys(data).forEach((key) => {
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
