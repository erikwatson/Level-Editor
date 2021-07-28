import * as React from 'react'
const useState = React.useState
import style from './panel.sass'

type Props = {
  open: boolean
  title: string
}

type State = {
  open: boolean
}

class Panel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      open: props.open ? true : false
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({ open: !this.state.open })
  }

  render() {
    const contentProps = {
      className: this.state.open ? 'content' : 'content closed'
    }

    const symbol = this.state.open ? '-' : '+'

    return (
      <div className='panel'>
        <div className='header' onClick={this.toggle}>
          <h2>
            {symbol} {this.props.title}
          </h2>
        </div>
        <div {...contentProps}>{this.props.children}</div>
      </div>
    )
  }
}

export default Panel
