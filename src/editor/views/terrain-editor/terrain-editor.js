const React = require('react')
const { connect } = require('react-redux')

const style = require('./terrain-editor.sass')

const {
  game,
  graphics,
  mouse,
  prevMouse,
  keyboard,
  assets,
  sound,
  grid
} = require('@erikwatson/bramble')

const Layout = require('../layouts/sidebar-left/sidebar-left.js')
const Sidebar = require('./sidebar/sidebar.js')
const BrambleView = require('../../components/ui/bramble-view/bramble-view.js')

class TerrainEditor extends React.Component {
  componentDidMount() {
    const container = document.querySelector('#bramble-view')

    game.attachTo(container)
    game.disableContextMenu()
    game.setSize()
    game.setSmoothing(false)

    game.setUpdate(delta => {})

    let spritesheets = []

    game.setRender(() => {})

    Promise.all([assets.loadTerrain('./terrain/default.json')])
      .then(terrain => {
        spritesheets = terrain
        game.start()
      })
      .catch(err => {
        console.error(err)
      })
  }

  componentDidUpdate() {
    const bramblePane = document.querySelector('#bramble-pane')
    const size = {
      width: bramblePane.offsetWidth,
      height: bramblePane.offsetHeight
    }

    game.setSize(size.width, size.height)
    game.setSmoothing(false)
  }

  render() {
    return (
      <Layout>
        <Sidebar />
        <BrambleView />
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

module.exports = connect(mapStateToProps)(TerrainEditor)
