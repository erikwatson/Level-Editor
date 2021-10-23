import * as React from 'react'
import { connect } from 'react-redux'
import './map-editor.sass'

import { game, mouse, grid } from '@erikwatson/bramble'
import { Grid, Game, Terrain, Graphics } from '@erikwatson/bramble/dist/types'
import { Layer } from '../../types'

import Layout from '../layouts/sidebar-left/sidebar-left'
import Sidebar from './sidebar/sidebar'
import propertiesSidebar from '../terrain-editor/properties-sidebar/properties-sidebar'
import { Dispatch } from 'redux'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { textChangeRangeIsUnchanged } from 'typescript'

import { ActionCreators } from 'redux-undo'

let g: Game = null
let ctx = null

let mouseObj = null

let bramblePane = null

enum ActiveTools {
  POINTER = 'pointer',
  BRUSH = 'brush',
  ERASE = 'erase',
  FILL = 'fill',
  MOVE = 'move'
}

type Brush = {
  size: number
}

type Props = {
  width?: number
  height?: number
  tileWidth?: number
  tileHeight?: number
  widthInTiles?: number
  heightInTiles?: number
  widthInPixels?: number
  heightInPixels?: number
  camera?: { x: number; y: number }
  grid?: Grid
  activeTool?: ActiveTools
  brush?: Brush
  showGrid?: boolean
  spritesheets?: []
  dispatch?: Dispatch
  terrain?: Terrain
  erase?: { size: number }
  layers: Layer[]
  currentLayer: number
}

type State = {
  highlights: Grid
}

class MapEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      highlights: grid.create({ width: 100, height: 100 })
    }

    window.document.addEventListener('keydown', e => {
      if (e.key === 'z') {
        props.dispatch(ActionCreators.undo())
      }
    })
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

    // probably wants moving outside of here
    const origin = {
      x: 0,
      y: 0
    }

    const drawViewportBox = gfx => {
      const tl = { x: 0, y: 0 }
      const tr = { x: this.props.width, y: 0 }
      const bl = { x: 0, y: this.props.height }
      const br = { x: this.props.width, y: this.props.height }

      const line = { width: 4, color: '#ffffff' }

      gfx.line(tl, tr, line)
      gfx.line(tr, br, line)
      gfx.line(br, bl, line)
      gfx.line(bl, tl, line)
    }

    const drawGrid = gfx => {
      const tileWidth = this.props.tileWidth
      const tileHeight = this.props.tileHeight

      const widthInTiles = this.props.widthInTiles
      const heightInTiles = this.props.heightInTiles

      const widthInPixels = this.props.widthInPixels
      const heightInPixels = this.props.heightInPixels

      const location = {
        x: origin.x + this.props.camera.x,
        y: origin.y + this.props.camera.y
      }

      const tl = {
        x: location.x,
        y: location.y
      }
      const tr = {
        x: tileWidth * widthInTiles + location.x,
        y: location.y
      }
      const bl = {
        x: location.x,
        y: tileHeight * heightInTiles + location.y
      }
      const br = {
        x: tileWidth * widthInTiles + location.x,
        y: tileHeight * heightInTiles + location.y
      }

      const columns = (tr.x - tl.x) / tileWidth

      for (let i = 0; i <= columns; i++) {
        gfx.line(
          {
            x: tl.x + i * tileWidth,
            y: tl.y
          },
          {
            x: tl.x + i * tileWidth,
            y: bl.y
          },
          {
            width: i % this.props.grid.divisions === 0 ? 2 : 1,
            colour: '#663399'
          }
        )
      }

      const rows = (br.y - tr.y) / tileHeight

      for (let i = 0; i <= rows; i++) {
        gfx.line(
          {
            x: tl.x,
            y: tl.y + i * tileHeight
          },
          {
            x: tr.x,
            y: tl.y + i * tileHeight
          },
          {
            width: i % this.props.grid.divisions === 0 ? 2 : 1,
            colour: '#663399'
          }
        )
      }
    }

    const drawBoundingBox = gfx => {
      // size of a single tile
      const tileWidth = this.props.tileWidth
      const tileHeight = this.props.tileHeight

      // size of the bounding box as a number of those tiles
      const widthInTiles = this.props.widthInTiles
      const heightInTiles = this.props.heightInTiles

      // position of the corners of the bounding box
      const tl = {
        x: 0 + this.props.camera.x,
        y: 0 + this.props.camera.y
      }

      const tr = {
        x: tileWidth * widthInTiles + this.props.camera.x,
        y: 0 + this.props.camera.y
      }

      const bl = {
        x: 0 + this.props.camera.x,
        y: tileHeight * heightInTiles + this.props.camera.y
      }

      const br = {
        x: tileWidth * widthInTiles + this.props.camera.x,
        y: tileHeight * heightInTiles + this.props.camera.y
      }

      // draw the box
      const line = { width: 4, color: '#ffffff' }

      gfx.line(tl, tr, line)

      gfx.line(tr, br, line)
      gfx.line(br, bl, line)
      gfx.line(bl, tl, line)
    }

    const setBrushHighlights = (gridPos, relativePos, brushSize) => {
      const mouseOverGridX = gridPos.x
      const mouseOverGridY = gridPos.y

      const relativeX = relativePos.x
      const relativeY = relativePos.y

      const modifiedTiles = [...this.state.highlights.tiles]

      if (brushSize % 2 === 1) {
        // Odd number of Tiles
        const halfBrush = Math.round(brushSize / 2) - 1

        for (var x = -halfBrush; x < brushSize - halfBrush; x++) {
          for (var y = -halfBrush; y < brushSize - halfBrush; y++) {
            if (mouseOverGridY + y < 0) {
              continue
            }

            if (mouseOverGridX + x < 0) {
              continue
            }

            modifiedTiles[mouseOverGridY + y][mouseOverGridX + x] = 100

            this.setState({
              highlights: { ...this.state.highlights, tiles: modifiedTiles }
            })
          }
        }
      } else {
        const halfBrush = brushSize / 2

        // Even Number of Tiles
        const xSide = relativeX % 1 >= 0.5 ? 1 : -1
        const ySide = relativeY % 1 >= 0.5 ? 1 : -1

        if (xSide === -1) {
          // left side

          for (let x = -halfBrush; x < brushSize - halfBrush; x++) {
            if (ySide === -1) {
              // top side
              for (var y = -halfBrush; y < brushSize - halfBrush; y++) {
                if (mouseOverGridY + y < 0) {
                  continue
                }

                if (mouseOverGridX + x < 0) {
                  continue
                }

                modifiedTiles[mouseOverGridY + y][mouseOverGridX + x] = 100

                this.setState({
                  highlights: { ...this.state.highlights, tiles: modifiedTiles }
                })
              }
            } else {
              // bottom side
              for (
                var y = -(halfBrush - 1);
                y < brushSize - (halfBrush - 1);
                y++
              ) {
                if (mouseOverGridY + y < 0) {
                  continue
                }

                if (mouseOverGridX + x < 0) {
                  continue
                }

                modifiedTiles[mouseOverGridY + y][mouseOverGridX + x] = 100

                this.setState({
                  highlights: { ...this.state.highlights, tiles: modifiedTiles }
                })
              }
            }
          }
        } else {
          // right side
          for (var x = -(halfBrush - 1); x < brushSize - (halfBrush - 1); x++) {
            if (ySide === -1) {
              // top side
              for (var y = -halfBrush; y < brushSize - halfBrush; y++) {
                if (mouseOverGridY + y < 0) {
                  continue
                }

                if (mouseOverGridX + x < 0) {
                  continue
                }

                modifiedTiles[mouseOverGridY + y][mouseOverGridX + x] = 100

                this.setState({
                  highlights: { ...this.state.highlights, tiles: modifiedTiles }
                })
              }
            } else {
              // bottom side
              for (
                var y = -(halfBrush - 1);
                y < brushSize - (halfBrush - 1);
                y++
              ) {
                if (mouseOverGridY + y < 0) {
                  continue
                }

                if (mouseOverGridX + x < 0) {
                  continue
                }

                modifiedTiles[mouseOverGridY + y][mouseOverGridX + x] = 100

                this.setState({
                  highlights: { ...this.state.highlights, tiles: modifiedTiles }
                })
              }
            }
          }
        }
      }
    }

    const setFillHighlights = (position, target, replacement) => {
      const replacementHighlights = grid.fill(
        this.props.grid.tiles,
        position,
        target,
        replacement
      )

      this.setState({
        highlights: { ...this.state.highlights, tiles: replacementHighlights }
      })
    }

    // Draw the Origin Axis
    // { X, Y, Z } === { R, G, B }
    const drawOrigin = gfx => {
      const origin = {
        x: 0 + this.props.camera.x,
        y: 0 + this.props.camera.y
      }

      gfx.line(
        origin,
        { ...origin, x: origin.x + 64 },
        { width: 4, colour: 'red' }
      )

      ctx.fillStyle = 'red'

      ctx.moveTo(origin.x + 64, origin.y)
      ctx.lineTo(origin.x + 64, origin.y - 8)
      ctx.lineTo(origin.x + 64 + 8, origin.y)
      ctx.lineTo(origin.x + 64, origin.y + 8)

      ctx.fill()

      gfx.line(
        origin,
        { ...origin, y: origin.y + 64 },
        { width: 4, colour: 'green' }
      )

      ctx.fillStyle = 'green'

      ctx.moveTo(origin.x, origin.y + 64)
      ctx.lineTo(origin.x + 8, origin.y + 64)
      ctx.lineTo(origin.x, origin.y + 64 + 8)
      ctx.lineTo(origin.x - 8, origin.y + 64)

      ctx.fill()
    }

    const container = document.querySelectorAll(
      '.bramble-view'
    )[0] as HTMLElement

    g.attachTo(container)
    g.disableContextMenu()
    g.setSize(this.props.width, this.props.height)
    g.setSmoothing(false)

    g.setUpdate(delta => {
      const m = mouseObj.getState()

      const tileWidth = this.props.tileWidth
      const tileHeight = this.props.tileHeight

      const relativeX = (m.position.x - this.props.camera.x) / tileWidth
      const relativeY = (m.position.y - this.props.camera.y) / tileHeight

      const mouseOverGridX = Math.floor(relativeX)
      const mouseOverGridY = Math.floor(relativeY)

      const clearHighlights = () => {
        const modifiedTiles = [...this.state.highlights.tiles]

        for (var y = 0; y < modifiedTiles.length; y++) {
          for (var x = 0; x < modifiedTiles[0].length; x++) {
            modifiedTiles[y][x] = 0
          }
        }

        this.setState({
          highlights: { ...this.state.highlights, tiles: modifiedTiles }
        })
      }

      clearHighlights()

      if (this.props.activeTool === 'move') {
        if (m.left.pressed) {
          this.props.dispatch({
            type: 'CAMERA_SET_POS',
            value: m.position
          })
        }
      }

      if (this.props.activeTool === 'brush') {
        if (m.wheel.moved) {
          if (m.wheel.direction === 'up') {
            this.props.dispatch({
              type: 'BRUSH_SET_SIZE',
              value: this.props.brush.size + 1
            })
          }

          if (m.wheel.direction === 'down') {
            this.props.dispatch({
              type: 'BRUSH_SET_SIZE',
              value: this.props.brush.size - 1
            })
          }
        }

        const brushSize = this.props.brush.size
        setBrushHighlights(
          { x: mouseOverGridX, y: mouseOverGridY },
          { x: relativeX, y: relativeY },
          brushSize
        )

        if (m.left.pressed) {
          // Paint the highlighted tile, whatever they may be
          // tiles stored as an array of rows, so need to go y first here
          for (var y = 0; y < this.state.highlights.tiles.length; y++) {
            for (var x = 0; x < this.state.highlights.tiles[y].length; x++) {
              if (this.state.highlights.tiles[y][x] === 100) {
                this.props.dispatch({
                  type: 'LAYERS_SET_TILE',
                  value: {
                    x: x,
                    y: y,
                    type: this.props.terrain,
                    layer: this.props.currentLayer
                  }
                })
              }
            }
          }
        }
      }

      if (this.props.activeTool === 'erase') {
        if (m.wheel.moved) {
          if (m.wheel.direction === 'up') {
            this.props.dispatch({
              type: 'ERASE_SET_SIZE',
              value: this.props.erase.size + 1
            })
          }

          if (m.wheel.direction === 'down') {
            this.props.dispatch({
              type: 'ERASE_SET_SIZE',
              value: this.props.erase.size - 1
            })
          }
        }

        const eraseSize = this.props.erase.size

        setBrushHighlights(
          { x: mouseOverGridX, y: mouseOverGridY },
          { x: relativeX, y: relativeY },
          eraseSize
        )

        if (m.left.pressed) {
          // Paint the highlighted tile, whatever they may be
          // tiles stored as an array of rows, so need to go y first here
          for (var y = 0; y < this.state.highlights.tiles.length; y++) {
            for (var x = 0; x < this.state.highlights.tiles[y].length; x++) {
              if (this.state.highlights.tiles[y][x] === 100) {
                this.props.dispatch({
                  type: 'LAYERS_SET_TILE',
                  value: {
                    x: x,
                    y: y,
                    type: 0,
                    layer: this.props.currentLayer
                  }
                })
              }
            }
          }
        }
      }

      if (this.props.activeTool === 'fill') {
        console.log(this.props.grid)

        setFillHighlights(
          { x: mouseOverGridX, y: mouseOverGridY },
          this.props.grid.tiles[mouseOverGridY][mouseOverGridX],
          100
        )

        if (m.left.pressed) {
          console.log('layer', this.props.currentLayer)

          this.props.dispatch({
            type: 'GRID_FLOOD_FILL',
            value: {
              x: mouseOverGridX,
              y: mouseOverGridY,
              type: this.props.terrain,
              layer: this.props.currentLayer
            }
          })
        }
      }

      mouseObj.update()
    })

    g.setRender((gfx: Graphics) => {
      if (this.props.showGrid) {
        drawGrid(gfx)
      }

      // Render the Tile Layer
      gfx.transparency(() => {
        this.props.layers.forEach(layer => {
          if (this.props.currentLayer !== layer.position) {
            gfx.tiles(
              this.props.camera,
              layer.grid.tiles,
              this.props.spritesheets,
              layer.grid.scale,
              {
                width: this.props.grid.tileSize,
                height: this.props.grid.tileSize
              }
            )
          }
        })
      })

      gfx.tiles(
        this.props.camera,
        this.props.layers[this.props.currentLayer].grid.tiles,
        this.props.spritesheets,
        this.props.layers[this.props.currentLayer].grid.scale,
        {
          width: this.props.grid.tileSize,
          height: this.props.grid.tileSize
        }
      )

      // highlights on the very top layer
      gfx.tiles(
        this.props.camera,
        this.state.highlights.tiles,
        this.props.spritesheets,
        this.props.grid.scale,
        { width: this.props.grid.tileSize, height: this.props.grid.tileSize }
      )
      drawOrigin(gfx)
      drawViewportBox(gfx)
    })
  }

  componentDidUpdate() {
    const element: HTMLElement = document.querySelectorAll(
      '.bramble-pane'
    )[0] as HTMLElement

    bramblePane = {
      element,
      width: element.offsetWidth,
      height: element.offsetHeight
    }

    g.setSize(bramblePane.width, bramblePane.height)
    g.setSmoothing(false)
  }

  render() {
    return (
      <Layout className='map-editor'>
        <Sidebar showHeader={true} />
        <div className='bramble-pane'>
          <div className='bramble-view'></div>
        </div>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  const tileWidth =
    state.map.layers.present[0].grid.tileWidth *
    state.map.layers.present[0].grid.scale
  const tileHeight =
    state.map.layers.present[0].grid.tileHeight *
    state.map.layers.present[0].grid.scale

  const widthInTiles = state.map.layers.present[0].grid.tiles[0].length
  const heightInTiles = state.map.layers.present[0].grid.tiles.length

  console.log('map editor', state.map.currentLayer.present)

  const currentLayer = state.map.currentLayer.present

  return {
    showGrid: state.map.layers.present[currentLayer].grid.visible,
    grid: state.map.layers.present[currentLayer].grid,
    camera: state.map.camera.present,
    activeTool: state.map.tool.present.active,
    brush: state.map.brush,
    erase: state.map.erase,
    highlights: state.map.highlights,
    fill: state.map.fill,
    terrain: state.map.terrain.present,
    spritesheets: state.spritesheets,

    tileWidth,
    tileHeight,

    widthInTiles,
    heightInTiles,

    widthInPixels: tileWidth * widthInTiles,
    heightInPixels: tileHeight * heightInTiles,

    layers: state.map.layers.present,
    currentLayer
  }
}

export default connect(mapStateToProps)(MapEditor)
