// tuts
// var LocalStrategy = require('passport-local').Strategy
// var User = require('../../api/user/userModel')
// var bcrypt = require('bcrypt')
//
// module.exports = function(passport) {
//   passport.use('/login', new LocalStrategy({
//     passReqToCallback: true
//   }, function(req, username, password, done) {
//     User.findOne({ 'username': username },
//       function(err, user) {
//         if (err) return done(err)
//
//         if (!user) {
//           console.log('User ' + user + ' does not exist.')
//           return done(null, false, req.flash('message', 'User not found.'))
//         }
//
//         if (!isValidPassword(user, password)) {
//           console.log('Invalid Password')
//           return done(null, false, req.flash('message', 'Invalid Password.'))
//         }
//
//         return done(null, user)
//       })
//   }))
//
//   var isValidPassword = function(user, password) {
//     return bcrypt.compareSync(password, user.password)
//   }
// }


// vlad
const jwt = require('jsonwebtoken')
const User = require('../../api/user/userModel')
const PassportLocalStrategy = require('passport-local').Strategy
const config = require('../../config/config')

// Return the Passport Local Strategy obj
module.exports = new PassportLocalStrategy({
  session: false,
  passReqToCallback: true
}, (req, username, password, done) => {

  const userData = {
    username: username.trim(),
    password: password.trim()
  }

  // find user by email address
  return User.findOne({ username: userData.username }, (err, username) => {
    if (err) return done(err)

    if (!user) {
      const error = new Error('Incorrect username or password.')
      error.name = 'IncorrectCredentialsError'

      return done(error)
    }
  })

  // check if a hashed user's pw is equal to value in db
  return user.comparePassword(userData.password, (passwordErr, isMatch) => {
    if (err) return done(err)

    if (!isMatch) {
      const error = new Error('Incorrect username or password.')
      error.name = 'IncorrectCredentialsError'

      return done(error)
    }

    const payload = {
      sub: user._id
    }

    // create a token String
    const token = jwt.sign(payload, config.secrets.jwt)
    const data = {
      username: user.username
    }

    return done(null, token, data)
  })

})
