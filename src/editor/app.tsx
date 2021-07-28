import * as React from 'react'
import { connect } from 'react-redux'

import MapEditorView from './views/map-editor/map-editor'
import TerrainEditorView from './views/terrain-editor/terrain-editor'
import SplashView from './views/welcome/welcome'

import style from './app.sass'

// const { assets } from '@erikwatson/bramble')
import { assets } from '@erikwatson/bramble'

function getView(name) {
  switch (name) {
    case 'map':
      // return <MapEditorView />
      return null
    case 'terrain':
      // return <TerrainEditorView />
      return null
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

  // const view = getView(props.view)
  const view = null

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

export default connect(mapStateToProps, mapDispatchToProps)(App)
