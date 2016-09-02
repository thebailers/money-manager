var path = require('path');
var webpack = require('webpack');
var jeet = require('jeet');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
    // js
    // {
    //   test: /\.js$/,
    //   loaders: ['babel'],
    //   include: path.join(__dirname, 'client')
    // },
    // CSS
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
      // query: {
      //   "stage": 0,
      //   "plugins": ["react-transform:after"],
      //   "extra": {
      //     "react-transform": {
      //       "transforms": [{
      //         "transform": "react-transform-hmr",
      //         "imports": ["react"],
      //         "locals": ["module"]
      //       }, {
      //         "transform": "react-transform-catch-errors",
      //         "imports": ["react", "redbox-react"]
      //       }]
      //     }
      //   }
      // }
    }
    ]
  }
};
