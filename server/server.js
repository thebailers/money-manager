var path = require('path')
var express = require('express')
var app = express()
var api = require('./api/')

require('./middleware/appMiddleware')(app)

app.use('/api', api)

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'))
})

module.exports = app
