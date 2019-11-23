function cloneArray(arr) {
  return arr.map(x => clone(x))
}

function cloneObject(obj) {
  return Object.keys(obj).reduce((acc, val) => {
    acc[val] = clone(obj[val])
    return acc
  }, {})
}

export const clone = obj => {
  if (Array.isArray(obj)) {
    return cloneArray(obj)
  }

  if (typeof obj === 'object') {
    return cloneObject(obj)
  }

  return obj
}

export default {
  clone
}
