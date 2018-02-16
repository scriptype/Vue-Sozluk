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

usersApi.post('/', (req, res) => {
  const modelData = {
    createdAt: Date.now(),
    name: req.body.name,
    id: shortid.generate()
  }

  try {
    const model = new UserModel(modelData)
    db.createNode('users', model.toJSON())
      .then(() => res.sendStatus(201))
      .catch(err => res.sendStatus(500, err))
  } catch (err) {
    res.status(400).send(err.toString())
  }
})

usersApi.delete('/', (req, res) => {
  db.flushTable('users')
    .then(() => res.sendStatus(204))
    .catch(err => res.status(500).send(err.toString()))
})

usersApi.get('/:id', (req, res) => {
  db.findNode('users', req.params.id)
    .then(node => res.json(node))
    .catch(err => res.status(404).send(err.toString()))
})

usersApi.delete('/:id', (req, res) => {
  db.deleteNode('users', req.params.id)
    .then(() => res.json(204))
    .catch(err => res.status(500).send(err.toString()))
})

module.exports = usersApi
