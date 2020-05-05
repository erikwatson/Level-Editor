const React = require('react')
const { connect } = require('react-redux')
const style = require('./bramble-view.sass')

const {
  game,
  graphics,
  mouse,
  prevMouse,
  keyboard,
  assets,
  sound
} = require('@erikwatson/bramble')

class BrambleView extends React.Component {
  componentDidMount() {
    let spritesheets = []
    let music = []

    Promise.all([
      assets.loadTerrain('./terrain/default.json'),
      assets.loadTerrain('./terrain/green-hills.json'),
      assets.loadTerrain('./terrain/highlights.json')
    ])
      .then(terrain => {
        spritesheets = terrain
        game.start()
      })
      .catch(err => {
        console.error(err)
      })

    const drawViewportBox = () => {
      const tl = { x: 0, y: 0 }
      const tr = { x: this.props.width, y: 0 }
      const bl = { x: 0, y: this.props.height }
      const br = { x: this.props.width, y: this.props.height }

      const line = { width: 4, color: '#ffffff' }

      graphics.line(tl, tr, line)
      graphics.line(tr, br, line)
      graphics.line(br, bl, line)
      graphics.line(bl, tl, line)
    }

    const drawGrid = () => {
      const tileWidth = this.props.grid.tileSize * this.props.grid.scale
      const tileHeight = this.props.grid.tileSize * this.props.grid.scale

      const widthInTiles = this.props.grid.width
      const heightInTiles = this.props.grid.height

      const tl = {
        x: this.props.cameraX,
        y: this.props.cameraY
      }
      const tr = {
        x: tileWidth * widthInTiles + this.props.cameraX,
        y: this.props.cameraY
      }
      const bl = {
        x: this.props.cameraX,
        y: tileHeight * heightInTiles + this.props.cameraY
      }
      const br = {
        x: tileWidth * widthInTiles + this.props.cameraX,
        y: tileHeight * heightInTiles + this.props.cameraY
      }

      const columns = (tr.x - tl.x) / tileWidth

      for (let i = 0; i <= columns; i++) {
        graphics.line(
          {
            x: tl.x + i * tileWidth,
            y: tl.y
          },
          {
            x: tl.x + i * tileWidth,
            y: bl.y
          },
          {
            width: i % 2 == 0 ? 2 : 1,
            color: '#663399'
          }
        )
      }

      const rows = (br.y - tr.y) / tileHeight

      for (let i = 0; i <= rows; i++) {
        graphics.line(
          {
            x: tl.x,
            y: tl.y + i * tileHeight
          },
          {
            x: tr.x,
            y: tl.y + i * tileHeight
          },
          {
            width: i % 2 == 0 ? 2 : 1,
            color: '#663399'
          }
        )
      }
    }

    const drawBoundingBox = () => {
      // size of a single tile
      const tileWidth = this.props.grid.tileSize * this.props.grid.scale
      const tileHeight = this.props.grid.tileSize * this.props.grid.scale

      // size of the bounding box as a number of those tiles
      const widthInTiles = this.props.grid.width
      const heightInTiles = this.props.grid.height

      // position of the corners of the bounding box
      const tl = {
        x: 0 + this.props.cameraX,
        y: 0 + this.props.cameraY
      }

      const tr = {
        x: tileWidth * widthInTiles + this.props.cameraX,
        y: 0 + this.props.cameraY
      }

      const bl = {
        x: 0 + this.props.cameraX,
        y: tileHeight * heightInTiles + this.props.cameraY
      }

      const br = {
        x: tileWidth * widthInTiles + this.props.cameraX,
        y: tileHeight * heightInTiles + this.props.cameraY
      }

      // draw the box
      const line = { width: 4, color: '#ffffff' }

      graphics.line(tl, tr, line)
      graphics.line(tr, br, line)
      graphics.line(br, bl, line)
      graphics.line(bl, tl, line)
    }

    // Draw the Origin Axis
    // { X, Y, Z } === { R, G, B }
    const drawOrigin = () => {
      const origin = {
        x: 0 + this.props.cameraX,
        y: 0 + this.props.cameraY
      }

      graphics.line(
        origin,
        { ...origin, x: origin.x + 64 },
        { width: 4, color: 'red' }
      )

      // TODO: We shouldn't have to use the graphics context directly like this
      const ctx = graphics.getContext()

      ctx.fillStyle = 'red'

      ctx.moveTo(origin.x + 64, origin.y)
      ctx.lineTo(origin.x + 64, origin.y - 8)
      ctx.lineTo(origin.x + 64 + 8, origin.y)
      ctx.lineTo(origin.x + 64, origin.y + 8)

      ctx.fill()

      graphics.line(
        origin,
        { ...origin, y: origin.y + 64 },
        { width: 4, color: 'green' }
      )

      ctx.fillStyle = 'green'

      ctx.moveTo(origin.x, origin.y + 64)
      ctx.lineTo(origin.x + 8, origin.y + 64)
      ctx.lineTo(origin.x, origin.y + 64 + 8)
      ctx.lineTo(origin.x - 8, origin.y + 64)

      ctx.fill()
    }

    const container = document.querySelector('#bramble-view')

    game.attachTo(container)
    game.disableContextMenu()
    game.setSize(this.props.width, this.props.height)
    game.setSmoothing(false)

    const tileWidth = this.props.grid.tileSize
    const tileHeight = this.props.grid.tileSize

    game.setUpdate(delta => {
      // Clearing out the Highlight Layer so we can choose what to show inside
      // it on every frame
      this.props.dispatch({ type: 'HIGHLIGHT_CLEAR' })

      const relativeX =
        (mouse.x - this.props.camera.x) / (tileWidth * this.props.grid.scale)
      const relativeY =
        (mouse.y - this.props.camera.y) / (tileHeight * this.props.grid.scale)

      const mouseOverGridX = Math.floor(relativeX)
      const mouseOverGridY = Math.floor(relativeY)

      const halfBrush = Math.floor(this.props.brush.size / 2)

      if (this.props.activeTool === 'pointer') {
      }

      if (this.props.activeTool === 'brush') {
        if (this.props.brush.size % 2 === 1) {
          // Odd number of Tiles

          for (var x = -halfBrush; x < this.props.brush.size - halfBrush; x++) {
            for (
              var y = -halfBrush;
              y < this.props.brush.size - halfBrush;
              y++
            ) {
              this.props.dispatch({
                type: 'HIGHLIGHT_SET_TILE',
                value: {
                  x: mouseOverGridX + x,
                  y: mouseOverGridY + y,
                  type: 100
                }
              })
            }
          }
        } else {
          // Even Number of Tiles
          const xSide = relativeX % 1 >= 0.5 ? 1 : -1
          const ySide = relativeY % 1 >= 0.5 ? 1 : -1

          if (xSide === -1) {
            // left side
            for (
              var x = -halfBrush;
              x < this.props.brush.size - halfBrush;
              x++
            ) {
              if (ySide === -1) {
                // top side
                for (
                  var y = -halfBrush;
                  y < this.props.brush.size - halfBrush;
                  y++
                ) {
                  this.props.dispatch({
                    type: 'HIGHLIGHT_SET_TILE',
                    value: {
                      x: mouseOverGridX + x,
                      y: mouseOverGridY + y,
                      type: 100
                    }
                  })
                }
              } else {
                // bottom side
                for (
                  var y = -(halfBrush - 1);
                  y < this.props.brush.size - (halfBrush - 1);
                  y++
                ) {
                  this.props.dispatch({
                    type: 'HIGHLIGHT_SET_TILE',
                    value: {
                      x: mouseOverGridX + x,
                      y: mouseOverGridY + y,
                      type: 100
                    }
                  })
                }
              }
            }
          } else {
            // right side
            for (
              var x = -(halfBrush - 1);
              x < this.props.brush.size - (halfBrush - 1);
              x++
            ) {
              if (ySide === -1) {
                // top side
                for (
                  var y = -halfBrush;
                  y < this.props.brush.size - halfBrush;
                  y++
                ) {
                  this.props.dispatch({
                    type: 'HIGHLIGHT_SET_TILE',
                    value: {
                      x: mouseOverGridX + x,
                      y: mouseOverGridY + y,
                      type: 100
                    }
                  })
                }
              } else {
                // bottom side
                for (
                  var y = -(halfBrush - 1);
                  y < this.props.brush.size - (halfBrush - 1);
                  y++
                ) {
                  this.props.dispatch({
                    type: 'HIGHLIGHT_SET_TILE',
                    value: {
                      x: mouseOverGridX + x,
                      y: mouseOverGridY + y,
                      type: 100
                    }
                  })
                }
              }
            }
          }
        }

        if (mouse.left.pressed) {
          // Paint the highlighted tile, whatever they may be
          // tiles stored as an array of rows, so need to go y first here
          for (var y = 0; y < this.props.highlights.tiles.length; y++) {
            for (var x = 0; x < this.props.highlights.tiles[y].length; x++) {
              if (this.props.highlights.tiles[y][x] === 100) {
                this.props.dispatch({
                  type: 'GRID_SET_TILE',
                  value: {
                    x: x,
                    y: y,
                    type: 2
                  }
                })
              }
            }
          }
        }
      }

      if (this.props.activeTool === 'erase') {
        this.props.dispatch({
          type: 'HIGHLIGHT_SET_TILE',
          value: {
            x: mouseOverGridX,
            y: mouseOverGridY,
            type: 100
          }
        })

        if (mouse.left.pressed) {
          this.props.dispatch({
            type: 'GRID_SET_TILE',
            value: {
              x: mouseOverGridX,
              y: mouseOverGridY,
              type: 0
            }
          })
        }
      }

      if (this.props.activeTool === 'fill') {
      }
    })

    game.setRender(() => {
      graphics.clear('#000000')

      if (this.props.showGrid) {
        drawGrid()
      }

      // Render the Tile Layer
      graphics.tiles(
        this.props.camera.x,
        this.props.camera.y,
        this.props.grid.tiles,
        spritesheets,
        this.props.grid.scale,
        this.props.grid.tileSize,
        this.props.grid.tileSize
      )

      // Render the Highlight layer
      graphics.tiles(
        this.props.camera.x,
        this.props.camera.y,
        this.props.highlights.tiles,
        spritesheets,
        this.props.grid.scale,
        this.props.grid.tileSize,
        this.props.grid.tileSize
      )

      drawBoundingBox()
      drawOrigin()
      drawViewportBox()
    })
  }

  componentDidUpdate() {
    game.setSize(this.props.width, this.props.height)
    game.setSmoothing(false)
  }

  render() {
    return (
      <div id='bramble-pane'>
        <div id='bramble-view'></div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    showGrid: true,
    grid: state.grid,
    camera: state.camera,
    activeTool: state.tool.active,
    brush: state.brush,
    erase: state.erase,
    highlights: state.highlights
  }
}

module.exports = connect(mapStateToProps)(BrambleView)
