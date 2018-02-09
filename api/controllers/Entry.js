const express = require('express')

const entryApi = express.Router()

entryApi.get('/', (req, res) => {
  res.json({ message: 'hello this is entry' })
})

module.exports = entryApi

/*
 *app.put('/entry', (req, res) => {
 *  db.entries.push(Object.assign({}, JSON.parse(req.body.entry), {
 *    createdAt: Date.now()
 *  }))
 *  fs.writeFile('db.json', JSON.stringify(db), err => {
 *    if (err) {
 *      return res.sendStatus(500)
 *    }
 *    res.send(201)
 *  })
 *})
 */
