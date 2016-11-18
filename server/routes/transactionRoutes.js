var Transaction = require('../../app/models/transactions')
var transactionsRouter = require('express').Router()

transactionsRouter.route('/')
  .get(function (req, res) {
    Transaction.find(function (err, transaction) {
      if (err) {
        res.send(err)
      }
      res.json(transaction)
    })
  })
  .post(function (req, res) {
    var transaction = new Transaction()
    transaction.name = req.body.name
    transaction.amount = req.body.amount
    transaction.date = req.body.date

    transaction.save(function (err) {
      if (err) {
        res.send(err)
      }
      res.json(transaction)
    })
  })

transactionsRouter.get('/:id', function (req, res) {
  Transaction.findById(req.params.id, function (err, transaction) {
    if (err) {
      res.send(err)
    }

    res.json(transaction)
  })
})


transactionsRouter.route('/:id')
  .put(function (req, res) {
    Transaction.findById(req.params.id, function (err, transaction) {
      if (err) {
        res.send(err)
      }

      transaction.name = req.body.name
      transaction.amount = req.body.amount
      transaction.date = req.body.date

      transaction.save(function (err) {
        if (err) {
          res.send(err)
        }
        res.json(transaction)
      })
    })
  })
  .delete(function (req, res) {
    Transaction.remove({
      _id: req.params.id
    }, function (err, transaction) {
      if (err) {
        res.send(err)
      }
      res.json(transaction)
    })
  })

module.exports = transactionsRouter
