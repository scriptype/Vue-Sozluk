module.exports = class InvalidKeyError extends Error {
  constructor(key, model) {
    return new Error(`Invalid key: ${model}.${key}`)
  }
}
