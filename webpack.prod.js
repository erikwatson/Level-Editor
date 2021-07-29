const merge = require('webpack-merge')
const { render, electron } = require('./webpack.common.js')

const prodRender = merge(render, { mode: 'production' })
const prodElectron = merge(electron, { mode: 'production' })

module.exports = [prodRender, prodElectron]
