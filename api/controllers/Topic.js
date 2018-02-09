const express = require('express')

const topicApi = express.Router()

topicApi.get('/', (req, res) => {
  res.json({ message: 'hello this is topic' })
})

module.exports = topicApi

/*
 *app.put('/topic', (req, res) => {
 *  db.topics.push(Object.assign({}, JSON.parse(req.body.topic), {
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
