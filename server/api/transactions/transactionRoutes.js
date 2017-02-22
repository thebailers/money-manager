var router = require('express').Router()
var logger = require('../../util/logger')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var controller = require('./transactionsController')
// var auth = require('../../auth/auth')
// var checkUser = [auth.decodeToken(), auth.getFreshUser()]

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function(err, user) {
//       if (err) { return done(err) }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' })
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' })
//       }
//       return done(null, user)
//     })
//   }
// ))

router.route('/')
  // .get(passport.authenticate('local', {
  //   successRedirect: '/',
  //   failureRedirect: '/expenditure',
  //   failureFlash: true
  // }), controller.get)
  .get(controller.get)
  .post(controller.post)

router.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete)

module.exports = router
