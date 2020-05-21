const React = require('react')
const { connect } = require('react-redux')

const Sidebar = require('../../../components/sidebar/sidebar.js')

const ViewPanel = require('./view-panel/view-panel.js')
const GridPanel = require('./grid-panel/grid-panel.js')
const ToolPanel = require('./tool-panel/tool-panel.js')

const style = require('./sidebar.sass')

const LevelEditorSidebar = props => {
  return (
    <Sidebar title='Map Editor'>
      <ToolPanel />
      <GridPanel />
    </Sidebar>
  )
}

const mapStateToProps = state => {
  return {}
}

module.exports = connect(mapStateToProps)(LevelEditorSidebar)
