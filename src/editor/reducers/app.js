const { combineReducers } = require('redux')

const terrain = require('./terrain-editor/terrain-editor.js')
const tile = require('./tile-editor/tile-editor.js')

// Change the properties of the View
const view = (
  state = { width: 1280, height: 720, colour: '#000000', fullScreen: true },
  action
) => {
  switch (action.type) {
    case 'VIEW_SET_FULLSCREEN':
      return { ...state, fullScreen: action.value }

    case 'VIEW_SET_WIDTH':
      return { ...state, width: parseInt(action.value) }

    case 'VIEW_SET_HEIGHT':
      return { ...state, height: parseInt(action.value) }

    case 'VIEW_SET_COLOUR':
      return { ...state, colour: action.value }

    default:
      return state
  }
}

const app = (state = 'tile', action) => {
  switch (action.type) {
    case 'APP_SET_TITLE':
      state = action.value

    default:
      return state
  }
}

// the real app reducer would combine the state for all views and sidebars
const appReducer = combineReducers({
  app,
  view,
  terrain,
  tile
})

module.exports = appReducer
