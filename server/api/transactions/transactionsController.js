var Transaction = require('./transactionsModel')

exports.get = function (req, res) {
  Transaction.find(function (err, transaction) {
    if (err) {
      res.send(err)
    }
    res.json(transaction)
  })
}

exports.post = function (req, res) {
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
}

exports.getOne = function (req, res) {
  Transaction.findById(req.params.id, function (err, transaction) {
    if (err) {
      res.send(err)
    }

    res.json(transaction)
  })
}

exports.put = function (req, res) {
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
}

exports.delete = function (req, res) {
  Transaction.remove({
    _id: req.params.id
  }, function (err, transaction) {
    if (err) {
      res.send(err)
    }
    res.json(transaction)
  })
}