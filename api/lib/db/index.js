const fs = require('fs')
const readDB = require('./readDB')
const query = require('./query')
const DB_PATH = require('../../config').DB_PATH

function flush() {
  return new Promise((resolve, reject) => {
    fs.writeFile(DB_PATH, '', (err) => {
      if (err) {
        return reject(err)
      }
      return resolve()
    })
  })
}

/*
 * @Private
 * */
function updateTable(tableName, cb) {
  return readDB().then((db) => {
    const dbCopy = Object.assign({}, db)
    const newTable = cb(dbCopy[tableName])
    dbCopy[tableName] = newTable
    fs.writeFile(DB_PATH, JSON.stringify(dbCopy), (err) => {
      if (err) {
        return Promise.reject(err)
      }
      return Promise.resolve()
    })
  })
}

function createTable(tableName, initialData) {
  return updateTable(tableName, () => {
    if (initialData && initialData.length) {
      return initialData
    }
    return []
  })
}

function readTable(tableName) {
  return readDB().then(db => db[tableName])
}

function flushTable(tableName) {
  return updateTable(tableName, () => ([]))
}

function createNode(tableName, node) {
  return updateTable(tableName, table => table.concat(node))
}

function findNode(tableName, id) {
  return readTable(tableName).then(table => (
    table.find(node => node.id === id)
  ))
}

function updateNode(tableName, id, data) {
  return updateTable(tableName, (table) => {
    const tableCopy = Object.assign([], table)
    const node = tableCopy.find(n => n.id === id)
    Object.assign(node, data)
    return tableCopy
  })
}

function deleteNode(tableName, id) {
  return updateTable(tableName, (table) => {
    const tableCopy = Object.assign([], table)
    const node = tableCopy.find(n => n.id === id)
    const index = tableCopy.indexOf(node)
    tableCopy.splice(index, 1)
    return tableCopy
  })
}

module.exports = {
  readDB,
  flush,
  query,

  readTable,
  updateTable,
  createTable,
  flushTable,

  createNode,
  findNode,
  updateNode,
  deleteNode
}
