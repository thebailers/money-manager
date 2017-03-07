var User = require('../api/user/userModel')
var signToken = require('./auth').signToken

exports.signin = function(req, res, next) {
  console.log(req)
  // req.user will be there for middleware
  // verify user. Then we can just create a token
  // and send it back for the client to consume
  var token = signToken(req.user._id, req.user.username, req.user.firstname)
  res.json({ token: token })
}
