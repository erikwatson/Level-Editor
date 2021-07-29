const { merge } = require('webpack-merge')
const path = require('path')
const { render, electron } = require('./webpack.common.js')

const devRender = merge(render, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dest'),
    compress: true,
    port: 9000
  }
})

const devElectron = merge(electron, {
  mode: 'development',
  devtool: 'inline-source-map'
})

module.exports = [devElectron, devRender]
