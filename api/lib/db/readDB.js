const fs = require('fs')
const DB_PATH = require('../../config').DB_PATH

module.exports = function readDB() {
  return new Promise((resolve, reject) => {
    fs.readFile(DB_PATH, 'utf-8', (err, data) => {
      if (err) {
        return reject(err)
      }
      return resolve(JSON.parse(data))
    })
  })
}
