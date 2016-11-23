var path = require('path')
var express = require('express')
var app = express()
var api = require('./api/')
var err = require('./middleware/err')

require('./middleware/appMiddleware')(app)

app.use('/api', api)

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'))
})

app.use(err)

module.exports = app
