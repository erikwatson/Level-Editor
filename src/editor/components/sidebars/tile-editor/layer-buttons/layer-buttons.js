const React = require('react')
const { faPlusSquare, faCopy } = require('@fortawesome/free-solid-svg-icons')

const ButtonGroup = require('../../../ui/button-group/button-group.js')

// Note :: I have just realised this shouldn't be a ButtonGroup because that
//         acts as more of a dropdown list replacement for small lists of icons.
//
//         This should be just regular boring buttons instead.

module.exports = () => {
  return <ButtonGroup icons={[faPlusSquare, faCopy]} selected={1} />
}
