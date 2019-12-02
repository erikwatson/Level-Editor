const React = require('react')
const { connect } = require('react-redux')

const Sidebar = require('./components/sidebar/sidebar.js')
const BrambleView = require('./components/bramble-view/bramble-view.js')

const style = require('./app.sass')

const App = props => {
  return (
    <div id='app'>
      <Sidebar
        title='Level Editor'
        cameraX={props.cameraX}
        cameraY={props.cameraY}
      />
      <BrambleView {...props} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    width: state.view.width,
    height: state.view.height,
    cameraX: state.camera.x,
    cameraY: state.camera.y
  }
}

module.exports = connect(mapStateToProps)(App)
