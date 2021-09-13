import * as React from 'react'
import {
  faBars,
  faEye,
  faEyeSlash,
  faLock,
  faLockOpen
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style.sass'

export default props => {
  return (
    <div className={`layer ${props.className}`} onClick={props.onClick}>
      <div className='menu'>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className='title'>{props.title}</div>
      <div className='type'>{props.type}</div>
      <div className='icon'>
        <FontAwesomeIcon icon={props.visible ? faEye : faEyeSlash} />
      </div>
      <div className='icon'>
        <FontAwesomeIcon icon={props.locked ? faLock : faLockOpen} />
      </div>
    </div>
  )
}
