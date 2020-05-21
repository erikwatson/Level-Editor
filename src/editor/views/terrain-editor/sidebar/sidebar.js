const React = require('react')
const { connect } = require('react-redux')
const style = require('./sidebar.sass')

const Sidebar = require('../../../components/sidebar/sidebar.js')
const Panel = require('../../../components/ui/panel/panel.js')

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
