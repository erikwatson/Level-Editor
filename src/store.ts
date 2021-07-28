import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './editor/reducers/app'

const initialState = {}
const store = createStore(reducer, initialState, composeWithDevTools())

export default store
