const React = require('react')
const { connect } = require('react-redux')

const TileEditorView = require('./components/views/tile-editor/tile-editor.js')
const TileEditorSidebar = require('./components/sidebars/tile-editor/tile-editor.js')

const TerrainEditorView = require('./components/views/terrain-editor/terrain-editor.js')
const TerrainEditorSidebar = require('./components/sidebars/terrain-editor/terrain-editor.js')

const style = require('./app.sass')

const App = props => {
  return (
    <div id='app'>
      <TerrainEditorSidebar />
      <TerrainEditorView {...props} />
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
