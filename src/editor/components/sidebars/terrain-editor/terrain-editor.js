const React = require('react')
const { connect } = require('react-redux')
const style = require('./terrain-editor.sass')

const Sidebar = require('../../sidebar/sidebar.js')
const Panel = require('../../ui/panel/panel.js')

const TerrainEditorSidebar = props => {
  return (
    <Sidebar title='Terrain Editor'>
      <Panel title='Terrain' />
      <Panel title='Tiles' />
      <Panel title='Images' />
    </Sidebar>
  )
}

const mapStateToProps = state => {
  return {}
}

module.exports = connect(mapStateToProps)(TerrainEditorSidebar)
