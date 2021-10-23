import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import Panel from '../../../../components/ui/panel/panel'
import ToolButtons from '../tool-buttons/tool-buttons'

import './tool-panel.sass'

type Spritesheet = {
  name: string
  type: number
}

type Props = {
  brush: any
  erase: any
  tool: any
  open?: boolean
  spritesheets: Spritesheet[]
  dispatch: Dispatch
  setTerrain: (id: number) => void
  setBrushSize: (size: number) => void
  setEraseSize: (size: number) => void
  terrain: number
}

class ToolPanel extends React.Component<Props> {
  render() {
    const emptyControls = <div className='section'></div>
    const pointerControls = emptyControls

    const brushSizeChanged = e => {
      this.props.setBrushSize(e.target.value)
    }

    const brushControls = (
      <div className='section'>
        <div className='section'>
          <div className='input range'>
            <label>Size</label>
            <input
              type='range'
              value={this.props.brush.size}
              onChange={brushSizeChanged}
              max={10}
              min={1}
            />
            <label>{this.props.brush.size} Tiles</label>
          </div>
        </div>
        <div className='section last'>
          <div className='selector'>
            <label>Terrain</label>
            <select
              onChange={e => {
                this.props.setTerrain(parseInt(e.target.value))
              }}>
              {this.props.spritesheets.map(x => (
                <option
                  selected={this.props.terrain === x.type}
                  value={`${x.type}`}>
                  {x.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    )

    const eraseSizeChanged = e => {
      this.props.setEraseSize(e.target.value)
    }

    const eraseControls = (
      <div className='section'>
        <div className='input range'>
          <label>Size</label>
          <input
            type='range'
            value={this.props.erase.size}
            onChange={eraseSizeChanged}
            max={10}
            min={1}
          />
          <label>{this.props.erase.size} Tiles</label>
        </div>
      </div>
    )

    const fillControls = (
      <div className='section'>
        <div className='section'>
          <div className='selector'>
            <label>Terrain</label>
            <select
              onChange={e => {
                this.props.setTerrain(parseInt(e.target.value))
              }}>
              {this.props.spritesheets.map(x => (
                <option
                  selected={this.props.terrain === x.type}
                  value={`${x.type}`}>
                  {x.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    )

    const lineControls = (
      <div className='section'>
        <div className='input'>
          <label>Width</label>
          <input
            type='range'
            value={this.props.erase.size}
            onChange={eraseSizeChanged}
            max={10}
            min={1}
          />
          <label>{} Tiles</label>
        </div>
      </div>
    )

    const getControls = () => {
      switch (this.props.tool) {
        case 'pointer':
          return pointerControls

        case 'brush':
          return brushControls

        case 'erase':
          return eraseControls

        case 'fill':
          return fillControls

        case 'line':
          return lineControls

        default:
          return emptyControls
      }
    }

    return (
      <Panel title='Tools' open={this.props.open}>
        <div className='section'>
          <ToolButtons />
        </div>
        {getControls()}
      </Panel>
    )
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    tool: state.map.tool.present.active,
    brush: state.map.brush,
    erase: state.map.erase,
    fill: state.map.fill,
    spritesheets: state.spritesheets.filter(x => x.type !== 100),
    terrain: state.map.terrain
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setTerrain: terrainType => {
      dispatch({ type: 'SET_TERRAIN', value: terrainType })
    },

    setBrushSize: size => {
      dispatch({ type: 'BRUSH_SET_SIZE', value: size })
    },

    setEraseSize: size => {
      dispatch({ type: 'ERASE_SET_SIZE', value: size })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolPanel as any)
