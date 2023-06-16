import * as React from 'react'
import { connect } from 'react-redux'

import ButtonGroup from '../../../../components/ui/button-group/button-group'
import Button from '../../../../components/ui/button/button'

import {
  faFill,
  faPaintBrush,
  faEraser,
  faArrowsAlt,
  faSlash,
  faEyeDropper
} from '@fortawesome/free-solid-svg-icons'

import './tool-buttons.sass'

const labeledIcons = {
  erase: faEraser,
  brush: faPaintBrush,
  fill: faFill,
  line: faSlash,
  dropper: faEyeDropper,
  move: faArrowsAlt
}

const ToolButtons = ({ tools, setSelected }) => {
  const icons = Object.keys(labeledIcons).map(icon => ({
    label: icon,
    icon: labeledIcons[icon]
  }))

  const iconList = icons.map((icon, key) => {
    const isSelected = icon.label === tools.active
    const onClick = e => {
      setSelected(icon.label)
    }

    const buttonProps = {
      tip: `${icon.label}`,
      icon: icon.icon,
      selected: isSelected,
      key,
      onClick
    }

    return <Button {...buttonProps} />
  })

  return (
    <div className='tool-buttons'>
      <ButtonGroup>{iconList}</ButtonGroup>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    tools: state.map.tool.present
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSelected: label => {
      dispatch({
        type: 'TOOL_SET_ACTIVE',
        value: label
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolButtons)
