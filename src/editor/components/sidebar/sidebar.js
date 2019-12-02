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

module.exports = ({ title = 'Sidebar', cameraX = 0, cameraY = 0 }) => {
  return (
    <div id='sidebar'>
      <div>
        <h1>{title}</h1>
      </div>
      <PanelList open={true}>
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
        <Panel title='Tools'>
          <div className='section'>
            <ToolButtons />
          </div>
          <div className='section'>
            <p>Tool specific options here</p>
          </div>
        </Panel>
        <Panel title='Grid'>
          <div className='section'>
            <div className='input range'>
              <label>Height:</label>
              <input type='range' value={500} max={832} min={64} />
              <label className='value'>10 Tiles</label>
            </div>
            <div className='input range'>
              <label>Width:</label>
              <input type='range' value={500} max={832} min={64} />
              <label className='value'>10 Tiles</label>
            </div>
          </div>
        </Panel>
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
