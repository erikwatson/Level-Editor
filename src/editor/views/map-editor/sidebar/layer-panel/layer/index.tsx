import * as React from 'react'
import './style.sass'

export default props => {
  return (
    <div className={`layer ${props.className}`} onClick={props.onClick}>
      {props.title} - {props.type}
    </div>
  )
}
