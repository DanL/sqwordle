const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  output: {
    // publicPath is necessary for remotely-hosted static assets
    publicPath: 'https://www.sqwordle.com/dist/release/',
  },
  devtool: false,
})
