const React = require('react')
const { connect } = require('react-redux')
const style = require('./properties-sidebar.sass')

const Sidebar = require('../../../components/sidebar/sidebar.js')
const Panel = require('../../../components/ui/panel/panel.js')

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

module.exports = connect(mapStateToProps)(TerrainEditorSidebar)
