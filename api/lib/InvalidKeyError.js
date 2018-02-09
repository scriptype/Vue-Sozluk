export default class InvalidKeyError extends Error {
  constructor(key, model) {
    throw new Error(`Invalid key: ${model}.${key}.`)
  }
}
