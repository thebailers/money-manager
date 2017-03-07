var path = require('path')
var webpack = require('webpack')

module.exports = {
  // devtool: 'source-map', // production
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './client/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: false
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.styl$/,
        include: path.join(__dirname, 'client'),
        loader: 'style-loader!css-loader!stylus-loader'
      },

      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'client'),
        exclude: /node_modules/
      }
    ]
  },

  eslint: {
    configFile: './.eslintrc'
  },
  node: {
    net: 'empty',
    dns: 'empty'
  }
}
