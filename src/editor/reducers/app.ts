import { combineReducers } from 'redux'

import terrain from './terrain-editor/terrain-editor'
import map from './map-editor/map-editor'

const view = (state = 'map', action) => {
  switch (action.type) {
    case 'APP_SET_VIEW':
      return action.value

    default:
      return state
  }
}

const spritesheets = (state = [], action) => {
  switch (action.type) {
    case 'SPRITESHEETS_SET':
      return action.value

    default:
      return state
  }
}

// the real app reducer would combine the state for all views and sidebars
const appReducer = combineReducers({
  view,
  terrain,
  map,
  spritesheets
})

export default appReducer
