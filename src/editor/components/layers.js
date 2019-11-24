const DOM = require('../dom')

function renderToString(children) {
  return `<div id="layers-panel">${children}</div>`
}

function render() {
  const panel = renderToString()
  DOM.render(panel)
}

module.exports = {
  render
}
