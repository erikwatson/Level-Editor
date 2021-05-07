'use strict'
exports.__esModule = true
var React = require('react')
var DOM = require('react-dom')
var Provider = require('react-redux').Provider
var store = require('./store.ts')
var App = require('./editor/app.tsx')
document.addEventListener('DOMContentLoaded', function(event) {
  DOM.render(
    React.createElement(
      Provider,
      { store: store },
      React.createElement(App, null)
    ),
    document.querySelector('#app-container')
  )
})
