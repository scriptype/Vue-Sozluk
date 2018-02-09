const express = require('express')
const shortid = require('shortid')
const UserModel = require('../models/User')
const db = require('../lib/db')

const usersApi = express.Router()

usersApi.get('/', (req, res) => {
  db.readTable('users')
    .then(table => res.json(table))
    .catch(err => res.sendStatus(404, err))
})

usersApi.put('/', (req, res) => {
  const modelData = {
    createdAt: Date.now(),
    name: req.body.user.name,
    id: shortid.generate()
  }

  try {
    const model = new UserModel(modelData)
    db.createNode('users', model.toJSON())
      .then(() => res.sendStatus(201))
      .catch(err => res.sendStatus(500, err))
  } catch (e) {
    res.sendStatus(400)
  }
})

usersApi.delete('/', (req, res) => {
  db.flushTable('users')
    .then(() => res.sendStatus(204))
    .catch(err => res.sendStatus(500, err))
})

usersApi.get('/:id', (req, res) => {
  db.findNode('users', req.params.id)
    .then(node => res.json(node))
    .catch(err => res.sendStatus(404, err))
})

usersApi.delete('/:id', (req, res) => {
  db.deleteNode('users', req.params.id)
    .then(() => res.json(204))
    .catch(err => res.sendStatus(500, err))
})

module.exports = usersApi
