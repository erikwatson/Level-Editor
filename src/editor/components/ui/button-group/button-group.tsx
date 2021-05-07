import * as React from 'react'
const style = require('./button-group.css')

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
