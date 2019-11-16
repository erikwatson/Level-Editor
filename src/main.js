import {
  game,
  graphics,
  grid as TileGrid,
  keyboard,
  mouse,
  assets,
  music,
  sfx,
  sprite
} from './bramble/bramble'

import { onLoaded } from './events'

const width = 1400
const height = 1000

const halfWidth = width / 2
const halfHeight = height / 2

let hero = null

let spritesheet1 = null
let spritesheet2 = null
let spritesheet3 = null

const scale = 4

let tool = 'brush'

const maxDelay = 2
let frameDelay = 2

let currentTileSet = 1

let grid = TileGrid.create(10, 10)

const tileWidth = 8
const tileHeight = 8

let brush = {
  shape: 'square',
  size: 1
}

// Everything within this radius is up for consideration but is not necessarily within the range of our brush
let brushRadiusInTiles = 0
let brushWidthInTiles = 0

// left, right, top, bottom most edges of the bounding box
let l = 0
let r = 0
let t = 0
let b = 0

let mousePosTile = null

function tilePos(x, y) {
  const tx = Math.floor((x + grid.pos.x) / (tileWidth * scale))
  const ty = Math.floor((y + grid.pos.y) / (tileHeight * scale))

  const maxX = grid.tiles[0].length
  const maxY = grid.tiles.length

  return {
    x: tx >= 0 && tx <= maxX ? tx : maxX,
    y: ty >= 0 && ty <= maxY ? ty : maxY
  }
}

function worldPos(tileX, tileY) {
  return {
    x: tileX * (tileWidth * scale),
    y: tileY * (tileHeight * scale)
  }
}

function distanceBetween(x1, y1, x2, y2) {
  var a = x1 - x2
  var b = y1 - y2

  return Math.sqrt(a * a + b * b)
}

let highlightedTiles = []

function update(delta) {
  mousePosTile = tilePos(mouse.x, mouse.y)
  highlightedTiles = []

  if (brush.shape === 'square') {
    brushWidthInTiles = Math.floor(brush.size / 2)

    l = mousePosTile.x - brushWidthInTiles
    r = mousePosTile.x + brushWidthInTiles

    t = mousePosTile.y - brushWidthInTiles
    b = mousePosTile.y + brushWidthInTiles

    for (let y = b; y >= t; y--) {
      for (let x = l; x <= r; x++) {
        if (brush.shape === 'square') {
          highlightedTiles.push({ x, y })
        }
      }
    }
  }

  if (brush.shape === 'circle') {
    brushRadiusInTiles = brush.size

    l = mousePosTile.x - brushRadiusInTiles
    r = mousePosTile.x + brushRadiusInTiles

    t = mousePosTile.y - brushRadiusInTiles
    b = mousePosTile.y + brushRadiusInTiles

    for (let y = b; y >= t; y--) {
      for (let x = l; x <= r; x++) {
        if (brush.shape === 'circle') {
          let worldp = worldPos(x, y)
          let result = distanceBetween(
            mousePosTile.x * tileWidth * scale + (tileWidth * scale) / 2,
            mousePosTile.y * tileWidth * scale + (tileWidth * scale) / 2,
            worldp.x + (tileWidth * scale) / 2,
            worldp.y + (tileHeight * scale) / 2
          )

          if (result < brush.size * tileWidth * scale) {
            highlightedTiles.push({ x, y })
          }
        }
      }
    }
  }

  if (tool === 'brush') {
    if (mouse.left.pressed) {
      highlightedTiles.forEach(tile => {
        if (
          grid.tiles[tile.y] !== undefined &&
          grid.tiles[tile.y][tile.x] !== undefined
        ) {
          grid.tiles[tile.y][tile.x] = currentTileSet
        }
      })
    }

    if (mouse.right.pressed) {
      highlightedTiles.forEach(tile => {
        if (
          grid.tiles[tile.y] !== undefined &&
          grid.tiles[tile.y][tile.x] !== undefined
        ) {
          grid.tiles[tile.y][tile.x] = 0
        }
      })
    }
  }

  if (tool === 'fill') {
    if (mouse.left.pressed) {
      // begin filling from current tile
      floodFill(
        mousePosTile,
        grid.tiles[mousePosTile.y][mousePosTile.x],
        currentTileSet
      )
    }

    if (mouse.right.pressed) {
      // begin filling from current tile
      floodFill(mousePosTile, grid.tiles[mousePosTile.y][mousePosTile.x], 0)
    }
  }
}

function floodFill(node, from = 0, to = 0) {
  if (from === to) {
    return
  }

  if (grid.tiles[node.y] !== undefined) {
    if (grid.tiles[node.y][node.x] !== from) {
      return
    }

    grid.tiles[node.y][node.x] = to

    if (grid.tiles[node.y][node.x - 1] !== undefined) {
      floodFill({ x: node.x - 1, y: node.y }, from, to)
    }

    if (grid.tiles[node.y][node.x] !== undefined) {
      floodFill({ x: node.x, y: node.y - 1 }, from, to)
    }

    if (grid.tiles[node.y][node.x + 1] !== undefined) {
      floodFill({ x: node.x + 1, y: node.y }, from, to)
    }

    if (grid.tiles[node.y][node.x] !== undefined) {
      floodFill({ x: node.x, y: node.y + 1 }, from, to)
    }
  }
}

let spriteSheets = {}

function render() {
  graphics.tiles(grid.tiles, spriteSheets, scale, tileWidth, tileHeight)

  if (tool === 'brush') {
    // Highlighted Tiles, the ones the brush will paint to if you click now
    highlightedTiles.forEach(tile => {
      graphics.square(
        tile.x * tileWidth * scale,
        tile.y * tileHeight * scale,
        tileWidth * scale,
        {
          fill: {
            color: '#669933'
          }
        }
      )
    })

    // currently highlighted tile
    graphics.square(
      mousePosTile.x * tileWidth * scale,
      mousePosTile.y * tileHeight * scale,
      tileWidth * scale,
      {
        fill: {
          color: '#ff0000'
        }
      }
    )

    if (brush.shape === 'circle') {
      graphics.circle(mouse.x, mouse.y, brush.size * tileWidth * scale, {
        line: {
          color: '#ffffff',
          width: 4
        }
      })
    }

    if (brush.shape === 'square') {
      graphics.square(
        mouse.x - (brush.size * tileWidth * scale) / 2,
        mouse.y - (brush.size * tileHeight * scale) / 2,
        brush.size * tileWidth * scale,
        {
          line: {
            color: '#ffffff',
            width: 4
          }
        }
      )
    }
  }

  // Drawing a visualisation of the Grid
  if (grid.visible) {
    grid.tiles[0].forEach((x, i) => {
      if (i === 0) {
        return
      }

      const from = { x: grid.pos.x + i * grid.tileWidth * scale, y: grid.pos.y }
      const to = {
        x: grid.pos.x + i * grid.tileWidth * scale,
        y: grid.pos.y + grid.tiles.length * grid.tileHeight * scale
      }

      if (i % grid.divisions === 0) {
        graphics.line(from, to, {
          width: 1,
          color: '#666666'
        })
      } else {
        graphics.line(from, to, {
          width: 1,
          color: '#333333'
        })
      }
    })

    grid.tiles.forEach((y, i) => {
      if (i === 0) {
        return
      }

      const from = {
        x: grid.pos.x,
        y: grid.pos.y + i * grid.tileHeight * scale
      }
      const to = {
        x: grid.pos.x + grid.tiles[0].length * grid.tileHeight * scale,
        y: grid.pos.y + i * grid.tileHeight * scale
      }

      if (i % grid.divisions === 0) {
        graphics.line(from, to, {
          width: 1,
          color: '#666666'
        })
      } else {
        graphics.line(from, to, {
          width: 1,
          color: '#333333'
        })
      }
    })

    // Edges of the Grid
    graphics.rect(
      grid.pos.x,
      grid.pos.y,
      grid.tiles[0].length * grid.tileWidth * scale,
      grid.tiles.length * grid.tileHeight * scale,
      {
        line: {
          width: 2,
          color: '#ffffff'
        }
      }
    )
  }
}

function start() {
  const container = document.getElementById('app-container')

  game.attachTo(container)
  game.disableContextMenu()
  game.setSize(width, height)
  game.setSmoothing(false)
  game.setUpdate(update)
  game.setRender(render)
  game.setBackgroundColor('#232323')
  game.start()

  const brushElement = document.querySelector('#brush')

  brushElement.addEventListener('input', e => {
    brush.size = parseInt(e.target.value)
  })

  brush.size = brushElement.value

  const terrainElement = document.querySelector('#terrain')

  terrainElement.addEventListener('change', e => {
    currentTileSet = e.target.value
  })

  currentTileSet = terrainElement.value

  const brushShapeElement = document.querySelector('#brush-shape')

  brushShapeElement.addEventListener('change', e => {
    brush.shape = e.target.value
  })

  brush.shape = brushShapeElement.value

  const gridDivsElement = document.querySelector('#grid-divs')

  gridDivsElement.addEventListener('input', e => {
    grid.divisions = parseInt(e.target.value)
  })

  grid.divisions = gridDivsElement.value

  const gridXElement = document.querySelector('#grid-x')
  const gridYElement = document.querySelector('#grid-y')

  gridXElement.addEventListener('change', e => {})

  gridYElement.addEventListener('change', e => {})

  grid.pos.x = parseInt(gridXElement.value)
  grid.pos.y = parseInt(gridYElement.value)

  const gridWidthElement = document.querySelector('#grid-width')
  const gridHeightElement = document.querySelector('#grid-height')

  const replaceGrid = function(toCopy, width, height) {
    const copy = toCopy.tiles.slice()

    grid = TileGrid.create(width, height, {
      pos: { x: 0, y: 0 },
      visible: true,
      divisions: parseInt(gridDivsElement.value),
      tileWidth,
      tileHeight
    })

    copy.forEach((y, yi) => {
      copy[yi].forEach((x, xi) => {
        if (grid.tiles[yi] !== undefined && grid.tiles[yi][xi] !== undefined) {
          grid.tiles[yi][xi] = x
        }
      })
    })
  }

  const gridToggleElement = document.querySelector('#grid-toggle')

  gridWidthElement.addEventListener('input', e => {
    replaceGrid(grid, e.target.value, gridHeightElement.value)
  })

  gridHeightElement.addEventListener('input', e => {
    replaceGrid(grid, gridWidthElement.value, e.target.value)
  })

  gridWidthElement.addEventListener('change', e => {
    grid.visible = gridToggleElement.checked
  })

  gridHeightElement.addEventListener('change', e => {
    grid.visible = gridToggleElement.checked
  })

  grid = TileGrid.create(gridWidthElement.value, gridHeightElement.value, {
    pos: { x: 0, y: 0 },
    visible: true,
    divisions: parseInt(gridDivsElement.value),
    tileWidth,
    tileHeight
  })

  gridToggleElement.addEventListener('change', e => {
    grid.visible = e.target.checked
  })

  grid.visible = gridToggleElement.checked

  const toolElement = document.querySelector('#tool')

  toolElement.addEventListener('change', e => {
    tool = e.target.value
  })

  tool = toolElement.value
}

function loadTiles() {
  Promise.all([
    assets.loadTerrain('terrain/default.json'),
    assets.loadTerrain('terrain/green-hills.json')
  ])
    .then(terrain => {
      spriteSheets = {
        0: terrain[0],
        1: terrain[1]
      }

      start()
    })
    .catch(err => {
      console.error(err)
    })
}

onLoaded(() => {
  loadTiles()
})
