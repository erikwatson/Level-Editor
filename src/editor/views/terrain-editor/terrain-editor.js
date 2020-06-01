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
  grid,
  canvas
} = require('@erikwatson/bramble')

const Layout = require('../layouts/three-column/three-column.js')
const Sidebar = require('./sidebar/sidebar.js')
const PropertiesSidebar = require('./properties-sidebar/properties-sidebar.js')
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
    [1, 1, 1],
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
    [0, 1, 0]
  ],
  [
    [0, 1, 0],
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
  constructor(props) {
    super(props)

    this.state = {
      height: 6250
    }
  }

  render() {
    const translateTiles = to =>
      allShapes.map(shape =>
        shape.map(row =>
          row.map(col => {
            if (col === 1) {
              return to
            }

            return 0
          })
        )
      )

    const modifiedShapes = translateTiles(1)

    const tileSize = 8
    const zoom = 4
    const shapeSize = 3

    const brambleRender = () => {
      graphics.clear('#232323')

      const zoomedTileSize = tileSize * zoom
      const zoomedShapeSize = zoomedTileSize * shapeSize

      const widthOfShapePlusSingleBorder = Math.floor(
        zoomedShapeSize + zoomedTileSize
      )
      const widthDividedByShapeBorder = Math.floor(
        (canvas.element.width - zoomedTileSize) / widthOfShapePlusSingleBorder
      )

      const widthDividedByShapes = Math.floor(
        canvas.element.width / widthOfShapePlusSingleBorder
      )
      const heightDividedByShapes = Math.ceil(
        allShapes.length / widthDividedByShapes
      )

      // avoid infinite looping
      if (widthDividedByShapes <= 0) {
        return
      }

      for (var y = 0; y < heightDividedByShapes; y++) {
        for (var x = 0; x < widthDividedByShapeBorder; x++) {
          const index = y * widthDividedByShapeBorder + x

          if (index >= allShapes.length) {
            return
          }

          graphics.rect(
            zoomedTileSize + widthOfShapePlusSingleBorder * x,
            zoomedTileSize + widthOfShapePlusSingleBorder * y,
            zoomedShapeSize,
            zoomedShapeSize,
            {
              fill: {
                color: '#000000'
              },
              line: {
                width: 2,
                color: '#ffffff'
              }
            }
          )

          graphics.tiles(
            zoomedTileSize + widthOfShapePlusSingleBorder * x,
            zoomedTileSize + widthOfShapePlusSingleBorder * y,
            modifiedShapes[index],
            this.props.spritesheets,
            zoom,
            tileSize,
            tileSize
          )

          graphics.rect(
            zoomedTileSize + widthOfShapePlusSingleBorder * x + zoomedTileSize,
            zoomedTileSize + widthOfShapePlusSingleBorder * y + zoomedTileSize,
            zoomedTileSize,
            zoomedTileSize,
            {
              line: {
                width: 2,
                color: '#ffffff'
              }
            }
          )
        }
      }
    }

    return (
      <Layout>
        <Sidebar showHeader={true} showNav={true} />
        <BrambleView
          render={brambleRender}
          scrollY={true}
          height={this.state.height}
        />
        <PropertiesSidebar />
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
