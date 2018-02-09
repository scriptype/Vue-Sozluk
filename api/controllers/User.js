const express = require('express')
const shortid = require('shortid')
const UserModel = require('../models/User')
const db = require('../lib/db')

const userApi = express.Router()

userApi.get('/', (req, res) => {
  res.json({ message: 'hello this is user' })
})

module.exports = userApi

userApi.put('/', (req, res) => {
  const modelData = {
    createdAt: Date.now(),
    name: req.body.user.name,
    id: shortid.generate()
  }

  let model
  try {
    model = new UserModel(modelData)
  } catch (e) {
    return res.sendStatus(400)
  }

  db.createNode('users', model.toJSON)
    .then(() => res.sendStatus(201))
    .catch(err => res.sendStatus(500, err))
})
