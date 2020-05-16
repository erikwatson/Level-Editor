const React = require('react')
const { connect } = require('react-redux')

const Sidebar = require('./components/sidebars/tile-editor/tile-editor.js')
const TileEditorView = require('./components/views/tile-editor/tile-editor.js')
const TerrainEditorView = require('./components/views/terrain-editor/terrain-editor.js')

const style = require('./app.sass')

const App = props => {
  return (
    <div id='app'>
      <Sidebar
        title='Level Editor'
        cameraX={props.cameraX}
        cameraY={props.cameraY}
      />
      <TileEditorView {...props} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    width: state.view.width,
    height: state.view.height,
    cameraX: state.camera.x,
    cameraY: state.camera.y
  }
}

module.exports = connect(mapStateToProps)(App)
