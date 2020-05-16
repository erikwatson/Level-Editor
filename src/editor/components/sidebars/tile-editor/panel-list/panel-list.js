const React = require('react')

const Panel = require('../panel/panel.js')

const style = require('./panel-list.sass')

class PanelList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: this.props.open }
  }

  render() {
    const renderThese = this.props.children.map((child, i) => {
      return React.cloneElement(child, {
        key: i,
        open:
          child.props.open !== undefined ? child.props.open : this.state.open
      })
    })

    return (
      <div id='panel-list'>
        <div>{renderThese}</div>
      </div>
    )
  }
}

module.exports = PanelList
