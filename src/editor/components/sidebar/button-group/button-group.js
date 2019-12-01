const React = require('react')
const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome')
const {
  faFill,
  faPaintBrush,
  faEraser,
  faMousePointer
} = require('@fortawesome/free-solid-svg-icons')

const style = require('./button-group.sass')

class ButtonGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className='button-group'>
        <ul>
          <li className='selected'>
            <FontAwesomeIcon icon={faMousePointer} />
          </li>
          <li>
            <FontAwesomeIcon icon={faPaintBrush} />
          </li>
          <li>
            <FontAwesomeIcon icon={faEraser} />
          </li>
          <li>
            <FontAwesomeIcon icon={faFill} />
          </li>
        </ul>
      </div>
    )
  }
}

module.exports = ButtonGroup
