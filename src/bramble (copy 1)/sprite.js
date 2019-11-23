function create(
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  rotation = 0,
  texture = null,
  color = '#ffffff'
) {
  let frames = []

  return {
    x,
    y,
    width,
    height,
    rotation,
    texture,
    color,
    frame: 0,

    setFrames: newFrames => {
      frames = newFrames
    },

    addFrame: frame => {
      frames.push(frame)
    },

    get frames() {
      return frames
    },

    get x() {
      return x
    },

    set x(newX) {
      x = newX
    },

    get y() {
      return y
    },

    set y(newY) {
      y = newY
    },

    get rotation() {
      return rotation
    },

    set rotation(degrees) {
      rotation = degrees >= 360 ? 360 - degrees : degrees
    }
  }
}

export default {
  create
}
