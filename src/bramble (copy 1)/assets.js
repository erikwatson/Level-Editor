import terrain from './terrain'

function load(path, type = 'text') {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()

    request.responseType = type

    request.addEventListener('load', event => {
      switch (type) {
        case 'text':
          resolve(event.target.responseText)
          break

        case 'json':
          resolve(event.target.response)
          break

        default:
          console.error(`invalid type provided to load: ${type} is unknown`)
      }
    })

    request.addEventListener('error', event => {
      reject(event)
    })

    request.open('GET', path, true)
    request.send()
  })
}

export function loadText(path) {
  return load(path, 'text')
}

export function loadAllText(paths = []) {
  return Promise.all(paths.map(x => load(x, 'text')))
}

export function loadJson(path) {
  return load(path, 'json')
}

export function loadAllJson(paths = []) {
  return Promise.all(paths.map(x => load(x, 'json')))
}

export function loadImage(path) {
  return new Promise((resolve, reject) => {
    const img = new Image()

    img.addEventListener('load', e => {
      resolve(img)
    })

    img.addEventListener('error', err => {
      reject(err)
    })

    img.src = path
  })
}

export function loadAllImages(paths = []) {
  return Promise.all(paths.map(x => loadImage(x)))
}

export function loadSound(path) {
  return new Promise((resolve, reject) => {
    const audio = new Audio()

    audio.addEventListener('canplaythrough', e => {
      resolve(audio)
    })

    audio.addEventListener('error', err => {
      reject(err)
    })

    audio.src = path
  })
}

export function loadAllSounds(paths = []) {
  return Promise.all(paths.map(x => loadSound(x)))
}

// TODO: I am not sure yet if/how these are meaningfully different to loadSound
export function loadMusic(path) {
  return new Promise((resolve, reject) => {})
}

export function loadAllMusic(paths = []) {
  return Promise.all(paths.map(x => loadMusic(x)))
}

// Downloads a Terrain file,
// reads it,
// downloads the related image file,
// returns a new Terrain object
export function loadTerrain(path) {
  let description = null

  return loadJson(path)
    .then(json => {
      description = json
      return loadImage(description.path)
    })
    .then(image =>
      terrain.create(
        description.name,
        description.type,
        image,
        description.tiles
      )
    )
    .catch(err => {
      console.error(err)
    })
}

export function loadAllTerrain(paths = []) {
  return Promise.all(paths.map(x => loadTerrain(x)))
}

export default {
  loadText,
  loadJson,
  loadImage,
  loadAllText,
  loadAllImages,
  loadSound,
  loadAllSounds,
  loadTerrain,
  loadAllTerrain
}
