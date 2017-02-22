var router = require('express').Router()
var User = require('../api/user/userModel')
// var verifyUser = require('./auth').verifyUser
// var controller = require('./controller')

// before we send back a jwt, lets check
// the password and username match what is in the db
// router.post('/signin', verifyUser(), controller.signin)

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      console.log(user)
      if (err) { return done(err) }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' })
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' })
      }
      return done(null, user)
    })
  }
))

passport.serializeUser(function(user, done) {
  done(null, user.username);
})

passport.deserializeUser(function(username, done) {
  done(null, {username: username});
})

router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }))

module.exports = router
