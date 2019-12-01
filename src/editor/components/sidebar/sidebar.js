const React = require('react')
const PanelList = require('./panel-list/panel-list.js')
const Panel = require('./panel/panel.js')
const Layer = require('./layer/layer.js')
const ButtonGroup = require('./button-group/button-group.js')

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
            <ButtonGroup />
          </div>
          <div className='section'>
            <p>Tool specific options here</p>
          </div>
        </Panel>
        <Panel title='Grid'>
          <div className='input'>
            <label>Visible:</label>
            <input type='checkbox' />
          </div>
          <div className='input range'>
            <label>Width:</label>
            <input type='range' />
          </div>
          <div className='input range'>
            <label>Height:</label>
            <input type='range' />
          </div>
        </Panel>
        <Panel title='Layers'>
          <div className='input'>
            <FontAwesomeIcon icon={faPlusSquare} />
          </div>
          <div>
            <Layer />
            <Layer />
            <Layer />
          </div>
        </Panel>
      </PanelList>
    </div>
  )
}
