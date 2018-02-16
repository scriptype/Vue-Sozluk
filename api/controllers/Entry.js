const express = require('express')
const shortid = require('shortid')
const EntryModel = require('../models/Entry')
const db = require('../lib/db')

const entriesApi = express.Router()

entriesApi.get('/', ({ query }, res) => {
  if (query) {
    const queryObject = {
      table: 'entries',
      queryObject: {
        limit: Number(query.limit) || 10,
        page: Number(query.page) || 0,
        sortBy: query.sortBy || 'createdAt',
        order: Number(query.order),
        attributes: query.attributes || {}
      }
    }
    db.query(queryObject)
      .then(result => res.json(result))
      .catch(err => res.sendStatus(404, err))
  } else {
    db.readTable('entries')
      .then(table => res.json(table))
      .catch(err => res.sendStatus(404, err))
  }
})

entriesApi.post('/', (req, res) => {
  const modelData = {
    createdAt: Date.now(),
    lastUpdatedAt: Date.now(),
    id: shortid.generate(),
    content: req.body.content,
    userID: req.body.userID,
    topicID: req.body.topicID
  }

  try {
    const model = new EntryModel(modelData)
    db.createNode('entries', model.toJSON())
      .then(() => res.sendStatus(201))
      .catch(err => res.sendStatus(500, err))
  } catch (err) {
    res.status(400).send(err.toString())
  }
})

module.exports = entriesApi
