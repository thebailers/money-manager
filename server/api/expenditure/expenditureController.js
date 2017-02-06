var Expenditure = require('./expenditureModel')

exports.get = function (req, res) {
  Expenditure.find(function (err, expenditure) {
    if (err) {
      res.send(err)
    }
    res.json(expenditure)
  })
}

exports.post = function (req, res) {
  var expenditure = new Expenditure()
  expenditure.name = req.body.name
  expenditure.amount = req.body.amount
  expenditure.category = req.body.category
  expenditure.date = req.body.date
  expenditure.type = req.body.type

  expenditure.save(function (err) {
    if (err) {
      res.send(err)
    }

    res.json({ message: 'Expenditure created!' })
  })
}

exports.getOne = function (req, res) {
  Expenditure.findById(req.params.id, function (err, expenditure) {
    if (err) {
      res.send(err)
    }
    res.json(expenditure)
  })
}

exports.put = function (req, res) {
  Expenditure.findById(req.params.id, function (err, expenditure) {
    if (err) {
      res.send(err)
    }

    expenditure.name = req.body.name
    expenditure.amount = req.body.amount
    expenditure.category = req.body.category
    expenditure.date = req.body.date
    expenditure.type = req.body.type

    expenditure.save(function (err) {
      if (err) {
        res.send(err)
      }
      res.json({ message: 'expenditure updated!' })
    })
  })
}

exports.delete = function (req, res) {
  Expenditure.remove({
    _id: req.params.id
  }, function (err, expenditure) {
    if (err) {
      res.send(err)
    }
    res.json({ message: 'Successfully deleted' })
  })
}
