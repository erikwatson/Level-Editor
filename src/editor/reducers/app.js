const { combineReducers } = require('redux')

const terrain = require('./terrain-editor/terrain-editor.js')
const tile = require('./tile-editor/tile-editor.js')

const view = (state = 'terrain', action) => {
  switch (action.type) {
    case 'APP_SET_VIEW':
      state = action.value

    default:
      return state
  }
}

// the real app reducer would combine the state for all views and sidebars
const appReducer = combineReducers({
  view,
  terrain,
  tile
})

module.exports = appReducer
