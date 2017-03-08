var router = require('express').Router()
var logger = require('../../util/logger')
var controller = require('./transactionsController')
// var auth = require('../../auth/auth');
var authenticate = require('../../auth/auth').authenticate;

// var checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.route('/')
  .get(authenticate, controller.get)
  .post(controller.post)

router.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete)

module.exports = router
