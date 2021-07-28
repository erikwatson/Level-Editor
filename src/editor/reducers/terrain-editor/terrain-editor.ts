import { combineReducers } from 'redux'

const terrainEditor = combineReducers({
  test: (state = true, action) => {
    return state
  }
})

export default terrainEditor
