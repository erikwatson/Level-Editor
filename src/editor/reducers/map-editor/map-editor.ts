import { combineReducers } from 'redux'
import undoable from 'redux-undo'
import { grid as Grid } from '@erikwatson/bramble'
import { Grid as GridType } from '@erikwatson/bramble/dist/types'
import { Layer, GridState } from '../../types'

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
const defaultGrid = Grid.create(
  { width: 80, height: 60 },
  { divisions: 5, scale: 4 }
)

const defaultGridState: GridState = {
  tiles: defaultGrid.tiles,
  width: defaultGrid.size.width,
  height: defaultGrid.size.height,
  divisions: defaultGrid.divisions,
  scale: defaultGrid.scale,
  tileWidth: defaultGrid.tileWidth,
  tileHeight: defaultGrid.tileHeight,
  visible: defaultGrid.visible
}

const grid = (state: GridState = defaultGridState, action) => {
  switch (action.type) {
    case 'GRID_SET_VISIBILITY':
      return { ...state, visible: action.value }

    case 'GRID_SET_DIVISIONS':
      return { ...state, divisions: parseInt(action.value) }

    case 'GRID_SET_WIDTH':
      const widthValue = parseInt(action.value)

      if (widthValue > state.width) {
        let widthExpanded = Grid.copyTiles(state.tiles)

        widthExpanded.forEach(row => {
          while (row.length < state.width) {
            row.push(0)
          }
        })

        return { ...state, width: widthValue, tiles: widthExpanded }
      } else if (widthValue < state.width) {
        let widthShrunk = Grid.copyTiles(state.tiles)

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
        let heightExpanded = Grid.copyTiles(state.tiles)

        heightExpanded.push(Array(state.width).fill(0))

        return { ...state, height: heightValue, tiles: heightExpanded }
      } else if (heightValue < state.height) {
        let heightShrunk = Grid.copyTiles(state.tiles).slice(0, heightValue)
        return { ...state, height: heightValue, tiles: heightShrunk }
      }

      return { ...state, height: heightValue }

    case 'GRID_SET_TILE_SIZE':
      return { ...state, tileWidth: action.value, tileHeight: action.value }

    case 'GRID_SET_TILE':
      const isWithinBounds =
        action.value.y >= 0 &&
        action.value.x >= 0 &&
        action.value.x < state.width &&
        action.value.y < state.height

      if (isWithinBounds) {
        let copy = Grid.copyTiles(state.tiles)
        copy[action.value.y][action.value.x] = action.value.type

        return { ...state, tiles: copy }
      }

      return state

    case 'GRID_FLOOD_FILL':
      const gridClone = Grid.fill(
        state.tiles,
        {
          x: action.value.x,
          y: action.value.y
        },
        state.tiles[action.value.y][action.value.x],
        action.value.type
      )

      return { ...state, tiles: gridClone }

    default:
      return state
  }
}

const defaultHighlightGrid = Grid.create(
  { width: 100, height: 100 },
  { scale: 4 }
)

const defaultHighlightState: GridState = {
  tiles: defaultGrid.tiles,
  width: defaultGrid.size.width,
  height: defaultGrid.size.height,
  divisions: defaultGrid.divisions,
  scale: defaultGrid.scale,
  tileWidth: defaultGrid.tileWidth,
  tileHeight: defaultGrid.tileHeight,
  visible: defaultGrid.visible
}

const highlights = (state: GridState = defaultHighlightState, action) => {
  switch (action.type) {
    case 'HIGHLIGHT_SET_WIDTH':
      const widthValue = parseInt(action.value)

      if (widthValue > state.width) {
        let widthExpanded = Grid.copyTiles(state.tiles)

        widthExpanded.forEach(row => {
          while (row.length < state.width) {
            row.push(0)
          }
        })

        return { ...state, width: widthValue, tiles: widthExpanded }
      } else if (widthValue < state.width) {
        let widthShrunk = Grid.copyTiles(state.tiles)

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
        let heightExpanded = Grid.copyTiles(state.tiles)
        heightExpanded.push(Array(state.width).fill(0))

        return { ...state, height: heightValue, tiles: heightExpanded }
      } else if (heightValue < state.height) {
        let heightShrunk = Grid.copyTiles(state.tiles).slice(0, heightValue)
        return { ...state, height: heightValue, tiles: heightShrunk }
      }

      return { ...state, height: heightValue }

    case 'HIGHLIGHT_SET_TILE_SIZE':
      return { ...state, tileWidth: action.value, tileHeight: action.value }

    case 'HIGHLIGHT_SET_TILE':
      const isWithinBounds =
        action.value.y >= 0 &&
        action.value.x >= 0 &&
        action.value.x < state.width &&
        action.value.y < state.height

      if (isWithinBounds) {
        let copy = Grid.copyTiles(state.tiles)
        copy[action.value.y][action.value.x] = action.value.type

        return { ...state, tiles: copy }
      }

      return state

    case 'HIGHLIGHT_CLEAR':
      let clearedTiles = Grid.copyTiles(state.tiles)

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
const brush = (state = { size: 1 }, action) => {
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

    default:
      return state
  }
}

const terrain = (state = 1, action) => {
  switch (action.type) {
    case 'SET_TERRAIN':
      return parseInt(action.value)

    default:
      return state
  }
}

const defaultLayerState: Layer[] = [
  {
    title: 'Layer 1',
    position: 0,
    grid: defaultGridState,
    type: 'Terrain',
    locked: false,
    visible: true
  },
  {
    title: 'Layer 2',
    position: 1,
    grid: defaultGridState,
    type: 'Terrain',
    locked: false,
    visible: true
  },
  {
    title: 'Layer 3',
    position: 2,
    grid: defaultGridState,
    type: 'Terrain',
    locked: false,
    visible: true
  }
]

const layers = (state: Layer[] = defaultLayerState, action) => {
  switch (action.type) {
    case 'LAYERS_SET_TILE': {
      return state.map((layer, index) => {
        if (index !== action.value.layer) return layer

        const isWithinBounds =
          action.value.y >= 0 &&
          action.value.x >= 0 &&
          action.value.x < layer.grid.width &&
          action.value.y < layer.grid.height

        if (!isWithinBounds) {
          return layer
        }

        let copy = Grid.copyTiles(layer.grid.tiles)
        copy[action.value.y][action.value.x] = action.value.type

        return { ...layer, grid: { ...layer.grid, tiles: copy } }
      })
    }

    default:
      return state
  }
}

const currentLayer = (state = 0, action) => {
  switch (action.type) {
    case 'SET_LAYER':
      return action.value

    default:
      return state
  }
}

const tileEditor = combineReducers({
  camera: undoable(camera),
  grid: undoable(grid),
  layers: undoable(layers),
  tool: undoable(tool),
  pointer,
  brush,
  erase,
  highlights,
  terrain: undoable(terrain),
  currentLayer: undoable(currentLayer)
})

export default tileEditor
