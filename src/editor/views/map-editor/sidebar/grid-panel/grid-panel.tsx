import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import Panel from '../../../../components/ui/panel/panel'

type Props = {
  divisions: number
  width: number
  height: number
  dispatch: Dispatch
}

class GridPanel extends React.Component<Props> {
  constructor(props) {
    super(props)

    this.visibleChange = this.visibleChange.bind(this)
    this.onWidthChange = this.onWidthChange.bind(this)
    this.onHeightChange = this.onHeightChange.bind(this)
    this.divisionsChange = this.divisionsChange.bind(this)
  }

  onWidthChange(e) {
    this.props.dispatch({
      type: 'GRID_SET_WIDTH',
      value: e.target.value,
      layer: 0
    })

    this.props.dispatch({
      type: 'HIGHLIGHT_SET_WIDTH',
      value: e.target.value
    })
  }

  onHeightChange(e) {
    this.props.dispatch({
      type: 'GRID_SET_HEIGHT',
      value: e.target.value,
      layer: 0
    })

    this.props.dispatch({
      type: 'HIGHLIGHT_SET_HEIGHT',
      value: e.target.value
    })
  }

  visibleChange(e) {
    this.props.dispatch({
      type: 'GRID_SET_VISIBILITY',
      value: e.target.checked,
      layer: 0
    })
  }

  divisionsChange(e) {
    this.props.dispatch({
      type: 'GRID_SET_DIVISIONS',
      value: e.target.value,
      layer: 0
    })
  }

  render() {
    return (
      <Panel title='Grid' {...this.props}>
        <div className='section'>
          <div className='section'>
            <div className='input range'>
              <label>Visible:</label>
              <input
                type='checkbox'
                defaultChecked={true}
                onChange={this.visibleChange}
              />
            </div>
          </div>
          <div className='section'>
            <div className='input range'>
              <label>Divisions:</label>
              <input
                type='range'
                value={this.props.divisions}
                max={10}
                min={2}
                onChange={this.divisionsChange}
              />
              <label className='value'>{this.props.divisions} Tiles</label>
            </div>
          </div>
        </div>

        <div className='section'>
          <div className='section'>
            <div className='input range'>
              <label>Width:</label>
              <input
                type='range'
                value={this.props.width}
                max={100}
                min={1}
                onChange={this.onWidthChange}
              />
              <label className='value'>{this.props.width} Tiles</label>
            </div>
          </div>
          <div className='section last'>
            <div className='input range'>
              <label>Height:</label>
              <input
                type='range'
                value={this.props.height}
                max={100}
                min={1}
                onChange={this.onHeightChange}
              />
              <label className='value'>{this.props.height} Tiles</label>
            </div>
          </div>
        </div>
      </Panel>
    )
  }
}

function mapStateToProps(state) {
  return {
    width: state.map.layers.present[0].width,
    height: state.map.layers.present[0].height,
    visible: state.map.layers.present[0].visible,
    divisions: state.map.layers.present[0].divisions
  }
}

export default connect(mapStateToProps)(GridPanel)
