const React = require('react')
const Sidebar = require('./components/sidebar/sidebar.js')
const BrambleView = require('./components/bramble-view/bramble-view.js')

const style = require('./app.sass')

module.exports = () => {
  return (
    <div id='app'>
      <Sidebar title='Level Editor' />
      <BrambleView width={500} height={500} />
    </div>
  )
}
