const React = require('react')
const ButtonGroup = require('../button-group/button-group.js')

const {
  faFill,
  faPaintBrush,
  faEraser,
  faMousePointer
} = require('@fortawesome/free-solid-svg-icons')

const icons = [faMousePointer, faEraser, faPaintBrush, faFill]

module.exports = () => {
  return <ButtonGroup icons={icons} selected={0} />
}
