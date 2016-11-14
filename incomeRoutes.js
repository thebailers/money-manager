var Income = require('./app/models/income')
var incomeRouter = require('express').Router()

incomeRouter.get('/:id', function (req, res) {
  Income.findById(req.params.id, function (err, income) {
    if (err) {
      res.send(err)
    }
    res.json(income)
  })
})

incomeRouter.put('/:id', function (req, res) {
  Income.findById(req.params.id, function (err, income) {
    if (err) {
      res.send(err)
    }

    income.name = req.body.name
    income.amount = req.body.amount
    income.category = req.body.category
    income.date = req.body.date
    income.type = req.body.type

    income.save(function (err) {
      if (err) {
        res.send(err)
      }

      res.json({ message: 'Income updated!' })
    })
  })
})

incomeRouter.delete('/:id', function (req, res) {
  Income.remove({
    _id: req.params.id
  }, function (err, income) {
    if (err) {
      res.send(err)
    }

    res.json({ message: 'Successfully deleted' })
  })
})

module.exports = incomeRouter
