const React = require('react')
const style = require('./bramble-view.sass')

const { game, graphics } = require('../../../bramble/src/bramble/bramble')

class BrambleView extends React.Component {
  componentDidMount() {
    const container = document.querySelector('#bramble-view')
    game.attachTo(container)

    game.disableContextMenu()
    game.setSize(this.props.width, this.props.height)
    game.setSmoothing(false)
    game.setUpdate(delta => {})
    game.setRender(() => {
      graphics.clear('#e3e3e3')
    })

    game.start()
  }

  render() {
    return <div id='bramble-view'></div>
  }
}

module.exports = BrambleView
