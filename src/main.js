const React = require('react')
const DOM = require('react-dom')

const App = require('./editor/app.js')

document.addEventListener('DOMContentLoaded', event => {
  DOM.render(<App />, document.querySelector('#app-container'))
})
