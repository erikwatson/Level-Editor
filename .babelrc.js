const presets = ['@babel/env', '@babel/react']
const plugins = [
  'syntax-async-functions',
  'transform-async-to-generator',
  '@babel/plugin-syntax-dynamic-import'
]

module.exports = {
  presets,
  plugins
}
