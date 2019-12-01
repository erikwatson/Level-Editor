const React = require('react')
const style = require('./bramble-view.sass')

const { game, graphics } = require('../../../bramble/src/bramble/bramble')

class BrambleView extends React.Component {
  componentDidMount() {
    console.log('bramble view mounted')

    const container = document.querySelector('#bramble-view')
    game.attachTo(container)

    game.disableContextMenu()
    game.setSize(this.props.width, this.props.height)
    game.setSmoothing(false)
    game.setUpdate(delta => {})
    game.setRender(() => {
      graphics.clear('#000000')

      const tl = { x: 0, y: 0 }
      const tr = { x: this.props.width, y: 0 }
      const bl = { x: 0, y: this.props.height }
      const br = { x: this.props.width, y: this.props.height }

      const thickLine = { width: 4, color: '#ffffff' }
      const midLine = { width: 2, color: '#ff000066' }
      const thinLine = { width: 1, color: '#ff000066' }

      // Draw the Grid lines
      for (let i = 0; i < this.props.width / 32; i++) {
        const top = {
          x: 32 * i,
          y: 0
        }

        const bottom = {
          x: 32 * i,
          y: this.props.height
        }

        if (i % 2 === 0) {
          graphics.line(top, bottom, thinLine)
        } else {
          graphics.line(top, bottom, midLine)
        }
      }

      for (let i = 0; i < this.props.height / 32; i++) {
        const left = {
          x: 0,
          y: i * 32
        }

        const right = {
          x: this.props.width,
          y: i * 32
        }

        if (i % 2 === 0) {
          graphics.line(left, right, thinLine)
        } else {
          graphics.line(left, right, midLine)
        }
      }

      // Draw the Bounding Box
      graphics.line(tl, tr, thickLine)
      graphics.line(tr, br, thickLine)
      graphics.line(br, bl, thickLine)
      graphics.line(bl, tl, thickLine)
    })

    game.start()
  }

  componentDidUpdate() {
    console.log('bramble update')
    game.setSize(this.props.width, this.props.height)
  }

  render() {
    return <div id='bramble-view'></div>
  }
}

module.exports = BrambleView
