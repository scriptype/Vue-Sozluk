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

// Middlewares
app.use(bodyParser())
app.use(helmet())
app.use(cors(corsOptions))

// API Routing
app.use('/', RootController)
app.use('/entry', EntryController)
app.use('/topic', TopicController)
app.use('/user', UserController)

// Start the server
app.listen(8081, () => {
  console.info('Api server started at :8081')
})
