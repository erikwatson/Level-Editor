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
} from './bramble/src/bramble/bramble'

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

// Layers - We will generalise this to "many" layers later.
let currentLayer = 0
let layers = [
  TileGrid.create(10, 10),
  TileGrid.create(10, 10),
  TileGrid.create(10, 10)
]

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

function tilePos(grid, x, y) {
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
  const thisLayer = layers[currentLayer]

  mousePosTile = tilePos(thisLayer, mouse.x, mouse.y)
  // console.log(thisLayer, mousePosTile)

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

  // Fills up the section currently highlight with a tileset of your choice
  const fillHighlighted = function(grid, selected, tileset) {
    selected.forEach(tile => {
      if (
        grid.tiles[tile.y] !== undefined &&
        grid.tiles[tile.y][tile.x] !== undefined
      ) {
        grid.tiles[tile.y][tile.x] = tileset
      }
    })
  }

  if (tool === 'brush') {
    if (mouse.left.pressed) {
      fillHighlighted(thisLayer, highlightedTiles, currentTileSet)
    }

    if (mouse.right.pressed) {
      fillHighlighted(thisLayer, highlightedTiles, 0)
    }

    if (mouse.wheel.moved) {
      switch (mouse.wheel.direction) {
        case 'up':
          brush.size++
          break
        case 'down':
          if (brush.size > 1) {
            brush.size--
          }
          break

        default:
          console.log('neither up nor down somehow')
      }
    }
  }

  if (tool === 'fill') {
    if (mouse.left.pressed) {
      // begin filling from current tile
      floodFill(
        thisLayer,
        mousePosTile,
        thisLayer.tiles[mousePosTile.y][mousePosTile.x],
        currentTileSet
      )
    }

    if (mouse.right.pressed) {
      // begin filling from current tile
      floodFill(
        thisLayer,
        mousePosTile,
        thisLayer.tiles[mousePosTile.y][mousePosTile.x],
        0
      )
    }
  }
}

function floodFill(grid, node, from = 0, to = 0) {
  if (from === to) {
    return
  }

  if (grid.tiles[node.y] !== undefined) {
    if (grid.tiles[node.y][node.x] !== from) {
      return
    }

    grid.tiles[node.y][node.x] = to

    if (grid.tiles[node.y][node.x - 1] !== undefined) {
      floodFill(grid, { x: node.x - 1, y: node.y }, from, to)
    }

    if (grid.tiles[node.y][node.x] !== undefined) {
      floodFill(grid, { x: node.x, y: node.y - 1 }, from, to)
    }

    if (grid.tiles[node.y][node.x + 1] !== undefined) {
      floodFill(grid, { x: node.x + 1, y: node.y }, from, to)
    }

    if (grid.tiles[node.y][node.x] !== undefined) {
      floodFill(grid, { x: node.x, y: node.y + 1 }, from, to)
    }
  }
}

let spriteSheets = {}

function render() {
  const thisLayer = layers[currentLayer]

  layers.forEach((layer, i) => {
    if (i === currentLayer) {
      graphics.shadow(() => {
        graphics.tiles(
          0,
          0,
          layer.tiles,
          spriteSheets,
          scale,
          tileWidth,
          tileHeight
        )
      })
    } else {
      // graphics.transparency(() => {
      graphics.tiles(
        0,
        0,
        layer.tiles,
        spriteSheets,
        scale,
        tileWidth,
        tileHeight
      )
      // }, 0.25)
    }
  })

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
  if (thisLayer.visible) {
    graphics.dodge(() => {
      thisLayer.tiles[0].forEach((x, i) => {
        if (i === 0) {
          return
        }

        const from = {
          x: thisLayer.pos.x + i * thisLayer.tileWidth * scale,
          y: thisLayer.pos.y
        }
        const to = {
          x: thisLayer.pos.x + i * thisLayer.tileWidth * scale,
          y:
            thisLayer.pos.y +
            thisLayer.tiles.length * thisLayer.tileHeight * scale
        }

        if (i % thisLayer.divisions === 0) {
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

      thisLayer.tiles.forEach((y, i) => {
        if (i === 0) {
          return
        }

        const from = {
          x: thisLayer.pos.x,
          y: thisLayer.pos.y + i * thisLayer.tileHeight * scale
        }
        const to = {
          x:
            thisLayer.pos.x +
            thisLayer.tiles[0].length * thisLayer.tileHeight * scale,
          y: thisLayer.pos.y + i * thisLayer.tileHeight * scale
        }

        if (i % thisLayer.divisions === 0) {
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
    })
  }

  // Edges of the Grid
  graphics.rect(
    thisLayer.pos.x,
    thisLayer.pos.y,
    thisLayer.tiles[0].length * thisLayer.tileWidth * scale,
    thisLayer.tiles.length * thisLayer.tileHeight * scale,
    {
      line: {
        width: 2,
        color: '#ffffff'
      }
    }
  )
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

  // layers = [
  //   TileGrid.create(10, 10),
  //   TileGrid.create(10, 10),
  //   TileGrid.create(10, 10),
  //   TileGrid.create(10, 10)
  // ]

  const brushElement = document.querySelector('#brush')

  brushElement.addEventListener('input', e => {
    brush.size = parseInt(e.target.value)
  })

  brush.size = brushElement.value

  const terrainElement = document.querySelector('#terrain')

  // Adding the list of imported terrains to the user interface
  spriteSheets.forEach(sheet => {
    const option = document.createElement('option')
    option.text = sheet.name
    option.value = sheet.type // must be unique! Not currenly enforced

    terrainElement.appendChild(option)
  })

  terrainElement.addEventListener('change', e => {
    currentTileSet = parseInt(e.target.value)
  })

  currentTileSet = parseInt(terrainElement.value)

  const brushShapeElement = document.querySelector('#brush-shape')

  brushShapeElement.addEventListener('change', e => {
    brush.shape = e.target.value
  })

  brush.shape = brushShapeElement.value

  const gridDivsElement = document.querySelector('#grid-divs')

  gridDivsElement.addEventListener('input', e => {
    layers.forEach(layer => {
      layer.divisions = parseInt(e.target.value)
    })
  })

  layers.forEach(layer => {
    layer.divisions = gridDivsElement.value
  })

  const gridXElement = document.querySelector('#grid-x')
  const gridYElement = document.querySelector('#grid-y')

  gridXElement.addEventListener('change', e => {
    layers.forEach(layer => {
      layer.pos.x = parseInt(gridXElement.value)
      layer.pos.y = parseInt(gridYElement.value)
    })
  })

  gridYElement.addEventListener('change', e => {
    layers.forEach(layer => {
      layer.pos.x = parseInt(gridXElement.value)
      layer.pos.y = parseInt(gridYElement.value)
    })
  })

  layers.forEach(layer => {
    layer.pos.x = parseInt(gridXElement.value)
    layer.pos.y = parseInt(gridYElement.value)
  })

  const gridWidthElement = document.querySelector('#grid-width')
  const gridHeightElement = document.querySelector('#grid-height')

  const copyGrid = function(grid, width, height) {
    const copy = grid.tiles.slice()

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

    return grid
  }

  const gridToggleElement = document.querySelector('#grid-toggle')

  gridWidthElement.addEventListener('input', e => {
    for (let i = 0; i < layers.length; i++) {
      layers[i] = copyGrid(
        layers[i],
        parseInt(e.target.value),
        parseInt(gridHeightElement.value)
      )
    }
  })

  gridHeightElement.addEventListener('input', e => {
    for (let i = 0; i < layers.length; i++) {
      layers[i] = copyGrid(
        layers[i],
        parseInt(gridWidthElement.value),
        parseInt(e.target.value)
      )
    }
  })

  gridWidthElement.addEventListener('change', e => {
    layers.forEach(layer => {
      layer.visible = gridToggleElement.checked
    })
  })

  gridHeightElement.addEventListener('change', e => {
    layers.forEach(layer => {
      layer.visible = gridToggleElement.checked
    })
  })

  for (let i = 0; i < layers.length; i++) {
    layers[i] = TileGrid.create(
      gridWidthElement.value,
      gridHeightElement.value,
      {
        pos: { x: 0, y: 0 },
        visible: true,
        divisions: parseInt(gridDivsElement.value),
        tileWidth,
        tileHeight
      }
    )
  }

  gridToggleElement.addEventListener('change', e => {
    layers.forEach(layer => {
      layer.visible = e.target.checked
    })
  })

  layers.forEach(layer => {
    layer.visible = gridToggleElement.checked
  })

  const toolElement = document.querySelector('#tool')

  toolElement.addEventListener('change', e => {
    tool = e.target.value
  })

  tool = toolElement.value

  const layersElement = document.querySelector('#current-layer')

  layers.forEach((layer, i) => {
    const option = document.createElement('option')

    option.value = i
    option.text = `Layer ${i}`

    layersElement.appendChild(option)
  })

  layersElement.addEventListener('change', e => {
    currentLayer = parseInt(e.target.value)
  })
}

function loadTiles() {
  Promise.all([
    assets.loadTerrain('terrain/default.json'),
    assets.loadTerrain('terrain/green-hills.json'),
    assets.loadTerrain('terrain/variants.json')
  ])
    .then(terrain => {
      spriteSheets = terrain
      start()
    })
    .catch(err => {
      console.error(err)
    })
}

onLoaded(() => {
  loadTiles()
})
