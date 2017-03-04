var User = require('../api/user/userModel')
var signToken = require('./auth').signToken

exports.signin = function(req, res, next) {
  console.log('-------------------controller')
  console.log(req.body);
  console.log('-------------------')
  // req.user will be there for middleware
  // verify user. Then we can just create a token
  // and send it back for the client to consume
  var token = signToken(req.user._id)
  res.json({ token: token })
}
