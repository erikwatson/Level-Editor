import * as React from 'react'
import style from './button-group.sass'

class ButtonGroup extends React.Component {
  render() {
    return (
      <div className='button-group'>
        <ul>{this.props.children}</ul>
      </div>
    )
  }
}

export default ButtonGroup
