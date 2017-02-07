var jwt = require('jsonwebtoken')
var expressJwt = require('express-jwt')
var config = require('../config/config')
var checkToken = expressJwt({ secret: config.secrets.jwt })
var User = require('../api/user/userModel')

exports.decodeToken = function() {
  function (req, res, next) {
    // make it optional to place token on query string
    // if it is, place it on the headers where it should be
    // so checkToken can see it. See follow the 'Bearer 034930493' format
    // so checkToken can see it and decode it
  }
}
