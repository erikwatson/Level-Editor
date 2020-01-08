const { combineReducers } = require('redux')
const Grid = require('../../bramble/src/bramble/grid')

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

// const defaultGridState = {
//   width: 10,
//   height: 10,
//   tileSize: 8,
//   scale: 4,
//   tiles: [
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
//   ]
// }

const defaultGridState = Grid.create(10, 10, { scale: 4 })

const copyTiles = tiles => tiles.map(arr => arr.slice())

const grid = (state = defaultGridState, action) => {
  switch (action.type) {
    case 'GRID_SET_WIDTH':
      if (action.value > state.width) {
        let widthExpanded = copyTiles(state.tiles)

        widthExpanded.forEach(row => {
          while (row.length < state.width) {
            row.push(0)
          }
        })

        return { ...state, width: action.value, tiles: widthExpanded }
      } else if (action.value < state.width) {
        let widthShrunk = copyTiles(state.tiles)

        widthShrunk.forEach(row => {
          while (row.length >= state.width) {
            row.pop()
          }
        })

        return { ...state, width: action.value, tiles: widthShrunk }
      }

      return { ...state, width: action.value }

    case 'GRID_SET_HEIGHT':
      if (action.value > state.height) {
        let heightExpanded = copyTiles(state.tiles)

        heightExpanded.push(Array(state.width).fill(0))

        return { ...state, height: action.value, tiles: heightExpanded }
      } else if (action.value < state.height) {
        let heightShrunk = copyTiles(state.tiles).slice(0, action.value)
        return { ...state, height: action.value, tiles: heightShrunk }
      }

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
