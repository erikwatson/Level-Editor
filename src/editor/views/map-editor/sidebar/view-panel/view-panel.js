const React = require('react')
const { connect } = require('react-redux')

// const Panel = require('../../../../ui/panel/panel.js')
const Panel = require('../../../../components/ui/panel/panel.js')
const ColourPicker = require('../../../../components/ui/colour-picker/colour-picker.js')

class ViewPanel extends React.Component {
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
    width: state.view.width,
    height: state.view.height,
    fullScreen: state.view.fullScreen
  }
}

module.exports = connect(mapStateToProps)(ViewPanel)
