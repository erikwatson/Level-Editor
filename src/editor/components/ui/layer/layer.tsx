import * as React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEye,
  faEyeSlash,
  faTrash,
  faLockOpen
} from '@fortawesome/free-solid-svg-icons'

import style from './layer.sass'

export default ({ title = 'Layer', visible = false, selected = false }) => {
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
