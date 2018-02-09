const express = require('express')

const userApi = express.Router()

userApi.get('/', (req, res) => {
  res.json({ message: 'hello this is user' })
})

module.exports = userApi

/*
 *app.put('/user', (req, res) => {
 *  db.users.push(Object.assign({}, JSON.parse(req.body.user), {
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
