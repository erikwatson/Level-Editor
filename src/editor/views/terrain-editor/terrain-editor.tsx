import * as React from 'react'
import { connect } from 'react-redux'

import style from './terrain-editor.sass'

import {
  game,
  mouse,
  keyboard,
  assets,
  grid,
  graphics
} from '@erikwatson/bramble'
import { Graphics } from '@erikwatson/bramble/dist/types'

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

    const brambleRender = (graphics: Graphics) => {
      graphics.clear('#232323')
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

export default connect(mapStateToProps)(TerrainEditor)
