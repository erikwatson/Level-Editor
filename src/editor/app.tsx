import * as React from 'react'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import MapEditorView from './views/map-editor/map-editor'
import TerrainEditorView from './views/terrain-editor/terrain-editor'
import SplashView from './views/welcome/welcome'
import ParticleView from './views/particle-editor'

import { assets } from '@erikwatson/bramble'

import './app.sass'

function getView(name) {
  switch (name) {
    case 'map':
      return <MapEditorView />

    case 'terrain':
      return <TerrainEditorView />

    case 'splash':
      return <SplashView />

    case 'particle':
      return <ParticleView />

    default:
      console.error(`No View named: ${name}`)
      return <SplashView />
  }
}

const App = props => {
  const [state, setState] = useState({
    terrain: []
  })

  useEffect(() => {
    Promise.all([
      assets.loadTerrain('./terrain/default.json'),
      assets.loadTerrain('./terrain/default-2.json'),
      assets.loadTerrain('./terrain/highlights.json')
    ]).then(spritesheets => {
      props.setSpritesheets(spritesheets)
    })
  }, [])

  if (!state.terrain) return <div>Loading...</div>

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

export default connect(mapStateToProps, mapDispatchToProps)(App as any)
