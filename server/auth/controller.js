var User = require('../api/user/userModel')
var signToken = require('./auth').signToken

exports.signin = function(req, res, next) {
  // req.user will be there for middleware
  // verify user. Then we can just create a token
  // and send it back for the client to consume
  var token = signToken(req.user._id, req.user.username)
  res.json({ token: token })
}
