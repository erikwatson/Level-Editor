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

const defaultGridState = {
  width: 10,
  height: 10,
  tileSize: 8,
  scale: 4,
  tiles: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
}

const copyTiles = tiles => tiles.map(arr => arr.slice())

// TODO: When we change the grid width we also need to modify the tile array

const grid = (state = defaultGridState, action) => {
  switch (action.type) {
    case 'GRID_SET_WIDTH':
      return { ...state, width: action.value }

    case 'GRID_SET_HEIGHT':
      return { ...state, height: action.value }

    case 'GRID_SET_TILE_SIZE':
      return { ...state, tileSize: action.value }

    case 'GRID_SET_TILE':
      const isWithinBounds =
        action.value.y >= 0 &&
        action.value.x >= 0 &&
        action.value.x < state.width &&
        action.value.y < state.height

      if (isWithinBounds) {
        let copy = copyTiles(state.tiles)
        copy[action.value.y][action.value.x] = action.value.type

        return { ...state, tiles: copy }
      }

      return state

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
