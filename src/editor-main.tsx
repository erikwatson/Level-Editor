import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './editor/app'
import store from './store'

document.addEventListener('DOMContentLoaded', event => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('#app-container')
  )
})
