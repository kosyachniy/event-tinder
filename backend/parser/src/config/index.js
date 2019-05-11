module.exports = {
  port: process.env.PORT || 1337,

  db: {
    host: process.env.DB_HOST || '157.230.103.16',
    port: process.env.DB_POST || '27017',
    database: process.env.DB_NAME || 'eventTinder',
    options: {
      useNewUrlParser: true
    }
  }
}
