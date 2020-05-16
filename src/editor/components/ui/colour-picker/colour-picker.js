const React = require('react')
const { connect } = require('react-redux')
const style = require('./colour-picker.sass')

class ColourPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  render() {
    const styleOverrides = {
      backgroundColor: this.props.colour
    }

    return (
      <div className='colour-picker'>
        <div className='inner' style={styleOverrides} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    colour: '#ff0000'
  }
}

module.exports = connect(mapStateToProps)(ColourPicker)
