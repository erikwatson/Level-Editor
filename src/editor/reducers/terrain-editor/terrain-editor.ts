const { combineReducers } = require('redux')

const terrainEditor = combineReducers({
  test: (state = true, action) => {
    return state
  }
})

export default terrainEditor
