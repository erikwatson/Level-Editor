const DOM = require('../dom')

function renderToString(title) {
  return `<div class="layer">${title}</div>`
}

function render(title) {
  const layer = renderToString(title)
  DOM.render(layer)
}

module.exports = {
  render
}
