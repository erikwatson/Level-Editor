import keyboardInput from './input/keyboard'
import mouseInput from './input/mouse'

function start() {
  keyboardInput.start()
  mouseInput.start()
}

function update() {
  keyboardInput.update()
  mouseInput.update()
}

export const keyboard = keyboardInput.state
export const mouse = mouseInput.state

export default {
  start,
  update
}
