import number from './number'

let ctx = null

function setContext(context) {
  ctx = context
}

function getContext() {
  return ctx
}

function clear(color) {
  rect(0, 0, ctx.canvas.width, ctx.canvas.height, {
    fill: {
      color
    }
  })
}

const defaultRect = {
  fill: {
    color: '#ffffff',
    opacity: 1
  },
  line: {
    width: 2,
    color: '#000000',
    opacity: 1
  }
}

function square(x, y, size, options = defaultRect) {
  rect(x, y, size, size, options)
}

function rect(x, y, w, h, options = defaultRect) {
  if (typeof options.fill !== 'undefined') {
    ctx.fillStyle = options.fill.color
    ctx.fillRect(x, y, w, h)
  }

  if (typeof options.line !== 'undefined') {
    ctx.strokeStyle = options.line.color
    ctx.lineWidth = options.line.width
    ctx.strokeRect(x, y, w, h)
  }
}

const defaultLine = {
  width: 2,
  color: '#000000'
}

function line(from, to, options = defaultLine) {
  ctx.strokeStyle = options.color
  ctx.lineWidth = options.width

  ctx.beginPath()
  ctx.moveTo(from.x, from.y)
  ctx.lineTo(to.x, to.y)
  ctx.stroke()
}

const defaultCircle = {
  fill: {
    color: '#000000',
    opacity: 1
  },

  line: {
    color: '#ffffff',
    opacity: 1,
    width: 2
  }
}

function circle(x, y, radius, options = defaultCircle) {
  // not happy with this really, make another function i think
  if (typeof options.fill !== 'undefined') {
    ctx.fillStyle = options.fill.color
  }

  ctx.beginPath()
  ctx.strokeStyle = options.line.color
  ctx.lineWidth = options.line.width
  ctx.arc(x, y, radius, 0, 2 * Math.PI)
  ctx.closePath()

  if (typeof options.fill !== 'undefined') {
    ctx.fill()
  }

  ctx.stroke()
}

function image(x, y, w, h, image) {
  ctx.drawImage(image, x, y, w, h)
}

function subImage(x, y, w, h, sx, sy, sw, sh, image) {
  ctx.drawImage(image, sx, sy, sw, sh, x, y, w, h)
}

function sprite(sprite) {
  const halfWidth = sprite.width / 2
  const halfHeight = sprite.height / 2

  ctx.save()
  ctx.translate(sprite.x + halfWidth, sprite.y + halfHeight)
  ctx.rotate(number.toRadians(sprite.rotation))

  if (sprite.frames.length > 1) {
    subImage(
      -halfWidth,
      -halfHeight,
      sprite.width,
      sprite.height,
      sprite.frames[sprite.frame].x,
      sprite.frames[sprite.frame].y,
      sprite.frames[sprite.frame].width,
      sprite.frames[sprite.frame].height,
      sprite.texture
    )
  } else {
    image(-halfWidth, -halfHeight, sprite.width, sprite.height, sprite.texture)
  }

  ctx.restore()
}

function text(
  x = 0,
  y = 0,
  text = '',
  color = '#000000',
  font = '16pt sans-serif'
) {
  ctx.fillStyle = color
  ctx.font = font
  ctx.textAlign = 'left'
  ctx.textBaseline = 'top'
  ctx.fillText(text, x, y)
}

// TODO: Figure out word wrapping for these boxes.
//
//       I think we will probably have to split the text up into lines of
//       appropriate width, then render each one of them individually.
//
//       This could probably be cached in the object itself as long as we update
//       every time there's a change to the font, text, width or height.
function textbox(textbox) {
  ctx.fillStyle = '#ffffff'
  ctx.font = '16pt sans-serif'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'top'

  const measurements = ctx.measureText(textbox.text)

  if (measurements.width > textbox.width) {
    textbox.text = textbox.text.substr(0, 10) + '\n' + textbox.text.substr(10)
  }

  ctx.fillText(textbox.text, textbox.x, textbox.y)
}

function tile(
  positionX,
  positionY,
  tilesheet,
  gridX,
  gridY,
  tileSheetX,
  tileSheetY,
  scale,
  tileWidth,
  tileHeight
) {
  subImage(
    positionX + scale * (gridX * tileWidth),
    positionY + scale * (gridY * tileHeight),
    scale * tileWidth,
    scale * tileHeight,
    tileWidth * tileSheetX,
    tileHeight * tileSheetY,
    tileWidth,
    tileHeight,
    tilesheet
  )
}

// tilegrid: a 2d array of numbers representing terrain types
// spritesheets: An object, each key is the value that represents a tile from this sheet
function tiles(
  positionX,
  positionY,
  tileGrid,
  spriteSheets,
  scale,
  tileWidth,
  tileHeight
) {
  const dirValues = {
    NW: 1,
    N: 2,
    NE: 4,
    E: 8,
    SE: 16,
    S: 32,
    SW: 64,
    W: 128
  }

  for (let y = 0; y < tileGrid.length; y++) {
    for (let x = 0; x < tileGrid[y].length; x++) {
      if (tileGrid[y][x] === 0) {
        continue
      }

      // REAL VALUES
      const tl = y > 0 ? tileGrid[y - 1][x - 1] : 0
      const tm = y > 0 ? tileGrid[y - 1][x] : 0
      const tr = y > 0 ? tileGrid[y - 1][x + 1] : 0

      const ml = tileGrid[y][x - 1]
      const m = tileGrid[y][x]
      const mr = tileGrid[y][x + 1]

      const bl = y < tileGrid.length - 1 ? tileGrid[y + 1][x - 1] : 0
      const bm = y < tileGrid.length - 1 ? tileGrid[y + 1][x] : 0
      const br = y < tileGrid.length - 1 ? tileGrid[y + 1][x + 1] : 0

      // BINARY VALUES
      const n = m === tm ? 1 : 0
      const e = m === mr ? 1 : 0
      const s = m === bm ? 1 : 0
      const w = m === ml ? 1 : 0

      const nw = m === tm && m === ml ? (m === tl ? 1 : 0) : 0
      const ne = m === tm && m === mr ? (m === tr ? 1 : 0) : 0
      const sw = m === bm && m === ml ? (m === bl ? 1 : 0) : 0
      const se = m === bm && m === mr ? (m === br ? 1 : 0) : 0

      const sum =
        dirValues.NW * nw +
        dirValues.N * n +
        dirValues.NE * ne +
        dirValues.E * e +
        dirValues.SE * se +
        dirValues.S * s +
        dirValues.SW * sw +
        dirValues.W * w

      // Figure out which sheet we're supposed to be drawing from
      let sheet = spriteSheets[tileGrid[y][x]]

      const selections = sheet.tiles.filter(x => x.type === sum)

      // Note: Just picking a random one of the variants every time we render for now
      const selection =
        selections[Math.floor(Math.random() * selections.length)]

      if (selection) {
        tile(
          positionX,
          positionY,
          sheet.image,
          x,
          y,
          selection.position.x,
          selection.position.y,
          scale,
          selection.size.width,
          selection.size.height
        )
      } else {
        console.log(`Tile not defined ${sum}`)
      }
    }
  }
}

const defaultDropShadow = {
  shadowColor: '#000000',
  shadowBlur: 6,
  shadowOffsetX: 4,
  shadowOffsetY: 4
}

function shadow(drawingOperations, options = defaultDropShadow) {
  ctx.save()

  ctx.shadowColor = options.shadowColor
  ctx.shadowBlur = options.shadowBlur
  ctx.shadowOffsetX = options.shadowOffsetX
  ctx.shadowOffsetY = options.shadowOffsetY

  drawingOperations()
  ctx.restore()
}

function dodge(drawingOperations) {
  ctx.save()
  ctx.globalCompositeOperation = 'color-dodge'
  drawingOperations()
  ctx.restore()
}

function overlay(drawingOperations) {
  ctx.save()
  ctx.globalCompositeOperation = 'overlay'
  drawingOperations()
  ctx.restore()
}

function transparency(drawingOperations, alpha = 0.25) {
  ctx.save()
  ctx.globalAlpha = alpha
  drawingOperations()
  ctx.restore()
}

export default {
  circle,
  clear,
  image,
  line,
  rect,
  getContext,
  setContext,
  sprite,
  square,
  subImage,
  text,
  textbox,
  tiles,
  shadow,
  dodge,
  overlay,
  transparency
}
