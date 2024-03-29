import * as React from 'react'
const useState = React.useState
import './panel.sass'

type Props = {
  open?: boolean
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
          <div className='symbol'>{symbol}</div>
          <div className='title'>
            <h2>{this.props.title}</h2>
          </div>
        </div>
        <div {...contentProps}>{this.props.children}</div>
      </div>
    )
  }
}

export default Panel
