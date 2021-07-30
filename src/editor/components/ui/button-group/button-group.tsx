import * as React from 'react'
import './button-group.sass'

type Props = {
  icons?: any[]
  selected?: number
}

class ButtonGroup extends React.Component<Props> {
  render() {
    return (
      <div className='button-group'>
        <ul>{this.props.children}</ul>
      </div>
    )
  }
}

export default ButtonGroup
