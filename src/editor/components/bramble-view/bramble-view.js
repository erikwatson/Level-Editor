const React = require('react')
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
      const tl = { x: 0 + this.props.cameraX, y: 0 + this.props.cameraY }
      const tr = { x: 32 * 10 + this.props.cameraX, y: 0 + this.props.cameraY }
      const bl = { x: 0 + this.props.cameraX, y: 32 * 10 + this.props.cameraY }
      const br = {
        x: 32 * 10 + this.props.cameraX,
        y: 32 * 10 + this.props.cameraY
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
    console.log('bramble update')
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

module.exports = BrambleView
