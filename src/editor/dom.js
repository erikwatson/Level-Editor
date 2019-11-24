export function render(template, element) {
  element.innerHtml = template
  return element
}

module.exports = {
  render
}
