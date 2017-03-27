var router = require('express').Router()
var verifyUser = require('./auth').verifyUser
var controller = require('./controller')
var authenticate = require('./auth').authenticate;

// before we send back a jwt, lets check
// the password and username match what is in the db
router.post('/signin', verifyUser(), controller.signin)
router.get('/check-auth', authenticate)

module.exports = router
