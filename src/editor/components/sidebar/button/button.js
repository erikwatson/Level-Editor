const React = require('react')
const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome')

module.exports = ({ icon, selected, onClick }) => {
  const className = selected ? 'selected' : ''

  return (
    <li className={className} onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
    </li>
  )
}
