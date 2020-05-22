const React = require('react')
const { connect } = require('react-redux')
const style = require('./map-editor.sass')

const {
  game,
  graphics,
  mouse,
  prevMouse,
  keyboard,
  assets,
  sound,
  grid
} = require('@erikwatson/bramble')

const Layout = require('../layouts/sidebar-left/sidebar-left.js')
const Sidebar = require('./sidebar/sidebar.js')

class MapEditor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      highlights: grid.create(100, 100)
    }
  }

  componentDidMount() {
    let music = []

    game.start()

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
        x: this.props.camera.x,
        y: this.props.camera.y
      }
      const tr = {
        x: tileWidth * widthInTiles + this.props.camera.x,
        y: this.props.camera.y
      }
      const bl = {
        x: this.props.camera.x,
        y: tileHeight * heightInTiles + this.props.camera.y
      }
      const br = {
        x: tileWidth * widthInTiles + this.props.camera.x,
        y: tileHeight * heightInTiles + this.props.camera.y
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
            width: i % this.props.grid.divisions === 0 ? 2 : 1,
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
            width: i % this.props.grid.divisions === 0 ? 2 : 1,
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
        x: 0 + this.props.camera.x,
        y: 0 + this.props.camera.y
      }

      const tr = {
        x: tileWidth * widthInTiles + this.props.camera.x,
        y: 0 + this.props.camera.y
      }

      const bl = {
        x: 0 + this.props.camera.x,
        y: tileHeight * heightInTiles + this.props.camera.y
      }

      const br = {
        x: tileWidth * widthInTiles + this.props.camera.x,
        y: tileHeight * heightInTiles + this.props.camera.y
      }

      // draw the box
      const line = { width: 4, color: '#ffffff' }

      graphics.line(tl, tr, line)
      graphics.line(tr, br, line)
      graphics.line(br, bl, line)
      graphics.line(bl, tl, line)
    }

    const setBrushHighlights = (gridPos, relativePos, brushSize) => {
      const mouseOverGridX = gridPos.x
      const mouseOverGridY = gridPos.y

      const relativeX = relativePos.x
      const relativeY = relativePos.y

      const modifiedTiles = [...this.state.highlights.tiles]

      if (brushSize % 2 === 1) {
        // Odd number of Tiles
        const halfBrush = Math.round(brushSize / 2) - 1

        for (var x = -halfBrush; x < brushSize - halfBrush; x++) {
          for (var y = -halfBrush; y < brushSize - halfBrush; y++) {
            modifiedTiles[mouseOverGridY + y][mouseOverGridX + x] = 100

            this.setState({
              highlights: { ...this.state.highlights, tiles: modifiedTiles }
            })
          }
        }
      } else {
        const halfBrush = brushSize / 2

        // Even Number of Tiles
        const xSide = relativeX % 1 >= 0.5 ? 1 : -1
        const ySide = relativeY % 1 >= 0.5 ? 1 : -1

        if (xSide === -1) {
          // left side
          for (var x = -halfBrush; x < brushSize - halfBrush; x++) {
            if (ySide === -1) {
              // top side
              for (var y = -halfBrush; y < brushSize - halfBrush; y++) {
                modifiedTiles[mouseOverGridY + y][mouseOverGridX + x] = 100

                this.setState({
                  highlights: { ...this.state.highlights, tiles: modifiedTiles }
                })
              }
            } else {
              // bottom side
              for (
                var y = -(halfBrush - 1);
                y < brushSize - (halfBrush - 1);
                y++
              ) {
                modifiedTiles[mouseOverGridY + y][mouseOverGridX + x] = 100

                this.setState({
                  highlights: { ...this.state.highlights, tiles: modifiedTiles }
                })
              }
            }
          }
        } else {
          // right side
          for (var x = -(halfBrush - 1); x < brushSize - (halfBrush - 1); x++) {
            if (ySide === -1) {
              // top side
              for (var y = -halfBrush; y < brushSize - halfBrush; y++) {
                modifiedTiles[mouseOverGridY + y][mouseOverGridX + x] = 100

                this.setState({
                  highlights: { ...this.state.highlights, tiles: modifiedTiles }
                })
              }
            } else {
              // bottom side
              for (
                var y = -(halfBrush - 1);
                y < brushSize - (halfBrush - 1);
                y++
              ) {
                modifiedTiles[mouseOverGridY + y][mouseOverGridX + x] = 100

                this.setState({
                  highlights: { ...this.state.highlights, tiles: modifiedTiles }
                })
              }
            }
          }
        }
      }
    }

    const setFillHighlights = (position, target, replacement) => {
      const replacementHighlights = grid.fill(
        this.props.grid.tiles,
        position,
        target,
        replacement
      )

      this.setState({
        highlights: { ...this.state.highlights, tiles: replacementHighlights }
      })
    }

    // Draw the Origin Axis
    // { X, Y, Z } === { R, G, B }
    const drawOrigin = () => {
      const origin = {
        x: 0 + this.props.camera.x,
        y: 0 + this.props.camera.y
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
      const relativeX =
        (mouse.x - this.props.camera.x) / (tileWidth * this.props.grid.scale)
      const relativeY =
        (mouse.y - this.props.camera.y) / (tileHeight * this.props.grid.scale)

      const mouseOverGridX = Math.floor(relativeX)
      const mouseOverGridY = Math.floor(relativeY)

      const clearHighlights = () => {
        const modifiedTiles = [...this.state.highlights.tiles]

        for (var y = 0; y < modifiedTiles.length; y++) {
          for (var x = 0; x < modifiedTiles[0].length; x++) {
            modifiedTiles[y][x] = 0
          }
        }

        this.setState({
          highlights: { ...this.state.highlights, tiles: modifiedTiles }
        })
      }

      clearHighlights()

      if (this.props.activeTool === 'pointer') {
      }

      if (this.props.activeTool === 'brush') {
        if (mouse.wheel.moved) {
          if (mouse.wheel.direction === 'up') {
            this.props.dispatch({
              type: 'BRUSH_SET_SIZE',
              value: this.props.brush.size + 1
            })
          }

          if (mouse.wheel.direction === 'down') {
            this.props.dispatch({
              type: 'BRUSH_SET_SIZE',
              value: this.props.brush.size - 1
            })
          }
        }

        const brushSize = this.props.brush.size
        setBrushHighlights(
          { x: mouseOverGridX, y: mouseOverGridY },
          { x: relativeX, y: relativeY },
          brushSize
        )

        if (mouse.left.pressed) {
          // Paint the highlighted tile, whatever they may be
          // tiles stored as an array of rows, so need to go y first here
          for (var y = 0; y < this.state.highlights.tiles.length; y++) {
            for (var x = 0; x < this.state.highlights.tiles[y].length; x++) {
              if (this.state.highlights.tiles[y][x] === 100) {
                this.props.dispatch({
                  type: 'GRID_SET_TILE',
                  value: {
                    x: x,
                    y: y,
                    type: this.props.terrain
                  }
                })
              }
            }
          }
        }
      }

      if (this.props.activeTool === 'erase') {
        if (mouse.wheel.moved) {
          if (mouse.wheel.direction === 'up') {
            this.props.dispatch({
              type: 'ERASE_SET_SIZE',
              value: this.props.erase.size + 1
            })
          }

          if (mouse.wheel.direction === 'down') {
            this.props.dispatch({
              type: 'ERASE_SET_SIZE',
              value: this.props.erase.size - 1
            })
          }
        }

        const eraseSize = this.props.erase.size

        setBrushHighlights(
          { x: mouseOverGridX, y: mouseOverGridY },
          { x: relativeX, y: relativeY },
          eraseSize
        )

        if (mouse.left.pressed) {
          // Paint the highlighted tile, whatever they may be
          // tiles stored as an array of rows, so need to go y first here
          for (var y = 0; y < this.state.highlights.tiles.length; y++) {
            for (var x = 0; x < this.state.highlights.tiles[y].length; x++) {
              if (this.state.highlights.tiles[y][x] === 100) {
                this.props.dispatch({
                  type: 'GRID_SET_TILE',
                  value: {
                    x: x,
                    y: y,
                    type: 0
                  }
                })
              }
            }
          }
        }
      }

      if (this.props.activeTool === 'fill') {
        setFillHighlights(
          { x: mouseOverGridX, y: mouseOverGridY },
          this.props.grid.tiles[mouseOverGridY][mouseOverGridX],
          100
        )

        if (mouse.left.pressed) {
          this.props.dispatch({
            type: 'GRID_FLOOD_FILL',
            value: {
              x: mouseOverGridX,
              y: mouseOverGridY,
              type: this.props.terrain
            }
          })
        }
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
        this.props.spritesheets,
        this.props.grid.scale,
        this.props.grid.tileSize,
        this.props.grid.tileSize
      )

      // Render the Tool highlights
      graphics.tiles(
        this.props.camera.x,
        this.props.camera.y,
        this.state.highlights.tiles,
        this.props.spritesheets,
        this.props.grid.scale,
        this.props.grid.tileSize,
        this.props.grid.tileSize
      )

      drawOrigin()
      drawViewportBox()
    })
  }

  componentDidUpdate() {
    const bramblePane = document.querySelector('#bramble-pane')
    const size = {
      width: bramblePane.offsetWidth,
      height: bramblePane.offsetHeight
    }

    game.setSize(size.width, size.height)
    game.setSmoothing(false)
  }

  render() {
    return (
      <Layout>
        <Sidebar />
        <div id='bramble-pane'>
          <div id='bramble-view'></div>
        </div>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    showGrid: state.map.grid.visible,
    grid: state.map.grid,
    camera: state.map.camera,
    activeTool: state.map.tool.active,
    brush: state.map.brush,
    erase: state.map.erase,
    highlights: state.map.highlights,
    fill: state.map.fill,
    terrain: state.map.terrain,
    spritesheets: state.spritesheets
  }
}

module.exports = connect(mapStateToProps)(MapEditor)
