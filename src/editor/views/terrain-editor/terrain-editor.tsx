import * as React from 'react'
import { connect } from 'react-redux'

import './terrain-editor.sass'
import { Grid, Game, Terrain, Graphics } from '@erikwatson/bramble/dist/types'

import {
  game,
  mouse,
  keyboard,
  assets,
  grid,
  graphics
} from '@erikwatson/bramble'

import Layout from '../layouts/three-column/three-column'
import Sidebar from './sidebar/sidebar'
import PropertiesSidebar from './properties-sidebar/properties-sidebar'

let bramblePane = null
let g: Game = null
let ctx = null
let mouseObj = null

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
  width: number
}

class TerrainEditor extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      height: 6250,
      width: 1600
    }
  }

  componentDidMount() {
    let music = []

    if (!g) {
      g = game.create()
      g.start()

      ctx = g.canvas.getContext('2d')
    }

    if (!mouseObj) {
      mouseObj = mouse.create(g.canvas)
      mouseObj.start()
    }

    const element: HTMLElement = document.querySelectorAll(
      '.bramble-pane'
    )[0] as HTMLElement

    bramblePane = {
      element,
      width: element.offsetWidth,
      height: element.offsetHeight
    }

    const container = document.querySelectorAll(
      '.bramble-view'
    )[0] as HTMLElement

    g.attachTo(container)
    g.disableContextMenu()
    g.setSize(this.state.width, this.state.height)
    g.setSmoothing(false)

    g.setUpdate(delta => {})

    const scale = 6

    g.setRender((gfx: Graphics) => {
      allShapes.forEach((shape, index) => {
        gfx.tiles(
          { x: index * scale * (scale * 4), y: 0 },
          shape,
          this.props.spritesheets,
          scale
        )
      })
    })
  }

  render() {
    return (
      <Layout>
        <Sidebar showHeader={true} showNav={true} />
        <div className='bramble-pane'>
          <div className='bramble-view'></div>
        </div>
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
