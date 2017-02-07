var webpack = require('webpack')
var config = require('../../webpack.config.dev')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var morgan = require('morgan')

var compiler = webpack(config)

module.exports = function(app) {
	app.use(morgan('dev'))
	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(bodyParser.json())

	app.use(require('webpack-dev-middleware')(compiler, {
	  noInfo: true,
	  publicPath: config.output.publicPath
	}))

	app.use(require('webpack-hot-middleware')(compiler))
}
