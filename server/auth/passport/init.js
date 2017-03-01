var login = require('./login')
var User = require('../../api/user/userModel')

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    console.log('Serialising User: ' + user)
    done(null, user._id)
  })

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      console.log('Deserislising User: ' + user)
      done(err, user)
    })
  })

  // Set up passport strategies
  login(passport)
}
