var router = require('express').Router()
var logger = require('../../util/logger')
var controller = require('./expenditureController')
var authenticate = require('../../auth/auth').authenticate;

router.route('/')
  .get(authenticate, controller.get)
  .post(authenticate, controller.post)

router.route('/:id')
  .get(authenticate, controller.getOne)
  .put(authenticate, controller.put)
  .delete(authenticate, controller.delete)

module.exports = router
