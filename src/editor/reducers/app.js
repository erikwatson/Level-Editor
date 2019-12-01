const { combineReducers } = require('redux')

const view = (state = { width: 200, height: 200 }, action) => {
  switch (action.type) {
    case 'VIEW_SET_WIDTH':
      return { ...state, width: parseInt(action.value) }

    case 'VIEW_SET_HEIGHT':
      return { ...state, height: parseInt(action.value) }

    default:
      return state
  }
}

const appReducer = combineReducers({
  view
})

module.exports = appReducer
