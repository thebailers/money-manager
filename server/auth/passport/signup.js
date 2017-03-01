const user = require('../../api/user/userModel')
const PassportLocalStrategy = require('passport-local').Strategy

// Return Passport Local Strategy obj
module.exports = new PassportLocalStrategy({
  session: false,
  passReqToCallback: true
}, (req, username, password, done) => {

  const userData = {
    username: username.trim(),
    password: password.trim()
  }

  const newUser = new User(userData)

  newUser.save((err) => {
    if (err) return done(err)

    return done(null)
  })

})
