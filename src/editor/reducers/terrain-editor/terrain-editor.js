const { combineReducers } = require('redux')

const terrainEditor = combineReducers({
  test: (state = true, action) => {
    return state
  }
})

module.exports = terrainEditor
