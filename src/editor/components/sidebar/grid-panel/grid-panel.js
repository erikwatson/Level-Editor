const React = require('react')
const { connect } = require('react-redux')
const Panel = require('../panel/panel.js')

class GridPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.onHeightChange = this.onHeightChange.bind(this)
    this.onWidthChange = this.onWidthChange.bind(this)
  }

  onWidthChange(event) {
    this.props.dispatch({ type: 'VIEW_SET_WIDTH', value: event.target.value })
  }

  onHeightChange(event) {
    this.props.dispatch({ type: 'VIEW_SET_HEIGHT', value: event.target.value })
  }

  render() {
    return (
      <Panel title='View'>
        <div className='input range'>
          <label>Width:</label>
          <input
            type='range'
            value={this.props.width}
            onChange={this.onHeightChange}
            max={1000}
            min={500}
          />
        </div>
        <div className='input range'>
          <label>Height:</label>
          <input
            type='range'
            value={this.props.height}
            onChange={this.onHeightChange}
            max={1000}
            min={500}
          />
        </div>
      </Panel>
    )
  }
}

const mapStateToProps = state => {
  return {
    width: state.width,
    height: state.height,
    visible: state.visible
  }
}

module.exports = connect(mapStateToProps)(GridPanel)
