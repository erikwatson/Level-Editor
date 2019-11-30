const React = require('react')

const Panel = require('../panel/panel.js')

const style = require('./panel-list.sass')

module.exports = ({ children, open = false }) => {
  const renderThese = children.map(child => {
    return React.cloneElement(child, {
      open: child.props.open !== undefined ? child.props.open : open
    })
  })

  return (
    <div id='panel-list'>
      <h1>Panel List</h1>
      {renderThese}
    </div>
  )
}
