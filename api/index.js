const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')

const RootController = require('./controllers/Root')
const EntryController = require('./controllers/Entry')
const TopicController = require('./controllers/Topic')
const UserController = require('./controllers/User')

const app = express()

const corsWhiteList = [
  'http://localhost:8080',
  'http://localhost:8081',
  'http://localhost:8082'
]

const corsOptions = {
  origin(origin, callback) {
    const originIsUndefined = !origin || origin === 'null'
    if (originIsUndefined || corsWhiteList.indexOf(origin) > -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// Middlewares
app.use(bodyParser())
app.use(helmet())
app.use(cors(corsOptions))

// API Routing
app.use('/', RootController)
app.use('/entries', EntryController)
app.use('/topics', TopicController)
app.use('/users', UserController)

// Start the server
app.listen(8081, () => {
  console.info('Api server started at :8081')
})
