var Transaction = require('./app/models/transactions')
var Expenditure = require('./app/models/expenditure')
var Income = require('./app/models/income')

var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.config.dev')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var morgan = require('morgan')

var app = express()
var compiler = webpack(config)

var transactionsRouter = require('./transactionRoutes')
var expenditureRouter = require('./expenditureRoutes')
var incomeRouter = require('./incomeRoutes')

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

app.get('/api/income', function (req, res) {
  Income.find(function (err, income) {
    if (err) {
      res.send(err)
    }
    res.json(income)
  })
})

app.post('/api/income', function (req, res) {
  var income = new Income()
  income.name = req.body.name
  income.amount = req.body.amount
  income.category = req.body.category
  income.date = req.body.date
  income.type = req.body.type

  income.save(function (err) {
    if (err) {
      res.send(err)
    }
    res.json({ message: 'Income added!' })
  })
})

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(7770, 'localhost', function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:7770')
})
