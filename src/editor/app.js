const React = require('react')
const { connect } = require('react-redux')

const TileEditorView = require('./components/views/map-editor/map-editor.js')
const TileEditorSidebar = require('./components/sidebars/map-editor/map-editor.js')

const TerrainEditorView = require('./components/views/terrain-editor/terrain-editor.js')
const TerrainEditorSidebar = require('./components/sidebars/terrain-editor/terrain-editor.js')

const style = require('./app.sass')

const App = props => {
  const tileView = [<TileEditorSidebar />, <TileEditorView {...props} />]
  const terrainView = [<TerrainEditorSidebar />, <TerrainEditorView />]

  const getView = title => {
    switch (title) {
      case 'tile':
        return tileView
      case 'terrain':
        return terrainView
      default:
        console.error(`no view defined for "${title}"`)
    }
  }

  const view = getView(props.app)

  return <div id='app'>{view}</div>
}

const mapStateToProps = state => {
  return {
    width: state.view.width,
    height: state.view.height,
    cameraX: state.tile.camera.x,
    cameraY: state.tile.camera.y,
    app: state.app
  }
}

module.exports = connect(mapStateToProps)(App)
