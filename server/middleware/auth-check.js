const jwt = require('jsonwebtoken')
const User = require('../api/user/userModel')
const config = require('../config/config')

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end()
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1]

  // decode token using secret key-phrase
  return jwt.verify(token, config.secrets.jwt, (err, decoded) => {
    // 401 for unauthorised status
    if (err) return res.status(401).end()

    const userId = decoded.sub

    // check if a user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) return res.status(401).end()
    })

    return next()
  })
}
