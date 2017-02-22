var express = require('express')
var session = require('express-session')
var flash = require('connect-flash')
var webpack = require('webpack')
var config = require('../../webpack.config.dev')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var passport = require('passport')
var errorlog = require('express-errorlog')

var compiler = webpack(config)

module.exports = function(app) {
	app.use(morgan('dev'))
	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(bodyParser.json())
	app.use(session({ secret: 'boing'}))
	app.use(flash())
	app.use(passport.initialize())
	app.use(passport.session())
	app.use(require('webpack-dev-middleware')(compiler, {
	  noInfo: true,
	  publicPath: config.output.publicPath
	}))

	app.use(require('webpack-hot-middleware')(compiler))
	app.use(errorlog)
	app.use(function(err, req, res, next) {
	  res.json(err);
	})
}
