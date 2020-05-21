const React = require('react')
const { connect } = require('react-redux')

const MapEditorView = require('./views/map-editor/map-editor.js')
const TerrainEditorView = require('./views/terrain-editor/terrain-editor.js')
const SplashView = require('./views/welcome/welcome.js')

const style = require('./app.sass')

function getView(name) {
  switch (name) {
    case 'map':
      return <MapEditorView />
    case 'terrain':
      return <TerrainEditorView />
    case 'splash':
      return <SplashView />

    default:
      console.error(`No View named: ${name}`)
      return <SplashView />
  }
}

const App = props => {
  const view = getView(props.view)
  return <div>{view}</div>
}

const mapStateToProps = state => {
  return {
    width: state.view.width,
    height: state.view.height,
    cameraX: state.tile.camera.x,
    cameraY: state.tile.camera.y,
    view: state.app
  }
}

module.exports = connect(mapStateToProps)(App)
