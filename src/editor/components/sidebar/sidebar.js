const React = require('react')
const { connect } = require('react-redux')
const PanelList = require('../ui/panel-list/panel-list.js')
const Panel = require('../ui/panel/panel.js')

const style = require('./sidebar.sass')

const SideBar = props => {
  const { title = 'Sidebar', cameraX = 0, cameraY = 0, children } = props

  return (
    <div id='sidebar'>
      <div className='header'>
        <h1>{title}</h1>
        <div className='link'>
          <span>
            <a href='https://github.com/erikwatson/Level-Editor/issues'>
              Report a Bug or request a Feature
            </a>
          </span>
        </div>
      </div>

      <div className='nav'>
        <ul>
          <li
            onClick={() => {
              props.setTitle('tile')
            }}>
            <a>Tiles</a>
          </li>
          <li
            onClick={() => {
              props.setTitle('terrain')
            }}>
            <a>Terrain</a>
          </li>
        </ul>
      </div>

      <PanelList>{children}</PanelList>
    </div>
  )
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    setTitle: (title = 'tile') => {
      dispatch({ type: 'APP_SET_TITLE', value: title })
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(SideBar)
