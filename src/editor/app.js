const React = require('react')
const { connect } = require('react-redux')

const Sidebar = require('./components/sidebar/sidebar.js')
const BrambleView = require('./components/bramble-view/bramble-view.js')

const style = require('./app.sass')

const App = ({ width, height }) => {
  return (
    <div id='app'>
      <Sidebar title='Level Editor' />
      <BrambleView width={width} height={height} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    width: state.view.width,
    height: state.view.height
  }
}

module.exports = connect(mapStateToProps)(App)
