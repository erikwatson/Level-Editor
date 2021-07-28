import * as React from 'react'
import { connect } from 'react-redux'
import style from './colour-picker.sass'

type Props = {
  colour: string
}

type State = {
  open: boolean
}

class ColourPicker extends React.Component<Props, State> {
  constructor(props: Props) {
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

function mapStateToProps(state: Props) {
  return {
    colour: '#ff0000'
  }
}

export default connect(mapStateToProps)(ColourPicker)
