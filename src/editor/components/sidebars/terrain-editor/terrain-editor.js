const React = require('react')
const style = require('./terrain-editor.sass')

const Sidebar = require('../../sidebar/sidebar.js')
const Panel = require('../../ui/panel/panel.js')

module.exports = () => {
  return (
    <Sidebar title='Terrain Editor'>
      <Panel />
    </Sidebar>
  )
}
