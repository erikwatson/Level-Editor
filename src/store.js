const { createStore } = require('redux')
const { composeWithDevTools } = require('redux-devtools-extension')
const reducer = require('./editor/reducers/app')

const initialState = {}

const store = createStore(reducer, initialState, composeWithDevTools())

module.exports = store
