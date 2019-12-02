const React = require('react')
const PanelList = require('./panel-list/panel-list.js')
const Panel = require('./panel/panel.js')
const Layer = require('./layer/layer.js')
const ViewPanel = require('./view-panel/view-panel.js')

const ToolButtons = require('./tool-buttons/tool-buttons.js')
const LayerButtons = require('./layer-buttons/layer-buttons.js')

const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome')
const { faPlusSquare } = require('@fortawesome/free-solid-svg-icons')

const style = require('./sidebar.sass')

module.exports = ({ title = 'Sidebar' }) => {
  return (
    <div id='sidebar'>
      <div>
        <h1>{title}</h1>
      </div>
      <PanelList open={true}>
        <Panel title='Tools'>
          <div className='section'>
            <ToolButtons />
          </div>
          <div className='section'>
            <p>Tool specific options here</p>
          </div>
        </Panel>
        <ViewPanel />
        <Panel title='Grid'>
          <div className='section'>
            <LayerButtons />
          </div>
          <h3>Layers</h3>
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
