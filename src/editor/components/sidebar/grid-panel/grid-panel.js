const React = require('react')
const { connect } = require('react-redux')
const Panel = require('../panel/panel.js')

class GridPanel extends React.Component {
  constructor(props) {
    super(props)

    this.onWidthChange = this.onWidthChange.bind(this)
    this.onHeightChange = this.onHeightChange.bind(this)
  }

  onWidthChange(event) {
    this.props.dispatch({
      type: 'GRID_SET_WIDTH',
      value: parseInt(event.target.value)
    })
  }

  onHeightChange(event) {
    this.props.dispatch({
      type: 'GRID_SET_HEIGHT',
      value: parseInt(event.target.value)
    })
  }

  render() {
    return (
      <Panel title='Grid' {...this.props}>
        <div className='section'>
          <div className='input range'>
            <label>Width:</label>
            <input
              type='range'
              value={this.props.width}
              max={40}
              min={1}
              onChange={this.onWidthChange}
            />
            <label className='value'>{this.props.width} Tiles</label>
          </div>

          <div className='input range'>
            <label>Height:</label>
            <input
              type='range'
              value={this.props.height}
              max={40}
              min={1}
              onChange={this.onHeightChange}
            />
            <label className='value'>{this.props.height} Tiles</label>
          </div>
        </div>
      </Panel>
    )
  }
}

function mapStateToProps(state) {
  return {
    width: state.grid.width,
    height: state.grid.height
  }
}

module.exports = connect(mapStateToProps)(GridPanel)
