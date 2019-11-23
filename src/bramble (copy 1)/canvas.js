import gfx from './graphics'

export const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

function setSize(width, height) {
  canvas.width = width
  canvas.height = height
}

function attachTo(element) {
  element.appendChild(canvas)
  gfx.setContext(ctx)
}

// NOTE: Must be called AFTER anything that would change our context.
//       setSize for example.
function setSmoothing(to = true) {
  ctx.imageSmoothingEnabled = to
}

function disableContextMenu() {
  canvas.addEventListener('contextmenu', e => {
    e.preventDefault()
  })
}

export default {
  element: canvas,
  setSize,
  attachTo,
  setSmoothing,
  disableContextMenu
}
