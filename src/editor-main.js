const React = require('react')
const DOM = require('react-dom')
const { Provider } = require('react-redux')
const store = require('./store')
const App = require('./editor/app.js')

document.addEventListener('DOMContentLoaded', event => {
  DOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('#app-container')
  )
})
