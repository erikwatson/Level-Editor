const React = require('react')
const PanelList = require('./panel-list/panel-list.js')
const Panel = require('./panel/panel.js')
const Layer = require('./layer/layer.js')
const ViewPanel = require('./view-panel/view-panel.js')
const GridPanel = require('./grid-panel/grid-panel.js')
const ToolPanel = require('./tool-panel/tool-panel.js')

const LayerButtons = require('./layer-buttons/layer-buttons.js')

const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome')
const { faPlusSquare } = require('@fortawesome/free-solid-svg-icons')

const style = require('./sidebar.sass')

module.exports = ({ title = 'Sidebar', cameraX = 0, cameraY = 0 }) => {
  return (
    <div id='sidebar'>
      <div>
        <h1>{title}</h1>
      </div>
      <PanelList open={false}>
        <ViewPanel />
        <Panel title='Camera'>
          <div className='section'>
            <div className='property'>
              <label>X:</label>
              <p>{cameraX}</p>
            </div>
          </div>
          <div className='section'>
            <div className='property'>
              <label>Y:</label>
              <p>{cameraY}</p>
            </div>
          </div>
        </Panel>
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
