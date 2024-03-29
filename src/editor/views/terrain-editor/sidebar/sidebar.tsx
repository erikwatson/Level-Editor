import * as React from 'react'
import { connect } from 'react-redux'
import './sidebar.sass'

import Sidebar from '../../../components/sidebar/sidebar'
import Panel from '../../../components/ui/panel/panel'

const TerrainEditorSidebar = props => {
  return (
    <Sidebar title='Terrain Editor' {...props}>
      <Panel title='Visualisations'>
        <div className='section'>
          <div className='input range'>
            <label>Outline:</label>
            <input type='checkbox' defaultChecked={true} />
          </div>
        </div>

        <div className='section'>
          <div className='input range'>
            <label>Innerline:</label>
            <input type='checkbox' defaultChecked={true} />
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
