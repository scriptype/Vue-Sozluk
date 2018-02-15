const querystring = require('querystring')
const express = require('express')
const shortid = require('shortid')
const slug = require('slug')
const TopicModel = require('../models/Topic')
const db = require('../lib/db')

const topicsApi = express.Router()

topicsApi.get('/', ({ query }, res) => {
  if (query) {
    const queryObject = {
      table: 'topics',
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
    db.readTable('topics')
      .then(table => res.json(table))
      .catch(err => res.sendStatus(404, err))
  }
})

topicsApi.put('/', (req, res) => {
  db
    .query({
      table: 'topics',
      queryObject: {
        attributes: {
          title: slug(req.body.title)
        }
      }
    })
    .then((results) => {
      if (results.length) {
        res.status(400).send('Same topic already exists!')
      } else {
        const modelData = {
          createdAt: Date.now(),
          lastUpdatedAt: Date.now(),
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
      }
    })
})

topicsApi.delete('/', (req, res) => {
  db.flushTable('topics')
    .then(() => res.sendStatus(204))
    .catch(err => res.status(500).send(err.toString()))
})

topicsApi.get('/:id', ({ query, params }, res) => {
  if (query) {
    let embed = {}
    if (query.embed) {
      embed = query.embed.map(e => querystring.parse(e))
      embed = embed.map(e => Object.assign({}, e, {
        attributes: querystring.parse(e.attributes || '{}')
      }))
    }
    const queryObject = {
      id: params.id,
      table: 'topics',
      queryObject: {
        limit: Number(query.limit) || 10,
        page: Number(query.page) || 0,
        sortBy: query.sortBy || 'createdAt',
        order: Number(query.order),
        attributes: query.attributes || {},
        embed
      }
    }
    db.query(queryObject)
      .then(result => res.json(result))
      .catch(err => res.status(404).send(err))
  } else {
    db.findNode('topics', params.id)
      .then(node => res.json(node))
      .catch(err => res.status(404).send(err.toString()))
  }
})

topicsApi.delete('/:id', (req, res) => {
  db.deleteNode('topics', req.params.id)
    .then(() => res.json(204))
    .catch(err => res.status(500).send(err.toString()))
})

module.exports = topicsApi
