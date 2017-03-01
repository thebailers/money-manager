var path = require('path')
var express = require('express')
var passport = require('passport')
var app = express()
var err = require('./middleware/err')
var mongoose = require('mongoose')
var config = require('./config/config')

mongoose.connect(config.db.url)

if (config.seed) {
  require('./util/seed')
}

require('./middleware/appMiddleware')(app)

// Initialise passport tuts
// var initPassport = require('./auth/passport/init')
// initPassport(passport)

// routes
var api = require('./api/')
var auth = require('./auth/routes')
app.use('/auth', auth)
app.use('/api', api)

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'))
})

app.use(err)

module.exports = app
