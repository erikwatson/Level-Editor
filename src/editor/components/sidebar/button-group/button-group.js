const React = require('react')
const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome')

const style = require('./button-group.sass')

class ButtonGroup extends React.Component {
  render() {
    const buttons = this.props.icons.map((icon, i) => {
      const className = i === this.props.selected ? 'selected' : null

      return (
        <li className={className} key={i}>
          <FontAwesomeIcon icon={icon} />
        </li>
      )
    })

    return (
      <div className='button-group'>
        <ul>{buttons}</ul>
      </div>
    )
  }
}

module.exports = ButtonGroup
