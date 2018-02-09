module.exports = class InvalidTypeError extends Error {
  constructor(candidateType, validType, key, model) {
    throw new Error(
      `Invalid type (${candidateType}) for: ${model}.${key}. Expected type: ${validType}`
    )
  }
}
