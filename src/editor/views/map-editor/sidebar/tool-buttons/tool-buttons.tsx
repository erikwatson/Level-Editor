import * as React from 'react'
import { connect } from 'react-redux'

import ButtonGroup from '../../../../components/ui/button-group/button-group'
import Button from '../../../../components/ui/button/button'

import {
  faFill,
  faPaintBrush,
  faEraser,
  faMousePointer,
  faSlash,
  faEyeDropper
} from '@fortawesome/free-solid-svg-icons'

const labeledIcons = {
  pointer: faMousePointer,
  erase: faEraser,
  brush: faPaintBrush,
  fill: faFill,
  line: faSlash,
  dropper: faEyeDropper
}

const ToolButtons = ({ tools, setSelected }) => {
  const icons = Object.keys(labeledIcons).map(icon => ({
    label: icon,
    icon: labeledIcons[icon]
  }))

  const iconList = icons.map(icon => {
    const isSelected = icon.label === tools.active
    const onClick = e => {
      setSelected(icon.label)
    }

    const buttonProps = {
      tip: `${icon.label}`,
      icon: icon.icon,
      selected: isSelected,
      onClick
    }

    return <Button {...buttonProps} />
  })

  return <ButtonGroup>{iconList}</ButtonGroup>
}

const mapStateToProps = state => {
  return {
    tools: state.map.tool
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
