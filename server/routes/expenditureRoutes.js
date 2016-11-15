var Expenditure = require('../../app/models/expenditure')
var expenditureRouter = require('express').Router()

expenditureRouter.post('/', function (req, res) {
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
})

expenditureRouter.get('/', function (req, res) {
  Expenditure.find(function (err, expenditure) {
    if (err) {
      res.send(err)
    }
    res.json(expenditure)
  })
})

expenditureRouter.get('/:id', function (req, res) {
  Expenditure.findById(req.params.id, function (err, expenditure) {
    if (err) {
      res.send(err)
    }
    res.json(expenditure)
  })
})

expenditureRouter.put('/:id', function (req, res) {
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
})

expenditureRouter.delete('/:id', function (req, res) {
  Expenditure.remove({
    _id: req.params.id
  }, function (err, expenditure) {
    if (err) {
      res.send(err)
    }
    res.json({ message: 'Successfully deleted' })
  })
})

module.exports = expenditureRouter
