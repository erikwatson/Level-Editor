const React = require('react')
const { connect } = require('react-redux')

const ButtonGroup = require('../../../ui/button-group/button-group.js')
const Button = require('../../../ui/button/button')

const {
  faFill,
  faPaintBrush,
  faEraser,
  faMousePointer,
  faSlash
} = require('@fortawesome/free-solid-svg-icons')

const labeledIcons = {
  pointer: faMousePointer,
  erase: faEraser,
  brush: faPaintBrush,
  fill: faFill,
  line: faSlash
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
    tools: state.tool
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

module.exports = connect(mapStateToProps, mapDispatchToProps)(ToolButtons)
