const React = require('react')
const { connect } = require('react-redux')

const Sidebar = require('../../sidebar/sidebar.js')

const ViewPanel = require('./view-panel/view-panel.js')
const GridPanel = require('./grid-panel/grid-panel.js')
const ToolPanel = require('./tool-panel/tool-panel.js')

const style = require('./map-editor.sass')

const MapEditorSidebar = props => {
  return (
    <Sidebar title='Map Editor'>
      <ToolPanel />
      <GridPanel />
      <ViewPanel />
    </Sidebar>
  )
}

const mapStateToProps = state => {
  return {}
}

module.exports = connect(mapStateToProps)(MapEditorSidebar)
