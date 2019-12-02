const React = require('react')
const { connect } = require('react-redux')
const Panel = require('../panel/panel.js')

class ViewPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.onHeightChange = this.onHeightChange.bind(this)
    this.onWidthChange = this.onWidthChange.bind(this)
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

  render() {
    return (
      <Panel title='View' open={this.props.open}>
        <div className='input range'>
          <label>Width:</label>
          <input
            type='range'
            value={this.props.width}
            onChange={this.onWidthChange}
            max={960}
            min={64}
          />
          <label className='value'>{this.props.width} px</label>
        </div>
        <div className='input range'>
          <label>Height:</label>
          <input
            type='range'
            value={this.props.height}
            onChange={this.onHeightChange}
            max={832}
            min={64}
          />
          <label className='value'>{this.props.height} px</label>
        </div>
      </Panel>
    )
  }
}

const mapStateToProps = state => {
  return {
    width: state.view.width,
    height: state.view.height
  }
}

module.exports = connect(mapStateToProps)(ViewPanel)
