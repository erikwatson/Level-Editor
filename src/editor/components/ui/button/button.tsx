import * as React from 'react'
const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome')

export default ({ icon, selected, onClick, tip }) => {
  const className = selected ? 'selected' : ''

  return (
    <li className={className} onClick={onClick} title={tip}>
      <FontAwesomeIcon icon={icon} />
    </li>
  )
}
