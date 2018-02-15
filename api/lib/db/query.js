const readDB = require('./readDB')

function filterTableByAttributes(table, attributes) {
  return table.filter(node => (
    Object.keys(attributes).every(key => (
      node[key] === attributes[key]
    ))
  ))
}

function sortNodes(nodes, sortBy, order) {
  return nodes.sort((matchA, matchB) => (
    order === 0 ? (
      Math.round(Math.random()) ? 1 : -1
    ) : (
      matchA[sortBy] > matchB[sortBy] ?
        1 * order :
        matchB[sortBy] > matchA[sortBy] ?
          -1 * order :
          0
    )
  ))
}

function splitArrayByLimit(array, limit) {
  return array.reduce((results, match) => (
    results[results.length - 1].length === limit ?
      results.concat([[match]]) :
      Object.assign([], results, {
        [results.length - 1]: results[results.length - 1].concat(match)
      })
  ), [[]])
}

function flatTables(tables) {
  return Object.keys(tables).reduce((allNodes, key) => (
    allNodes.concat(tables[key])
  ), [])
}

function queryNodes(nodes, queryObject) {
  const {
    limit,
    page,
    sortBy,
    order,
    attributes
  } = queryObject

  const attributesMatch = filterTableByAttributes(nodes, attributes)
  const sortedResults = sortNodes(attributesMatch, sortBy, order)

  let pagedResults
  if (limit > -1) {
    const splittedResults = splitArrayByLimit(sortedResults, limit)
    pagedResults = splittedResults[page]
  } else {
    pagedResults = sortedResults
  }

  return pagedResults
}

function embedResources(baseResults, options) {
  if (!options || !options.length) {
    return Promise.resolve(baseResults)
  }

  return Promise.all(baseResults.reduce((prev, result) => (
    prev.concat(Promise.all(prev).then(() => (
      query({
        table: options[0].resource,
        queryObject: {
          limit: Number(options[0].limit) || 10,
          page: Number(options[0].page) || 0,
          sortBy: options[0].sortBy || 'createdAt',
          order: Number(options[0].order),
          attributes: {
            [options[0].attributes.$field]: result[options[0].attributes.$parentField]
          },
          embed: options.slice(1)
        }
      }).then(embed => ({
        ...result,
        [options[0].resource]: embed
      })).catch(err => {
        console.log('err', err)
      })
    )))
  ), []))
}

function query({ id, table, queryObject }) {
  return readDB().then((tables) => {
    const nodes = table ? tables[table] : flatTables(tables)
    let result
    if (id) {
      result = nodes.filter(node => node.id === id)
    } else {
      result = queryNodes(nodes, queryObject)
    }
    return embedResources(result, queryObject.embed)
  })
}

module.exports = query
