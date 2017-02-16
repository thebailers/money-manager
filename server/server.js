var path = require('path')
var express = require('express')
var app = express()
var api = require('./api/')
var auth = require('./auth/routes')
var err = require('./middleware/err')
var mongoose = require('mongoose')
var config = require('./config/config')

mongoose.connect(config.db.url)

if (config.seed) {
  require('./util/seed')
}

require('./middleware/appMiddleware')(app)

app.use('/api', api)
app.use('/auth', auth)

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'))
})

app.use(err)

module.exports = app
