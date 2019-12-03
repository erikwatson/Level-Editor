const { combineReducers } = require('redux')

const view = (state = { width: 960, height: 832 }, action) => {
  switch (action.type) {
    case 'VIEW_SET_WIDTH':
      return { ...state, width: parseInt(action.value) }

    case 'VIEW_SET_HEIGHT':
      return { ...state, height: parseInt(action.value) }

    default:
      return state
  }
}

const camera = (state = { x: 0, y: 0 }, action) => {
  switch (action.type) {
    case 'CAMERA_SET_X':
      return { ...state, x: action.value.x }

    case 'CAMERA_SET_Y':
      return { ...state, y: action.value.y }

    case 'CAMERA_SET_POS':
      return { x: action.value.x, y: action.value.y }

    default:
      return state
  }
}

const grid = (state = { width: 10, height: 10 }, action) => {
  switch (action.type) {
    case 'GRID_SET_WIDTH':
      return { ...state, width: action.value }

    case 'GRID_SET_HEIGHT':
      return { ...state, height: action.value }

    default:
      return state
  }
}

const appReducer = combineReducers({
  view,
  camera,
  grid
})

module.exports = appReducer
