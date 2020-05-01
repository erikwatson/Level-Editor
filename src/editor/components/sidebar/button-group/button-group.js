const React = require('react')
const style = require('./button-group.sass')

class ButtonGroup extends React.Component {
  render() {
    return (
      <div className='button-group'>
        <ul>{this.props.children}</ul>
      </div>
    )
  }
}

module.exports = ButtonGroup
