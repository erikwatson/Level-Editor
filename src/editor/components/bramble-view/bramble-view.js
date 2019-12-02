const React = require('react')
const style = require('./bramble-view.sass')

const { game, graphics } = require('../../../bramble/src/bramble/bramble')

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

    // Draw the Origin Axis
    // { X, Y, Z } === { R, G, B }
    const drawOrigin = () => {
      const origin = {
        x: this.props.width / 2,
        y: this.props.height / 2
      }

      graphics.line(
        origin,
        { ...origin, x: origin.x + 64 },
        { width: 1, color: 'red' }
      )

      const ctx = graphics.getContext()

      ctx.fillStyle = 'red'

      ctx.moveTo(origin.x + 64, origin.y)
      ctx.lineTo(origin.x + 64, origin.y - 4)
      ctx.lineTo(origin.x + 64 + 4, origin.y)
      ctx.lineTo(origin.x + 64, origin.y + 4)

      ctx.fill()

      graphics.line(
        origin,
        { ...origin, y: origin.y + 64 },
        { width: 1, color: 'green' }
      )

      ctx.fillStyle = 'green'

      ctx.moveTo(origin.x, origin.y + 64)
      ctx.lineTo(origin.x + 4, origin.y + 64)
      ctx.lineTo(origin.x, origin.y + 64 + 4)
      ctx.lineTo(origin.x - 4, origin.y + 64)

      ctx.fill()
    }

    game.attachTo(container)

    game.disableContextMenu()
    game.setSize(this.props.width, this.props.height)
    game.setSmoothing(false)
    game.setUpdate(delta => {})
    game.setRender(() => {
      graphics.clear('#000000')
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
