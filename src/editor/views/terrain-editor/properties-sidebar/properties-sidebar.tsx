import * as React from 'react'
const { connect } = require('react-redux')
const style = require('./properties-sidebar.sass')

const Sidebar = require('../../../components/sidebar/sidebar')
const Panel = require('../../../components/ui/panel/panel')

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
