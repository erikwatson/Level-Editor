const React = require('react')
const PanelList = require('../../ui/panel-list/panel-list.js')
const Panel = require('../../ui/panel/panel.js')
const Layer = require('../../ui/layer/layer.js')
const ViewPanel = require('./view-panel/view-panel.js')
const GridPanel = require('./grid-panel/grid-panel.js')
const ToolPanel = require('./tool-panel/tool-panel.js')

const LayerButtons = require('./layer-buttons/layer-buttons.js')

const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome')
const { faPlusSquare } = require('@fortawesome/free-solid-svg-icons')

const style = require('./tile-editor.sass')

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
      <PanelList open={true}>
        <ViewPanel />
        <ToolPanel />
        <GridPanel />
        <Panel title='Layers'>
          <div>
            <Layer title='Layer 1' />
            <Layer title='Layer 2' selected />
            <Layer title='Layer 3' />
          </div>
        </Panel>
      </PanelList>
    </div>
  )
}
