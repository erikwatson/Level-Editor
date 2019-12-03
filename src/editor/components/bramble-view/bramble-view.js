const React = require('react')
const { connect } = require('react-redux')
const style = require('./bramble-view.sass')

const {
  game,
  graphics,
  mouse
} = require('../../../bramble/src/bramble/bramble')

class BrambleView extends React.Component {
  componentDidMount() {
    const container = document.querySelector('#bramble-view')

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
      const tileWidth = 32
      const tileHeight = 32

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
    game.setUpdate(delta => {
      // console.log(mouse)
      if (mouse.left.pressed) {
        this.props.dispatch({
          type: 'CAMERA_SET_POS',
          value: { x: mouse.x, y: mouse.y }
        })
      }
    })
    game.setRender(() => {
      graphics.clear('#000000')
      drawGrid()
      drawOrigin()
      drawBoundingBox()
    })

    game.start()
  }

  componentDidUpdate() {
    game.setSize(this.props.width, this.props.height)
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
    grid: state.grid
  }
}

module.exports = connect(mapStateToProps)(BrambleView)
