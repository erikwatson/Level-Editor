import * as React from 'react'
import { connect } from 'react-redux'

import Panel from '../../../../components/ui/panel/panel'
import ColourPicker from '../../../../components/ui/colour-picker/colour-picker'
import { Dispatch } from 'redux'

type Props = {
  dispatch: Dispatch
  width: number
  height: number
  fullScreen: boolean
  open: boolean
}

class ViewPanel extends React.Component<Props> {
  constructor(props) {
    super(props)
    this.state = {}
    this.onHeightChange = this.onHeightChange.bind(this)
    this.onWidthChange = this.onWidthChange.bind(this)
    this.fullScreenChange = this.fullScreenChange.bind(this)
  }

  onWidthChange(event) {
    this.props.dispatch({
      type: 'VIEW_SET_WIDTH',
      value: event.target.value
    })
  }

  onHeightChange(event) {
    this.props.dispatch({
      type: 'VIEW_SET_HEIGHT',
      value: event.target.value
    })
  }

  fullScreenChange(event) {
    this.props.dispatch({
      type: 'VIEW_SET_FULLSCREEN',
      value: event.target.checked
    })
  }

  render() {
    const sizeControls = [
      <div className='input range'>
        <label>Width:</label>
        <input
          type='range'
          value={this.props.width}
          onChange={this.onWidthChange}
          max={1280}
          min={64}
        />
        <label className='value'>{this.props.width} px</label>
      </div>,

      <div className='input range'>
        <label>Height:</label>
        <input
          type='range'
          value={this.props.height}
          onChange={this.onHeightChange}
          max={720}
          min={64}
        />
        <label className='value'>{this.props.height} px</label>
      </div>
    ]

    const visibilityControlled = this.props.fullScreen ? null : sizeControls

    return (
      <Panel title='View' open={this.props.open}>
        <div className='input'>
          <label>Full:</label>
          <input
            type='checkbox'
            defaultChecked={this.props.fullScreen}
            onChange={this.fullScreenChange}
          />
        </div>
        {visibilityControlled}
      </Panel>
    )
  }
}

const mapStateToProps = state => {
  return {
    width: state.map.width,
    height: state.map.height,
    fullScreen: state.map.fullScreen
  }
}

export default connect(mapStateToProps)(ViewPanel)
