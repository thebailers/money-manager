// var router = require('express').Router()
// var logger = require('../../util/logger')
// var passport = require('passport')
// var controller = require('./transactionsController')
//
// var isAuthenticated = function (req, res, next) {
// 	if (req.isAuthenticated()) {
//     console.log('is authenticated')
// 		return next();
//   }
//
//   console.log('is not authenticated!')
// 	res.redirect('/login');
// }
//
// router.route('/')
//   .get(isAuthenticated, controller.get)
//   .post(controller.post)
//
// router.route('/:id')
//   .get(controller.getOne)
//   .put(controller.put)
//   .delete(controller.delete)
//
// module.exports = router
