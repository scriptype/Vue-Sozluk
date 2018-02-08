const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')

const db = require('./db')

const app = express()

const corsWhiteList = [
  'http://localhost:8080'
]

const corsOptions = {
  origin(origin, callback) {
    if (!origin || corsWhiteList.indexOf(origin) > -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(bodyParser())
app.use(helmet())
app.use(cors(corsOptions))

app.get('/', (req, res) => {
  res.send('welcome to api')
})

app.put('/user', (req, res) => {
  db.users.push(Object.assign({}, JSON.parse(req.body.user), {
    createdAt: Date.now()
  }))
  fs.writeFile('db.json', JSON.stringify(db), err => {
    if (err) {
      return res.sendStatus(500)
    }
    res.send(201)
  })
})

app.put('/entry', (req, res) => {
  db.entries.push(Object.assign({}, JSON.parse(req.body.entry), {
    createdAt: Date.now()
  }))
  fs.writeFile('db.json', JSON.stringify(db), err => {
    if (err) {
      return res.sendStatus(500)
    }
    res.send(201)
  })
})

app.put('/topic', (req, res) => {
  db.topics.push(Object.assign({}, JSON.parse(req.body.topic), {
    createdAt: Date.now()
  }))
  fs.writeFile('db.json', JSON.stringify(db), err => {
    if (err) {
      return res.sendStatus(500)
    }
    res.send(201)
  })
})

app.listen(8081, () => {
  console.info('Api server started at :8081')
})
