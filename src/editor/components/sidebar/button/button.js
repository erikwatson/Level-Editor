const React = require('react')
const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome')

module.exports = ({ icon, selected, onClick, tip }) => {
  const className = selected ? 'selected' : ''

  return (
    <li className={className} onClick={onClick} title={tip}>
      <FontAwesomeIcon icon={icon} />
    </li>
  )
}
