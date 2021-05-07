import * as React from 'react'
const { connect } = require('react-redux')
const style = require('./sidebar.css')

const Sidebar = require('../../../components/sidebar/sidebar')
const Panel = require('../../../components/ui/panel/panel')

const TerrainEditorSidebar = props => {
  return (
    <Sidebar title='Terrain Editor' {...props}>
      <Panel title='Visualisations'>
        <div className='section'>
          <div className='input range'>
            <label>Outline:</label>
            <input
              type='checkbox'
              defaultChecked={true}
              onChange={this.visibleChange}
            />
          </div>
        </div>

        <div className='section'>
          <div className='input range'>
            <label>Innerline:</label>
            <input
              type='checkbox'
              defaultChecked={true}
              onChange={this.visibleChange}
            />
          </div>
        </div>
      </Panel>

      <Panel title='Terrain'>
        <div className='section'>
          <div className='input range'>
            <label>Type:</label>
            <select>
              <option value='1'>Default</option>
              <option value='2'>Green Hills</option>
            </select>
          </div>
        </div>
      </Panel>

      <Panel title='Tiles'>
        <div className='section'>
          <span>To be continued...</span>
        </div>
      </Panel>
    </Sidebar>
  )
}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps)(TerrainEditorSidebar)
