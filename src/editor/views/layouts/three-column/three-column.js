const React = require('react')
const style = require('./three-column.sass')

const ThreeColumn = ({ children }) => {
  return <div id='three-column'>{children}</div>
}

module.exports = ThreeColumn
