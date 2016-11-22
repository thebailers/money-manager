var Expenditure = require('../../../app/models/expenditure')
var router = require('express').Router()
var logger = require('../../util/logger')

router.route('/')
  .get(function (req, res) {
    Expenditure.find(function (err, expenditure) {
      if (err) {
        res.send(err)
      }
      res.json(expenditure)
    })
  })
  .post(function (req, res) {
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

router.route('/:id')
  .get(function (req, res) {
    Expenditure.findById(req.params.id, function (err, expenditure) {
      if (err) {
        res.send(err)
      }
      res.json(expenditure)
    })
  })
  .put(function (req, res) {
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
  .delete(function (req, res) {
    Expenditure.remove({
      _id: req.params.id
    }, function (err, expenditure) {
      if (err) {
        res.send(err)
      }
      res.json({ message: 'Successfully deleted' })
    })
  })

module.exports = router
