const React = require('react')
const { connect } = require('react-redux')
const style = require('./bramble-view.sass')

const {
  game,
  graphics,
  mouse,
  keyboard,
  assets
} = require('../../../bramble/src/bramble/bramble')

class BrambleView extends React.Component {
  componentDidMount() {
    const container = document.querySelector('#bramble-view')

    let spritesheets = []

    Promise.all([
      assets.loadTerrain('./terrain/default.json'),
      assets.loadTerrain('./terrain/green-hills.json')
    ])
      .then(terrain => {
        spritesheets = terrain
        game.start()
      })
      .catch(err => {
        console.error(err)
      })

    const drawBoundingBox = () => {
      const tl = { x: 0, y: 0 }
      const tr = { x: this.props.width, y: 0 }
      const bl = { x: 0, y: this.props.height }
      const br = { x: this.props.width, y: this.props.height }

      const line = { width: 4, color: '#ffffff' }

      // Draw the Bounding Box
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

      const tl = { x: 0 + this.props.cameraX, y: 0 + this.props.cameraY }
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

      const columns = (tr.x - tl.x) / tileWidth

      for (let i = 0; i < columns; i++) {
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

      for (let i = 0; i < rows; i++) {
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

      const line = { width: 4, color: '#ffffff' }

      // Draw the Bounding Box
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

    game.attachTo(container)

    game.disableContextMenu()
    game.setSize(this.props.width, this.props.height)
    game.setSmoothing(false)

    const tileWidth = this.props.grid.tileSize
    const tileHeight = this.props.grid.tileSize

    game.setUpdate(delta => {
      if (keyboard.ctrl.pressed) {
        // TODO: set the cursor to a hand somehow?

        if (mouse.left.pressed) {
          this.props.dispatch({
            type: 'CAMERA_SET_POS',
            value: { x: parseInt(mouse.x), y: parseInt(mouse.y) }
          })
        }
      } else {
        const mouseOverGridX = Math.floor(
          (mouse.x - this.props.camera.x) / (tileWidth * this.props.grid.scale)
        )
        const mouseOverGridY = Math.floor(
          (mouse.y - this.props.camera.y) / (tileHeight * this.props.grid.scale)
        )

        if (mouse.left.pressed) {
          // insert a tile at this position
          this.props.dispatch({
            type: 'GRID_SET_TILE',
            value: {
              x: mouseOverGridX,
              y: mouseOverGridY,
              type: 1
            }
          })
        }

        if (mouse.right.pressed) {
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
    })
    game.setRender(() => {
      graphics.clear('#000000')
      drawGrid()
      graphics.tiles(
        this.props.camera.x,
        this.props.camera.y,
        this.props.grid.tiles,
        spritesheets,
        this.props.grid.scale,
        this.props.grid.tileSize,
        this.props.grid.tileSize
      )
      drawOrigin()
      drawBoundingBox()
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
    grid: state.grid,
    camera: state.camera
  }
}

module.exports = connect(mapStateToProps)(BrambleView)
