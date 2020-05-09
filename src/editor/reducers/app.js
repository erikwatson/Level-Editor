const { combineReducers } = require('redux')
const Grid = require('@erikwatson/bramble').grid

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

// Control the Camera
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

// Manipulate the Grid
const defaultGridState = Grid.create(50, 30, { scale: 4 })

const copyTiles = tiles => tiles.map(arr => arr.slice())

const grid = (state = defaultGridState, action) => {
  switch (action.type) {
    case 'GRID_SET_VISIBILITY':
      return { ...state, visible: action.value }

    case 'GRID_SET_WIDTH':
      const widthValue = parseInt(action.value)

      if (widthValue > state.width) {
        let widthExpanded = copyTiles(state.tiles)

        widthExpanded.forEach(row => {
          while (row.length < state.width) {
            row.push(0)
          }
        })

        return { ...state, width: widthValue, tiles: widthExpanded }
      } else if (widthValue < state.width) {
        let widthShrunk = copyTiles(state.tiles)

        widthShrunk.forEach(row => {
          while (row.length >= state.width) {
            row.pop()
          }
        })

        return { ...state, width: widthValue, tiles: widthShrunk }
      }

      return { ...state, width: widthValue }

    case 'GRID_SET_HEIGHT':
      const heightValue = parseInt(action.value)

      if (heightValue > state.height) {
        let heightExpanded = copyTiles(state.tiles)

        heightExpanded.push(Array(state.width).fill(0))

        return { ...state, height: heightValue, tiles: heightExpanded }
      } else if (heightValue < state.height) {
        let heightShrunk = copyTiles(state.tiles).slice(0, heightValue)
        return { ...state, height: heightValue, tiles: heightShrunk }
      }

      return { ...state, height: heightValue }

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

    case 'GRID_FLOOD_FILL':
      const gridClone = copyTiles(state.tiles)

      const floodFill = (position, target, replacement) => {
        const valueAtPosition = gridClone[position.y][position.x]

        if (target === replacement) {
          return
        }

        if (valueAtPosition !== target) {
          return
        }

        const isWithinBounds =
          position.x < gridClone[position.y].length &&
          position.x >= 0 &&
          position.y < gridClone.length &&
          position.y >= 0

        if (isWithinBounds) {
          gridClone[position.y][position.x] = replacement

          if (position.y < gridClone.length - 1) {
            floodFill({ x: position.x, y: position.y + 1 }, target, replacement)
          }

          if (position.y > 0) {
            floodFill({ x: position.x, y: position.y - 1 }, target, replacement)
          }

          if (position.x < gridClone[0].length - 1) {
            floodFill({ x: position.x + 1, y: position.y }, target, replacement)
          }

          if (position.x > 0) {
            floodFill({ x: position.x - 1, y: position.y }, target, replacement)
          }
        }

        return
      }

      if (
        gridClone[action.value.y] !== undefined &&
        gridClone[action.value.y][action.value.x] !== undefined
      ) {
        const withinBounds =
          action.value.x < gridClone[action.value.y].length - 1 &&
          action.value.x >= 0 &&
          action.value.y < gridClone.length &&
          action.value.y >= 0

        if (withinBounds) {
          floodFill(
            { x: action.value.x, y: action.value.y },
            gridClone[action.value.y][action.value.x],
            action.value.type
          )
        }
      }

      return { ...state, tiles: gridClone }

    default:
      return state
  }
}

const defaultHighlightState = Grid.create(100, 100, { scale: 4 })

const highlights = (state = defaultHighlightState, action) => {
  switch (action.type) {
    case 'HIGHLIGHT_SET_WIDTH':
      const widthValue = parseInt(action.value)

      if (widthValue > state.width) {
        let widthExpanded = copyTiles(state.tiles)

        widthExpanded.forEach(row => {
          while (row.length < state.width) {
            row.push(0)
          }
        })

        return { ...state, width: widthValue, tiles: widthExpanded }
      } else if (widthValue < state.width) {
        let widthShrunk = copyTiles(state.tiles)

        widthShrunk.forEach(row => {
          while (row.length >= state.width) {
            row.pop()
          }
        })

        return { ...state, width: widthValue, tiles: widthShrunk }
      }

      return { ...state, width: widthValue }

    case 'HIGHLIGHT_SET_HEIGHT':
      const heightValue = parseInt(action.value)

      if (heightValue > state.height) {
        let heightExpanded = copyTiles(state.tiles)
        heightExpanded.push(Array(state.width).fill(0))

        return { ...state, height: heightValue, tiles: heightExpanded }
      } else if (heightValue < state.height) {
        let heightShrunk = copyTiles(state.tiles).slice(0, heightValue)
        return { ...state, height: heightValue, tiles: heightShrunk }
      }

      return { ...state, height: heightValue }

    case 'HIGHLIGHT_SET_TILE_SIZE':
      return { ...state, tileSize: action.value }

    case 'HIGHLIGHT_SET_TILE':
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

    case 'HIGHLIGHT_CLEAR':
      let clearedTiles = copyTiles(state.tiles)

      for (var y = 0; y < clearedTiles.length; y++) {
        for (var x = 0; x < clearedTiles[0].length; x++) {
          clearedTiles[y][x] = 0
        }
      }

      return { ...state, tiles: clearedTiles }

    default:
      return state
  }
}

// Set the active Tool
const tool = (state = { active: 'brush' }, action) => {
  switch (action.type) {
    case 'TOOL_SET_ACTIVE':
      return { ...state, active: action.value }

    default:
      return state
  }
}

// Pointer Tool Properties
const pointer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state
  }
}

// Brush Tool Properties
const brush = (state = { size: 1, type: 1 }, action) => {
  const maxBrushSize = 10
  const minBrushSize = 1

  switch (action.type) {
    case 'BRUSH_SET_SIZE':
      if (action.value > maxBrushSize) {
        return state
      }
      if (action.value < minBrushSize) {
        return state
      }
      return { ...state, size: parseInt(action.value) }

    case 'BRUSH_TERRAIN_CHANGE':
      return { ...state, type: parseInt(action.value) }

    default:
      return state
  }
}

// Eraser Tool Properties
const erase = (state = { size: 1, type: 0 }, action) => {
  const maxBrushSize = 10
  const minBrushSize = 1

  switch (action.type) {
    case 'ERASE_SET_SIZE':
      if (action.value > maxBrushSize) {
        return state
      }
      if (action.value < minBrushSize) {
        return state
      }
      return { ...state, size: parseInt(action.value) }

    default:
      return state
  }
}

// Fill Tool Properties
const fill = (state = { type: 1 }, action) => {
  switch (action.type) {
    case 'FILL_SET_TYPE':
      return { ...state, type: parseInt(action.value) }

    default:
      return state
  }
}

const appReducer = combineReducers({
  view,
  camera,
  grid,
  tool,
  pointer,
  brush,
  erase,
  fill,
  highlights
})

module.exports = appReducer
