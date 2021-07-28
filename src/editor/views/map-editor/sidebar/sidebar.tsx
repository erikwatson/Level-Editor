import * as React from 'react'
const { connect } = require('react-redux')

const Sidebar = require('../../../components/sidebar/sidebar')

const ViewPanel = require('./view-panel/view-panel')
const GridPanel = require('./grid-panel/grid-panel')
const ToolPanel = require('./tool-panel/tool-panel')

const style = require('./sidebar.sass')

const LevelEditorSidebar = props => {
  return (
    <Sidebar title='Map Editor' showHeader={true} showNav={true}>
      <ToolPanel />
      <GridPanel />
    </Sidebar>
  )
}

const mapStateToProps = state => {
  return {}
}

module.exports = connect(mapStateToProps)(LevelEditorSidebar)
