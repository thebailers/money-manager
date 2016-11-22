var Income = require('../../../app/models/income')
var router = require('express').Router()
var logger = require('../../util/logger')

router.route('/')
  .get(function (req, res) {
    Income.find(function (err, income) {
      if (err) {
        res.send(err)
      }
      res.json(income)
    })
  })
  .post(function (req, res) {
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

router.route('/:id')
  .get(function (req, res) {
    Income.findById(req.params.id, function (err, income) {
      if (err) {
        res.send(err)
      }
      res.json(income)
    })
  })
  .put(function (req, res) {
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
  .delete(function (req, res) {
    Income.remove({
      _id: req.params.id
    }, function (err, income) {
      if (err) {
        res.send(err)
      }

      res.json({ message: 'Successfully deleted' })
    })
  })

module.exports = router
