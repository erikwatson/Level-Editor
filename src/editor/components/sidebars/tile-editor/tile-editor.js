const React = require('react')
const { connect } = require('react-redux')

const Sidebar = require('../../sidebar/sidebar.js')

const ViewPanel = require('./view-panel/view-panel.js')
const GridPanel = require('./grid-panel/grid-panel.js')
const ToolPanel = require('./tool-panel/tool-panel.js')

const style = require('./tile-editor.sass')

const TileEditorSidebar = props => {
  return (
    <Sidebar title='Tile Editor'>
      <ToolPanel />
      <GridPanel />
      <ViewPanel />
    </Sidebar>
  )
}

const mapStateToProps = state => {
  return {}
}

module.exports = connect(mapStateToProps)(TileEditorSidebar)
