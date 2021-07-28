import * as React from 'react'
import { connect } from 'react-redux'

import style = require('./terrain-editor.sass')

import { game, mouse, keyboard, assets, sound, grid } from '@erikwatson/bramble'

import Layout from '../layouts/three-column/three-column'
import Sidebar from './sidebar/sidebar'
import PropertiesSidebar from './properties-sidebar/properties-sidebar'
import BrambleView from '../../components/ui/bramble-view/bramble-view'

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

interface Props {
  spritesheets: any[]
}

interface State {
  height: number
}

class TerrainEditor extends React.Component<Props, State> {
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

    const brambleRender = graphics => {
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
