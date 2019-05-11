const mongoose = require('mongoose')
const config = require('.')

// prettier-ignore
// eslint-disable-next-line max-len
// const DB_URL = `mongodb://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.database}`
const DB_URL = `mongodb://${config.db.host}:${config.db.port}/${config.db.database}`
console.log(DB_URL)

mongoose.set('debug', true)
mongoose.set('useFindAndModify', false)

mongoose.connect(DB_URL, config.db.options)

const connection = mongoose.connection

connection.once('open', () => {
  console.log(`Mongoose successfully connected.`)
  console.log(`Options: ${JSON.stringify(config.db)}`)
})

connection.on('error', error => {
  console.error(error)
})

module.exports = connection

// db.createUser({
//   user: 'eventTinder',
//   pwd: '9rXTXmSJCXsspCNc',
//   roles: ['readWrite']
// })
