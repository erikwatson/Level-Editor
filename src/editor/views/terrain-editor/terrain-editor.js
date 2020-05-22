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

const allShapes = [
  [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0]
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [0, 0, 0]
  ],
  [
    [0, 0, 0],
    [0, 1, 1],
    [0, 0, 0]
  ],
  [
    [0, 0, 0],
    [0, 1, 0],
    [0, 1, 0]
  ],
  [
    [0, 0, 0],
    [1, 1, 0],
    [0, 0, 0]
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0]
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  [
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, 0]
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0]
  ],
  [
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0]
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0]
  ],
  [
    [1, 1, 0],
    [1, 1, 0],
    [0, 1, 1]
  ],
  [
    [0, 1, 1],
    [1, 1, 1],
    [1, 1, 0]
  ],
  [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 0]
  ],
  [
    [0, 1, 1],
    [0, 1, 1],
    [0, 0, 0]
  ],
  [
    [0, 0, 0],
    [0, 1, 1],
    [0, 1, 1]
  ],
  [
    [0, 0, 0],
    [1, 1, 0],
    [1, 1, 0]
  ],
  [
    [0, 1, 0],
    [1, 1, 0],
    [0, 0, 0]
  ],
  [
    [0, 1, 0],
    [0, 1, 1],
    [0, 0, 0]
  ],
  [
    [0, 0, 0],
    [0, 1, 1],
    [0, 1, 0]
  ],
  [
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 0]
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
    [1, 1, 0]
  ],
  [
    [1, 1, 0],
    [1, 1, 1],
    [0, 1, 0]
  ],
  [
    [0, 1, 1],
    [1, 1, 1],
    [0, 1, 1]
  ],
  [
    [1, 1, 1],
    [1, 1, 1],
    [0, 0, 0]
  ],
  [
    [0, 1, 1],
    [0, 1, 1],
    [0, 1, 1]
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [1, 1, 1]
  ],
  [
    [1, 1, 0],
    [1, 1, 0],
    [1, 1, 0]
  ],
  [
    [0, 1, 1],
    [1, 1, 1],
    [0, 0, 0]
  ],
  [
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, 1]
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [1, 1, 0]
  ],
  [
    [1, 1, 0],
    [1, 1, 0],
    [0, 1, 0]
  ],
  [
    [0, 1, 0],
    [1, 1, 0],
    [1, 1, 0]
  ],
  [
    [1, 1, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  [
    [0, 1, 1],
    [0, 1, 1],
    [0, 1, 0]
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 1]
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
    [1, 1, 1]
  ],
  [
    [1, 1, 0],
    [1, 1, 1],
    [1, 1, 0]
  ],
  [
    [1, 1, 1],
    [1, 1, 1],
    [0, 1, 0]
  ],
  [
    [0, 1, 1],
    [1, 1, 1],
    [0, 1, 1]
  ],
  [
    [0, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
  ],
  [
    [1, 1, 0],
    [1, 1, 1],
    [1, 1, 1]
  ],
  [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 0]
  ],
  [
    [1, 1, 1],
    [1, 1, 1],
    [0, 1, 1]
  ],
  [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
  ]
]

class TerrainEditor extends React.Component {
  render() {
    const brambleUpdate = delta => {}

    const brambleRender = () => {
      graphics.clear('#000000')

      allShapes.forEach((shape, i) => {
        graphics.tiles(
          i * (8 * 4 * 3),
          0,
          shape,
          this.props.spritesheets,
          4,
          8,
          8
        )
      })
    }

    return (
      <Layout>
        <Sidebar />
        <BrambleView update={brambleUpdate} render={brambleRender} />
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    spritesheets: state.spritesheets
  }
}

module.exports = connect(mapStateToProps)(TerrainEditor)
