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
  render() {
    return (
      <div>
        <h1>Terrain Editor</h1>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

module.exports = connect(mapStateToProps)(TerrainEditor)
