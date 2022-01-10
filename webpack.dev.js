const fs = require('fs')
const { merge } = require('webpack-merge')
const path = require('path')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
})
