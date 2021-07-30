import * as React from 'react'
import { ReactNode } from 'react'

import Panel from '../panel/panel'
import './panel-list.sass'

type Props = {
  open?: boolean
  children: ReactNode
}

type State = {
  open: boolean
}

class PanelList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { open: this.props.open }
  }

  render() {
    const renderThese = React.Children.map(
      this.props.children,
      (child: any, i) => {
        return React.cloneElement(child, {
          key: i,
          open:
            child.props.open !== undefined ? child.props.open : this.state.open
        })
      }
    )

    return (
      <div id='panel-list'>
        <div>{renderThese}</div>
      </div>
    )
  }
}

export default PanelList
