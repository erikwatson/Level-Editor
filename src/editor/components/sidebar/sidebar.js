const React = require('react')
const PanelList = require('./panel-list/panel-list.js')
const Panel = require('./panel/panel.js')
const Layer = require('./layer/layer.js')
const style = require('./sidebar.sass')

module.exports = ({ title = 'Sidebar' }) => {
  return (
    <div id='sidebar'>
      <div>
        <h1>{title}</h1>
      </div>
      <PanelList open={true}>
        <Panel title='Tools'>
          <h3>Tools</h3>
          <p>Select a tool to use</p>
        </Panel>
        <Panel title='Grid'>
          <h3>Dimensions</h3>

          <div className='range'>
            <label>Width:</label>
            <input type='range' />
          </div>

          <div className='range'>
            <label>Height:</label>
            <input type='range' />
          </div>
        </Panel>
        <Panel title='Layers'>
          <h3>Layers</h3>
          <Layer />
          <Layer />
          <Layer />
        </Panel>
      </PanelList>
    </div>
  )
}
