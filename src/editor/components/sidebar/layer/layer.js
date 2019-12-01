const React = require('react')
const FontAwesome = require('@fortawesome/react-fontawesome')
const FontAwesomeIcon = FontAwesome.FontAwesomeIcon
const {
  faEye,
  faEyeSlash,
  faTrash
} = require('@fortawesome/free-solid-svg-icons')
const style = require('./layer.sass')

module.exports = ({ title = 'Layer', visible = false }) => {
  const visibilityIcon = visible ? (
    <FontAwesomeIcon icon={faEye} />
  ) : (
    <FontAwesomeIcon icon={faEyeSlash} />
  )

  return (
    <div className='layer'>
      <div>{title}</div>
      <div className='icon'>{visibilityIcon}</div>
      <div className='icon'>
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  )
}
