module.exports = class RequiredKeyError extends Error {
  constructor(key, model) {
    return new Error(`Missing key: ${model}.${key}`)
  }
}
