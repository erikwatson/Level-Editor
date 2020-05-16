const React = require('react')
const { connect } = require('react-redux')
const style = require('./terrain-editor.sass')

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

class TerrainEditor extends React.Component {
  componentDidMount() {
    const container = document.querySelector('#bramble-view')

    game.attachTo(container)
    game.disableContextMenu()
    game.setSize(this.props.width, this.props.height)
    game.setSmoothing(false)

    game.setUpdate(delta => {})

    game.setRender(() => {
      graphics.clear('#ff0000')
    })
  }

  render() {
    return (
      <div id='bramble-pane'>
        <div id='bramble-view'></div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    width: 500,
    height: 500
  }
}

module.exports = connect(mapStateToProps)(TerrainEditor)
