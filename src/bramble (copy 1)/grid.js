function make2DArray(width = 1, height = 1, defaultValue = null) {
  let result = []

  for (let y = 0; y < height; y++) {
    let row = []

    for (let x = 0; x < width; x++) {
      row.push(defaultValue)
    }

    result.push(row)
  }

  return result
}

const defaultGrid = {
  pos: { x: 0, y: 0 },
  visible: true,
  divisions: 4,
  tileWidth: 8,
  tileHeight: 8
}

function create(width, height, options = defaultGrid) {
  let tiles = make2DArray(width, height, 0)
  let pos = { x: options.pos.x, y: options.pos.y }
  let visible = options.visible
  let divisions = options.divisions
  let tileWidth = options.tileWidth
  let tileHeight = options.tileHeight

  return {
    divisions,
    pos,
    tileHeight,
    tiles,
    tileWidth,
    visible
  }
}

export default {
  create
}
