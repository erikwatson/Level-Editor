const { combineReducers } = require('redux')

const terrain = require('./terrain-editor/terrain-editor.js')
const map = require('./map-editor/map-editor.js')

const view = (state = 'terrain', action) => {
  switch (action.type) {
    case 'APP_SET_VIEW':
      return action.value

    default:
      return state
  }
}

const spritesheets = (state = [], action) => {
  switch (action.type) {
    case 'SPRITESHEETS_SET':
      return action.value

    default:
      return state
  }
}

// the real app reducer would combine the state for all views and sidebars
const appReducer = combineReducers({
  view,
  terrain,
  map,
  spritesheets
})

module.exports = appReducer
