import * as React from 'react'
import { connect } from 'react-redux'

import Sidebar from '../../../components/sidebar/sidebar'

import ViewPanel from './view-panel/view-panel'
import GridPanel from './grid-panel/grid-panel'
import ToolPanel from './tool-panel/tool-panel'
import LayerPanel from './layer-panel'

import './sidebar.sass'

const LevelEditorSidebar = props => {
  return (
    <Sidebar title='Map Editor' showHeader={true} showNav={true}>
      <ToolPanel />
      <GridPanel />
      <LayerPanel />
    </Sidebar>
  )
}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps)(LevelEditorSidebar)
