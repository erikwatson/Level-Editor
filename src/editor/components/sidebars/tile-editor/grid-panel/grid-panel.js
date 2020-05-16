const React = require('react')
const { connect } = require('react-redux')

const Panel = require('../../../ui/panel/panel.js')

class GridPanel extends React.Component {
  constructor(props) {
    super(props)

    this.visibleChange = this.visibleChange.bind(this)
    this.onWidthChange = this.onWidthChange.bind(this)
    this.onHeightChange = this.onHeightChange.bind(this)
    this.divisionsChange = this.divisionsChange.bind(this)
  }

  onWidthChange(event) {
    this.props.dispatch({
      type: 'GRID_SET_WIDTH',
      value: event.target.value
    })

    this.props.dispatch({
      type: 'HIGHLIGHT_SET_WIDTH',
      value: event.target.value
    })
  }

  onHeightChange(event) {
    this.props.dispatch({
      type: 'GRID_SET_HEIGHT',
      value: event.target.value
    })

    this.props.dispatch({
      type: 'HIGHLIGHT_SET_HEIGHT',
      value: event.target.value
    })
  }

  visibleChange(e) {
    this.props.dispatch({
      type: 'GRID_SET_VISIBILITY',
      value: event.target.checked
    })
  }

  divisionsChange(e) {
    this.props.dispatch({
      type: 'GRID_SET_DIVISIONS',
      value: event.target.value
    })
  }

  render() {
    return (
      <Panel title='Grid' {...this.props}>
        <div className='section'>
          <div className='input range'>
            <label>Visible:</label>
            <input
              type='checkbox'
              defaultChecked={true}
              onChange={this.visibleChange}
            />
          </div>

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
      </Panel>
    )
  }
}

function mapStateToProps(state) {
  return {
    width: state.grid.width,
    height: state.grid.height,
    visible: state.grid.visible,
    divisions: state.grid.divisions
  }
}

module.exports = connect(mapStateToProps)(GridPanel)
