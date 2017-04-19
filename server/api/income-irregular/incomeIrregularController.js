var IncomeIrregular = require('./incomeIrregularModel')

exports.get = function (req, res) {
  Income.find({ user: req.user._id }, function (err, income) {
    if (err) {
      res.send(err)
    }
    res.json(income)
  })
}

exports.post = function (req, res) {
  var income = new IncomeIrregular()
  income.name = req.body.name
  income.amount = req.body.amount
  income.category = req.body.category
  income.date = req.body.date
  income.type = req.body.type
  income.user = req.user._id

  income.save(function (err) {
    if (err) {
      res.send(err)
    }
    res.json({ message: 'Income added!' })
  })
}

exports.getOne = function (req, res) {
  IncomeIrregular.findById(req.params.id, function (err, income) {
    if (err) {
      res.send(err)
    }
    res.json(income)
  })
}

exports.put = function (req, res) {
  IncomeIrregular.findById(req.params.id, function (err, income) {
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
}

exports.delete = function (req, res) {
  IncomeIrregular.remove({
    _id: req.params.id
  }, function (err, income) {
    if (err) {
      res.send(err)
    }

    res.json({ message: 'Successfully deleted' })
  })
}
