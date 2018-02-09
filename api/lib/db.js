const fs = require('fs')
const path = require('path')

const DB_PATH = path.resolve(__dirname, '..', 'db.json')

function readDB() {
  return new Promise((resolve, reject) => {
    fs.readFile(DB_PATH, 'utf-8', (err, data) => {
      if (err) {
        return reject(err)
      }
      return resolve(JSON.parse(data))
    })
  })
}

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
      Promise.resolve()
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

function query({ id, table, data }) {
  return readDB().then((tables) => {
    if (table) {
      if (id) {
        return tables[table].filter(node => node.id === id)
      }
      return tables[table].filter((node) => {
        const match = Object.keys(data).every(key => (
          node[key] === data[key]
        ))
        return match
      })
    }
    const result = []
    Object.keys(tables).forEach((tableName) => {
      tables[tableName].forEach((node) => {
        if (id) {
          if (node.id === id) {
            result.push(node)
          }
        } else {
          const match = Object.keys(data).every(key => (
            node[key] === data[key]
          ))
          if (match) {
            result.push(node)
          }
        }
      })
    })
    return result
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
