const React = require('react')
const { connect } = require('react-redux')
const Panel = require('../panel/panel.js')
const ToolButtons = require('../tool-buttons/tool-buttons.js')

class ToolPanel extends React.Component {
  render() {
    const emptyControls = <div className='section'></div>
    const pointerControls = emptyControls

    const brushControls = (
      <div className='section'>
        <div className='property'>
          <label>Size</label>
          <input type='range' />
        </div>

        <div className='property'>
          <label>Terrain</label>
          <select>
            <option>One</option>
            <option>Two</option>
          </select>
        </div>
      </div>
    )

    const eraseControls = (
      <div className='section'>
        <div className='property'>
          <label>Size</label>
          <input type='range' />
        </div>
      </div>
    )

    const fillControls = (
      <div className='section'>
        <div className='property'>
          <label>Terrain</label>
          <select>
            <option>One</option>
            <option>Two</option>
          </select>
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
    tool: state.tool.active
  }
}

module.exports = connect(mapStateToProps)(ToolPanel)
