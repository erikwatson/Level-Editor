const React = require('react')
const PanelList = require('../ui/panel-list/panel-list.js')
const Panel = require('../ui/panel/panel.js')

module.exports = ({ title = 'Sidebar', cameraX = 0, cameraY = 0 }) => {
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

      <PanelList>
        <Panel title='Test' />
      </PanelList>
    </div>
  )
}
