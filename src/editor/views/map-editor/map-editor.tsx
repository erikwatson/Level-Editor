import * as React from 'react'
import { connect } from 'react-redux'
import style from './map-editor.sass'

import { game, graphics, mouse, grid } from '@erikwatson/bramble'

import { Grid, Game, Terrain } from '@erikwatson/bramble/dist/types'

import Layout from '../layouts/sidebar-left/sidebar-left'
import Sidebar from './sidebar/sidebar'
import propertiesSidebar from '../terrain-editor/properties-sidebar/properties-sidebar'
import { Dispatch } from 'redux'

let g: Game = null
let ctx = null
let m = null

let bramblePane = null

enum ActiveTools {
  POINTER = 'pointer',
  BRUSH = 'brush',
  ERASE = 'erase',
  FILL = 'fill'
}

type Brush = {
  size: number
}

type Props = {
  width: number
  height: number
  tileWidth: number
  tileHeight: number
  widthInTiles: number
  heightInTiles: number
  widthInPixels: number
  heightInPixels: number
  camera: { x: number; y: number }
  grid: Grid
  activeTool: ActiveTools
  brush: Brush
  showGrid: boolean
  spritesheets: []
  dispatch: Dispatch
  terrain: Terrain
  erase: { size: number }
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
  }

  componentDidMount() {
    let music = []

    if (!g) {
      g = game.create()
      g.start()

      ctx = g.canvas.getContext('2d')
    }

    if (!m) {
      m = mouse.create(g.canvas)
      m.start()
    }

    const element: HTMLElement = document.querySelector('#bramble-pane')

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

    const drawViewportBox = () => {
      const tl = { x: 0, y: 0 }
      const tr = { x: this.props.width, y: 0 }
      const bl = { x: 0, y: this.props.height }
      const br = { x: this.props.width, y: this.props.height }

      const line = { width: 4, color: '#ffffff' }

      graphics.line(ctx, tl, tr, line)
      graphics.line(ctx, tr, br, line)
      graphics.line(ctx, br, bl, line)
      graphics.line(ctx, bl, tl, line)
    }

    const drawGrid = () => {
      const tileWidth = this.props.tileWidth
      const tileHeight = this.props.tileHeight

      const widthInTiles = this.props.widthInTiles
      const heightInTiles = this.props.heightInTiles

      const widthInPixels = this.props.widthInPixels
      const heightInPixels = this.props.heightInPixels

      const tl = {
        x: origin.x,
        y: origin.y
      }
      const tr = {
        x: tileWidth * widthInTiles + origin.x,
        y: origin.y
      }
      const bl = {
        x: origin.x,
        y: tileHeight * heightInTiles + origin.y
      }
      const br = {
        x: tileWidth * widthInTiles + origin.x,
        y: tileHeight * heightInTiles + origin.y
      }

      const columns = (tr.x - tl.x) / tileWidth

      for (let i = 0; i <= columns; i++) {
        graphics.line(
          ctx,
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
        graphics.line(
          ctx,
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

    const drawBoundingBox = () => {
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

      graphics.line(ctx, tl, tr, line)

      graphics.line(ctx, tr, br, line)
      graphics.line(ctx, br, bl, line)
      graphics.line(ctx, bl, tl, line)
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
          for (var x = -halfBrush; x < brushSize - halfBrush; x++) {
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
    const drawOrigin = () => {
      const origin = {
        x: 0 + this.props.camera.x,
        y: 0 + this.props.camera.y
      }

      graphics.line(
        ctx,
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

      graphics.line(
        ctx,
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

    const container = document.querySelector('#bramble-view')

    g.attachTo(container)
    g.disableContextMenu()
    g.setSize(this.props.width, this.props.height)
    g.setSmoothing(false)

    g.setUpdate(delta => {
      console.log(m)

      const tileWidth = this.props.tileWidth
      const tileHeight = this.props.tileHeight

      const relativeX = (m.x - this.props.camera.x) / tileWidth
      const relativeY = (m.y - this.props.camera.y) / tileHeight

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

      if (this.props.activeTool === 'pointer') {
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
                  type: 'GRID_SET_TILE',
                  value: {
                    x: x,
                    y: y,
                    type: this.props.terrain
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
                  type: 'GRID_SET_TILE',
                  value: {
                    x: x,
                    y: y,
                    type: 0
                  }
                })
              }
            }
          }
        }
      }

      if (this.props.activeTool === 'fill') {
        setFillHighlights(
          { x: mouseOverGridX, y: mouseOverGridY },
          this.props.grid.tiles[mouseOverGridY][mouseOverGridX],
          100
        )

        if (m.left.pressed) {
          this.props.dispatch({
            type: 'GRID_FLOOD_FILL',
            value: {
              x: mouseOverGridX,
              y: mouseOverGridY,
              type: this.props.terrain
            }
          })
        }
      }
    })

    g.setRender(() => {
      graphics.clear(ctx, '#000000')

      if (this.props.showGrid) {
        drawGrid()
      }

      // Render the Tile Layer
      graphics.tiles(
        ctx,
        this.props.camera,
        this.props.grid.tiles,
        this.props.spritesheets,
        this.props.grid.scale
      )
      graphics.tiles(
        ctx,
        this.props.camera,
        this.state.highlights.tiles,
        this.props.spritesheets,
        this.props.grid.scale
      )

      drawOrigin()
      drawViewportBox()
    })
  }

  componentDidUpdate() {
    const element: HTMLElement = document.querySelector('#bramble-pane')

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
      <Layout>
        <Sidebar showHeader={true} />
        <div id='bramble-pane'>
          <div id='bramble-view'></div>
        </div>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  const tileWidth = state.map.grid.tileSize * state.map.grid.scale
  const tileHeight = state.map.grid.tileSize * state.map.grid.scale

  const widthInTiles = state.map.grid.width
  const heightInTiles = state.map.grid.height

  return {
    showGrid: state.map.grid.visible,
    grid: state.map.grid,
    camera: state.map.camera,
    activeTool: state.map.tool.active,
    brush: state.map.brush,
    erase: state.map.erase,
    highlights: state.map.highlights,
    fill: state.map.fill,
    terrain: state.map.terrain,
    spritesheets: state.spritesheets,

    tileWidth,
    tileHeight,

    widthInTiles,
    heightInTiles,

    widthInPixels: tileWidth * widthInTiles,
    heightInPixels: tileHeight * heightInTiles
  }
}

export default connect(mapStateToProps)(MapEditor)
