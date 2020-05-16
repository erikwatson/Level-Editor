const React = require('react')

const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome')
const {
  faEye,
  faEyeSlash,
  faTrash,
  faLockOpen
} = require('@fortawesome/free-solid-svg-icons')

const style = require('./layer.sass')

module.exports = ({ title = 'Layer', visible = false, selected = false }) => {
  const visibilityIcon = visible ? (
    <FontAwesomeIcon icon={faEye} />
  ) : (
    <FontAwesomeIcon icon={faEyeSlash} />
  )

  const className = selected ? `layer selected` : 'layer'

  return (
    <div className={className}>
      <div>
        <input type='checkbox' />
      </div>
      <div>{title}</div>
      <div className='icon'>
        <FontAwesomeIcon icon={faLockOpen} />
      </div>
      <div className='icon'>{visibilityIcon}</div>
      <div className='icon'>
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  )
}
