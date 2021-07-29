import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import Panel from '../../../../components/ui/panel/panel'
import ToolButtons from '../tool-buttons/tool-buttons'

type Props = {
  brush: any
  erase: any
  tool: any
  open?: boolean
  dispatch: Dispatch
}

class ToolPanel extends React.Component<Props> {
  render() {
    const emptyControls = <div className='section'></div>
    const pointerControls = emptyControls

    const brushSizeChanged = e => {
      this.props.dispatch({
        type: 'BRUSH_SET_SIZE',
        value: e.target.value
      })
    }

    const terrainChange = e => {
      this.props.dispatch({
        type: 'SET_TERRAIN',
        value: e.target.value
      })
    }

    const fillChange = e => {
      this.props.dispatch({
        type: 'FILL_SET_TYPE',
        value: e.target.value
      })
    }

    const brushControls = (
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
    )

    const eraseSizeChanged = e => {
      this.props.dispatch({
        type: 'ERASE_SET_SIZE',
        value: e.target.value
      })
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
            <select>
              <option>Test</option>
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
  return {
    tool: state.map.tool.active,
    brush: state.map.brush,
    erase: state.map.erase,
    fill: state.map.fill
  }
}

export default connect(mapStateToProps)(ToolPanel)
