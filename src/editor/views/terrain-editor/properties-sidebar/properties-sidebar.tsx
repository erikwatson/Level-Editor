import * as React from 'react'
import { connect } from 'react-redux'
import style from './properties-sidebar.sass'

import Sidebar from '../../../components/sidebar/sidebar'
import Panel from '../../../components/ui/panel/panel'

const TerrainEditorSidebar = props => {
  return (
    <Sidebar {...props}>
      <Panel title='Properties' open={true}>
        <div className='section'>
          <h3>Tiles</h3>
          <div></div>
        </div>
      </Panel>
    </Sidebar>
  )
}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps)(TerrainEditorSidebar)
