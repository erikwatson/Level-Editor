const { createStore } = require('redux')
const { composeWithDevTools } = require('redux-devtools-extension')
const reducer = require('./editor/reducers/app.ts')

const initialState = {}

const store = createStore(reducer, initialState, composeWithDevTools())

export default store
