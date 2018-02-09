const express = require('express')

const rootApi = express.Router()

rootApi.get('/', (req, res) => {
  res.json({ message: 'welcome to api' })
})

module.exports = rootApi
