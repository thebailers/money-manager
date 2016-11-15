var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('../webpack.config.dev')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var morgan = require('morgan')

var app = express()
var compiler = webpack(config)

var transactionsRouter = require('./routes/transactionRoutes')
var expenditureRouter = require('./routes/expenditureRoutes')
var incomeRouter = require('./routes/incomeRoutes')

mongoose.connect('mongodb://localhost:27017/cashbook')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

app.use('/api/transactions', transactionsRouter)
app.use('/api/expenditure', expenditureRouter)
app.use('/api/income', incomeRouter)

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'))
})

app.listen(7770, 'localhost', function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:7770')
})
