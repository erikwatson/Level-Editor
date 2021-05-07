import * as React from 'react'
const DOM = require('react-dom')
const { Provider } = require('react-redux')

import App from './editor/app'

const store = require('./store.ts')
document.addEventListener('DOMContentLoaded', event => {
  DOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('#app-container')
  )
})
