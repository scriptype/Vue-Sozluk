const express = require('express')
const shortid = require('shortid')
const TopicModel = require('../models/Topic')
const db = require('../lib/db')

const topicsApi = express.Router()

topicsApi.get('/', (req, res) => {
  db.readTable('topics')
    .then(table => res.json(table))
    .catch(err => res.sendStatus(404, err))
})

topicsApi.put('/', (req, res) => {
  const modelData = {
    createdAt: Date.now(),
    id: shortid.generate(),
    title: req.body.title,
    userID: req.body.userID
  }

  try {
    const model = new TopicModel(modelData)
    db.createNode('topics', model.toJSON())
      .then(() => res.sendStatus(201))
      .catch(err => res.sendStatus(500, err))
  } catch (err) {
    res.status(400).send(err.toString())
  }
})

topicsApi.delete('/', (req, res) => {
  db.flushTable('topics')
    .then(() => res.sendStatus(204))
    .catch(err => res.status(500).send(err.toString()))
})

topicsApi.get('/:id', (req, res) => {
  db.findNode('topics', req.params.id)
    .then(node => res.json(node))
    .catch(err => res.status(404).send(err.toString()))
})

topicsApi.delete('/:id', (req, res) => {
  db.deleteNode('topics', req.params.id)
    .then(() => res.json(204))
    .catch(err => res.status(500).send(err.toString()))
})

module.exports = topicsApi
