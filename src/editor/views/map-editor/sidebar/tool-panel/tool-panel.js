const React = require('react')
const { connect } = require('react-redux')

const Panel = require('../../../../components/ui/panel/panel.js')
const ToolButtons = require('../tool-buttons/tool-buttons.js')

class ToolPanel extends React.Component {
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

    const fillControls = <div className='section'></div>

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
          <div className='input'>
            <label>Terrain</label>
            <select onChange={terrainChange} value={this.props.brush.type}>
              <option value='1'>Default</option>
              <option value='2'>Green Hills</option>
              <option value='3'>Grass Decoration</option>
              <option value='4'>Stalactites</option>
              <option value='5'>Rock</option>
              <option value='6'>Waterfall</option>
            </select>
          </div>
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
    tool: state.tile.tool.active,
    brush: state.tile.brush,
    erase: state.tile.erase,
    fill: state.tile.fill
  }
}

module.exports = connect(mapStateToProps)(ToolPanel)
