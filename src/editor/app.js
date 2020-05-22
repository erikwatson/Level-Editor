const React = require('react')
const { connect } = require('react-redux')

const MapEditorView = require('./views/map-editor/map-editor.js')
const TerrainEditorView = require('./views/terrain-editor/terrain-editor.js')
const SplashView = require('./views/welcome/welcome.js')

const style = require('./app.sass')

const { assets } = require('@erikwatson/bramble')

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
  Promise.all([
    assets.loadTerrain('./terrain/default.json'),
    assets.loadTerrain('./terrain/green-hills.json'),
    assets.loadTerrain('./terrain/highlights.json'),
    assets.loadTerrain('./terrain/grass-decoration.json'),
    assets.loadTerrain('./terrain/stalactites.json'),
    assets.loadTerrain('./terrain/rock.json'),
    assets.loadTerrain('./terrain/waterfall.json')
  ]).then(terrain => {
    props.setSpritesheets(terrain)
  })

  const view = getView(props.view)
  return <div>{view}</div>
}

const mapStateToProps = state => {
  return {
    view: state.view
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSpritesheets: spritesheets => {
      dispatch({ type: 'SPRITESHEETS_SET', value: spritesheets })
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(App)
