const React = require('react')
const { connect } = require('react-redux')
const ButtonGroup = require('../button-group/button-group.js')

const {
  faFill,
  faPaintBrush,
  faEraser,
  faMousePointer
} = require('@fortawesome/free-solid-svg-icons')

const withLabels = {
  select: faMousePointer,
  erase: faEraser,
  paintBrush: faPaintBrush,
  fill: faFill
}

const ToolButtons = ({ tools }) => {
  const icons = Object.keys(withLabels).map((icon, key) => withLabels[icon])

  const selected = Object.keys(withLabels).findIndex(x => x === tools.active)

  return <ButtonGroup icons={icons} selected={selected} />
}

const mapStateToProps = state => {
  return {
    tools: state.tool
  }
}

module.exports = connect(mapStateToProps)(ToolButtons)
