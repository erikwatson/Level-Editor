/******/ ;(function(modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {} // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {}
      /******/
    }) // Execute the module function
    /******/
    /******/ /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    ) // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true // Return the exports of the module
    /******/
    /******/ /******/ return module.exports
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter
      })
      /******/
    }
    /******/
  } // define __esModule on exports
  /******/
  /******/ /******/ __webpack_require__.r = function(exports) {
    /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/ Object.defineProperty(exports, Symbol.toStringTag, {
        value: 'Module'
      })
      /******/
    }
    /******/ Object.defineProperty(exports, '__esModule', { value: true })
    /******/
  } // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
  /******/
  /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function(
    value,
    mode
  ) {
    /******/ if (mode & 1) value = __webpack_require__(value)
    /******/ if (mode & 8) return value
    /******/ if (
      mode & 4 &&
      typeof value === 'object' &&
      value &&
      value.__esModule
    )
      return value
    /******/ var ns = Object.create(null)
    /******/ __webpack_require__.r(ns)
    /******/ Object.defineProperty(ns, 'default', {
      enumerable: true,
      value: value
    })
    /******/ if (mode & 2 && typeof value != 'string')
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function(key) {
            return value[key]
          }.bind(null, key)
        )
    /******/ return ns
    /******/
  } // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function(module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module['default']
          }
        : /******/ function getModuleExports() {
            return module
          }
    /******/ __webpack_require__.d(getter, 'a', getter)
    /******/ return getter
    /******/
  } // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property)
  } // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = '' // Load entry module and return exports
  /******/
  /******/
  /******/ /******/ return __webpack_require__(
    (__webpack_require__.s = './src/main.js')
  )
  /******/
})(
  /************************************************************************/
  /******/ {
    /***/ './src/bramble/src/bramble/assets.js':
      /*!*******************************************!*\
  !*** ./src/bramble/src/bramble/assets.js ***!
  \*******************************************/
      /*! exports provided: loadText, loadAllText, loadJson, loadAllJson, loadImage, loadAllImages, loadSound, loadAllSounds, loadMusic, loadAllMusic, loadTerrain, loadAllTerrain, default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadText", function() { return loadText; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadAllText", function() { return loadAllText; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadJson", function() { return loadJson; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadAllJson", function() { return loadAllJson; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadImage", function() { return loadImage; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadAllImages", function() { return loadAllImages; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadSound", function() { return loadSound; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadAllSounds", function() { return loadAllSounds; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadMusic", function() { return loadMusic; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadAllMusic", function() { return loadAllMusic; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadTerrain", function() { return loadTerrain; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadAllTerrain", function() { return loadAllTerrain; });\n/* harmony import */ var _terrain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./terrain */ "./src/bramble/src/bramble/terrain.js");\n\n\nfunction load(path, type = \'text\') {\n  return new Promise((resolve, reject) => {\n    const request = new XMLHttpRequest()\n\n    request.responseType = type\n\n    request.addEventListener(\'load\', event => {\n      switch (type) {\n        case \'text\': \n          resolve(event.target.responseText); \n          break\n\n        case \'json\': \n          resolve(event.target.response); \n          break\n\n        default: \n          console.error(`invalid type provided to load: ${type} is unknown`)\n      }\n    })\n\n    request.addEventListener(\'error\', event => {\n      reject(event)\n    })\n\n    request.open(\'GET\', path, true)\n    request.send()\n  })\n}\n\nfunction loadText(path) {\n  return load(path, \'text\')\n}\n\nfunction loadAllText(paths = []) {\n  return Promise.all(paths.map(x => load(x, \'text\')))\n}\n\nfunction loadJson(path) {\n  return load(path, \'json\')\n}\n\nfunction loadAllJson(paths = []) {\n  return Promise.all(paths.map(x => load(x, \'json\')))\n}\n\nfunction loadImage(path) {\n  return new Promise((resolve, reject) => {\n    const img = new Image()\n\n    img.addEventListener(\'load\', e => {\n      resolve(img)\n    })\n\n    img.addEventListener(\'error\', err => {\n      reject(err)\n    })\n\n    img.src = path\n  })\n}\n\nfunction loadAllImages(paths = []) {\n  return Promise.all(paths.map(x => loadImage(x)))\n}\n\nfunction loadSound(path) {\n  return new Promise((resolve, reject) => {\n    const audio = new Audio()\n\n    audio.addEventListener(\'canplaythrough\', e => {\n      resolve(audio)\n    })\n\n    audio.addEventListener(\'error\', err => {\n      reject(err)\n    })\n\n    audio.src = path\n  })\n}\n\nfunction loadAllSounds(paths = []) {\n  return Promise.all(paths.map(x => loadSound(x)))\n}\n\n// TODO: I am not sure yet if/how these are meaningfully different to loadSound\nfunction loadMusic(path) {\n  return new Promise((resolve, reject) => {})\n}\n\nfunction loadAllMusic(paths = []) {\n  return Promise.all(paths.map(x => loadMusic(x)))\n}\n\n// Downloads a Terrain file, \n// reads it, \n// downloads the related image file, \n// returns a new Terrain object \nfunction loadTerrain(path) {\n  let description = null\n\n  return loadJson(path)\n    .then(json => { \n      description = json\n      return loadImage(description.path)\n    })\n    .then(image => _terrain__WEBPACK_IMPORTED_MODULE_0__["default"].create(\n      description.name, \n      description.type, \n      image,\n      description.tiles\n    ))\n    .catch(err => {\n      console.error(err)\n    })\n}\n\nfunction loadAllTerrain(paths = []) {\n  return Promise.all(paths.map(x => loadTerrain(x)))\n}\n\n/* harmony default export */ __webpack_exports__["default"] = ({\n  loadText,\n  loadJson,\n  loadImage,\n  loadAllText,\n  loadAllImages,\n  loadSound,\n  loadAllSounds,\n  loadTerrain,\n  loadAllTerrain\n});\n\n\n//# sourceURL=webpack:///./src/bramble/src/bramble/assets.js?'
        )

        /***/
      },

    /***/ './src/bramble/src/bramble/bramble.js':
      /*!********************************************!*\
  !*** ./src/bramble/src/bramble/bramble.js ***!
  \********************************************/
      /*! exports provided: assets, game, grid, graphics, keyboard, mouse, music, sfx, sprite, textbox */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets */ "./src/bramble/src/bramble/assets.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "assets", function() { return _assets__WEBPACK_IMPORTED_MODULE_0__["default"]; });\n\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ "./src/bramble/src/bramble/game.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "game", function() { return _game__WEBPACK_IMPORTED_MODULE_1__["default"]; });\n\n/* harmony import */ var _grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./grid */ "./src/bramble/src/bramble/grid.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "grid", function() { return _grid__WEBPACK_IMPORTED_MODULE_2__["default"]; });\n\n/* harmony import */ var _graphics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./graphics */ "./src/bramble/src/bramble/graphics.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "graphics", function() { return _graphics__WEBPACK_IMPORTED_MODULE_3__["default"]; });\n\n/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./input */ "./src/bramble/src/bramble/input.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "keyboard", function() { return _input__WEBPACK_IMPORTED_MODULE_4__["keyboard"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mouse", function() { return _input__WEBPACK_IMPORTED_MODULE_4__["mouse"]; });\n\n/* harmony import */ var _music__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./music */ "./src/bramble/src/bramble/music.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "music", function() { return _music__WEBPACK_IMPORTED_MODULE_5__["default"]; });\n\n/* harmony import */ var _sfx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sfx */ "./src/bramble/src/bramble/sfx.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sfx", function() { return _sfx__WEBPACK_IMPORTED_MODULE_6__["default"]; });\n\n/* harmony import */ var _sprite__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./sprite */ "./src/bramble/src/bramble/sprite.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sprite", function() { return _sprite__WEBPACK_IMPORTED_MODULE_7__["default"]; });\n\n/* harmony import */ var _textbox__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./textbox */ "./src/bramble/src/bramble/textbox.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "textbox", function() { return _textbox__WEBPACK_IMPORTED_MODULE_8__["default"]; });\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/bramble/src/bramble/bramble.js?'
        )

        /***/
      },

    /***/ './src/bramble/src/bramble/canvas.js':
      /*!*******************************************!*\
  !*** ./src/bramble/src/bramble/canvas.js ***!
  \*******************************************/
      /*! exports provided: canvas, default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canvas", function() { return canvas; });\n/* harmony import */ var _graphics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./graphics */ "./src/bramble/src/bramble/graphics.js");\n\n\nconst canvas = document.createElement(\'canvas\')\nconst ctx = canvas.getContext(\'2d\')\n\nfunction setSize (width, height) {\n  canvas.width = width\n  canvas.height = height\n}\n\nfunction attachTo (element) {\n  element.appendChild(canvas)\n  _graphics__WEBPACK_IMPORTED_MODULE_0__["default"].setContext(ctx)\n}\n\n// NOTE: Must be called AFTER anything that would change our context.\n//       setSize for example.\nfunction setSmoothing (to = true) {\n  ctx.imageSmoothingEnabled = to\n}\n\nfunction disableContextMenu () {\n  canvas.addEventListener(\'contextmenu\', e => {\n    e.preventDefault()\n  })\n}\n\n/* harmony default export */ __webpack_exports__["default"] = ({\n  element: canvas,\n  setSize,\n  attachTo,\n  setSmoothing,\n  disableContextMenu\n});\n\n\n//# sourceURL=webpack:///./src/bramble/src/bramble/canvas.js?'
        )

        /***/
      },

    /***/ './src/bramble/src/bramble/game.js':
      /*!*****************************************!*\
  !*** ./src/bramble/src/bramble/game.js ***!
  \*****************************************/
      /*! exports provided: default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas */ "./src/bramble/src/bramble/canvas.js");\n/* harmony import */ var _graphics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphics */ "./src/bramble/src/bramble/graphics.js");\n/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./input */ "./src/bramble/src/bramble/input.js");\n\n\n\n\nlet backgroundColor = \'#000000\'\n\nlet update = null\nlet render = null\n\n// These are used for calculating the Delta Time for the Frame\nlet prevTime = 0\nlet frameTime = 0\n\nfunction setBackgroundColor(color) {\n  backgroundColor = color\n}\n\nfunction setUpdate(callback) {\n  update = callback\n}\n\nfunction setRender(callback) {\n  render = callback\n}\n\nfunction step() {\n  if (update) {\n    update(1 / 60) // TODO: fake it at 60fps for now\n  }\n\n  if (render) {\n    _graphics__WEBPACK_IMPORTED_MODULE_1__["default"].clear(backgroundColor)\n    render()\n  }\n\n  _input__WEBPACK_IMPORTED_MODULE_2__["default"].update()\n  window.requestAnimationFrame(step)\n}\n\nfunction start() {\n  _input__WEBPACK_IMPORTED_MODULE_2__["default"].start()\n  window.requestAnimationFrame(step)\n}\n\n/* harmony default export */ __webpack_exports__["default"] = ({\n  setSize: _canvas__WEBPACK_IMPORTED_MODULE_0__["default"].setSize,\n  setUpdate,\n  setRender,\n  setBackgroundColor,\n  attachTo: _canvas__WEBPACK_IMPORTED_MODULE_0__["default"].attachTo,\n  disableContextMenu: _canvas__WEBPACK_IMPORTED_MODULE_0__["default"].disableContextMenu,\n  setSmoothing: _canvas__WEBPACK_IMPORTED_MODULE_0__["default"].setSmoothing,\n  start\n});\n\n\n//# sourceURL=webpack:///./src/bramble/src/bramble/game.js?'
        )

        /***/
      },

    /***/ './src/bramble/src/bramble/graphics.js':
      /*!*********************************************!*\
  !*** ./src/bramble/src/bramble/graphics.js ***!
  \*********************************************/
      /*! exports provided: default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        eval(
          "__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _number__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./number */ \"./src/bramble/src/bramble/number.js\");\n\n\nlet ctx = null\n\nfunction setContext(context) {\n  ctx = context\n}\n\nfunction getContext() {\n  return ctx\n}\n\nfunction clear(color) {\n  rect(0, 0, ctx.canvas.width, ctx.canvas.height, {\n    fill: {\n      color\n    }\n  })\n}\n\nconst defaultRect = {\n  fill: {\n    color: '#ffffff',\n    opacity: 1\n  },\n  line: {\n    width: 2,\n    color: '#000000',\n    opacity: 1\n  }\n}\n\nfunction square(x, y, size, options = defaultRect) {\n  rect(x, y, size, size, options)\n}\n\nfunction rect(x, y, w, h, options = defaultRect) {\n  if (typeof options.fill !== 'undefined') {\n    ctx.fillStyle = options.fill.color\n    ctx.fillRect(x, y, w, h)\n  }\n\n  if (typeof options.line !== 'undefined') {\n    ctx.strokeStyle = options.line.color\n    ctx.lineWidth = options.line.width\n    ctx.strokeRect(x, y, w, h)\n  }\n}\n\nconst defaultLine = {\n  width: 2,\n  color: '#000000'\n}\n\nfunction line(from, to, options = defaultLine) {\n  ctx.strokeStyle = options.color\n  ctx.lineWidth = options.width\n\n  ctx.beginPath()\n  ctx.moveTo(from.x, from.y)\n  ctx.lineTo(to.x, to.y)\n  ctx.stroke()\n}\n\nconst defaultCircle = {\n  fill: {\n    color: '#000000',\n    opacity: 1\n  },\n\n  line: {\n    color: '#ffffff',\n    opacity: 1,\n    width: 2\n  }\n}\n\nfunction circle(x, y, radius, options = defaultCircle) {\n  // not happy with this really, make another function i think\n  if (typeof options.fill !== 'undefined') {\n    ctx.fillStyle = options.fill.color\n  }\n\n  ctx.beginPath()\n  ctx.strokeStyle = options.line.color\n  ctx.lineWidth = options.line.width\n  ctx.arc(x, y, radius, 0, 2 * Math.PI)\n  ctx.closePath()\n\n  if (typeof options.fill !== 'undefined') {\n    ctx.fill()\n  }\n\n  ctx.stroke()\n}\n\nfunction image(x, y, w, h, image) {\n  ctx.drawImage(image, x, y, w, h)\n}\n\nfunction subImage(x, y, w, h, sx, sy, sw, sh, image) {\n  ctx.drawImage(image, sx, sy, sw, sh, x, y, w, h)\n}\n\nfunction sprite(sprite) {\n  const halfWidth = sprite.width / 2\n  const halfHeight = sprite.height / 2\n\n  ctx.save()\n  ctx.translate(sprite.x + halfWidth, sprite.y + halfHeight)\n  ctx.rotate(_number__WEBPACK_IMPORTED_MODULE_0__[\"default\"].toRadians(sprite.rotation))\n\n  if (sprite.frames.length > 1) {\n    subImage(\n      -halfWidth,\n      -halfHeight,\n      sprite.width,\n      sprite.height,\n      sprite.frames[sprite.frame].x,\n      sprite.frames[sprite.frame].y,\n      sprite.frames[sprite.frame].width,\n      sprite.frames[sprite.frame].height,\n      sprite.texture\n    )\n  } else {\n    image(-halfWidth, -halfHeight, sprite.width, sprite.height, sprite.texture)\n  }\n\n  ctx.restore()\n}\n\nfunction text(\n  x = 0,\n  y = 0,\n  text = '',\n  color = '#000000',\n  font = '16pt sans-serif'\n) {\n  ctx.fillStyle = color\n  ctx.font = font\n  ctx.textAlign = 'left'\n  ctx.textBaseline = 'top'\n  ctx.fillText(text, x, y)\n}\n\n// TODO: Figure out word wrapping for these boxes.\n//\n//       I think we will probably have to split the text up into lines of\n//       appropriate width, then render each one of them individually.\n//\n//       This could probably be cached in the object itself as long as we update\n//       every time there's a change to the font, text, width or height.\nfunction textbox(textbox) {\n  ctx.fillStyle = '#ffffff'\n  ctx.font = '16pt sans-serif'\n  ctx.textAlign = 'left'\n  ctx.textBaseline = 'top'\n\n  const measurements = ctx.measureText(textbox.text)\n\n  if (measurements.width > textbox.width) {\n    textbox.text = textbox.text.substr(0, 10) + '\\n' + textbox.text.substr(10)\n  }\n\n  ctx.fillText(textbox.text, textbox.x, textbox.y)\n}\n\nfunction tile(\n  positionX,\n  positionY,\n  tilesheet,\n  gridX,\n  gridY,\n  tileSheetX,\n  tileSheetY,\n  scale,\n  tileWidth,\n  tileHeight\n) {\n  subImage(\n    positionX + scale * (gridX * tileWidth),\n    positionY + scale * (gridY * tileHeight),\n    scale * tileWidth,\n    scale * tileHeight,\n    tileWidth * tileSheetX,\n    tileHeight * tileSheetY,\n    tileWidth,\n    tileHeight,\n    tilesheet\n  )\n}\n\n// tilegrid: a 2d array of numbers representing terrain types\n// spritesheets: An object, each key is the value that represents a tile from this sheet\nfunction tiles(positionX, positionY, tileGrid, spriteSheets, scale, tileWidth, tileHeight) {\n  const dirValues = {\n    NW: 1,\n    N: 2,\n    NE: 4,\n    E: 8,\n    SE: 16,\n    S: 32,\n    SW: 64,\n    W: 128\n  }\n\n  for (let y = 0; y < tileGrid.length; y++) {\n    for (let x = 0; x < tileGrid[y].length; x++) {\n      if (tileGrid[y][x] === 0) {\n        continue\n      }\n\n      // REAL VALUES\n      const tl = y > 0 ? tileGrid[y - 1][x - 1] : 0\n      const tm = y > 0 ? tileGrid[y - 1][x] : 0\n      const tr = y > 0 ? tileGrid[y - 1][x + 1] : 0\n\n      const ml = tileGrid[y][x - 1]\n      const m = tileGrid[y][x]\n      const mr = tileGrid[y][x + 1]\n\n      const bl = y < tileGrid.length - 1 ? tileGrid[y + 1][x - 1] : 0\n      const bm = y < tileGrid.length - 1 ? tileGrid[y + 1][x] : 0\n      const br = y < tileGrid.length - 1 ? tileGrid[y + 1][x + 1] : 0\n\n      // BINARY VALUES\n      const n = m === tm ? 1 : 0\n      const e = m === mr ? 1 : 0\n      const s = m === bm ? 1 : 0\n      const w = m === ml ? 1 : 0\n\n      const nw = m === tm && m === ml ? (m === tl ? 1 : 0) : 0\n      const ne = m === tm && m === mr ? (m === tr ? 1 : 0) : 0\n      const sw = m === bm && m === ml ? (m === bl ? 1 : 0) : 0\n      const se = m === bm && m === mr ? (m === br ? 1 : 0) : 0\n\n      const sum =\n        dirValues.NW * nw +\n        dirValues.N * n +\n        dirValues.NE * ne +\n        dirValues.E * e +\n        dirValues.SE * se +\n        dirValues.S * s +\n        dirValues.SW * sw +\n        dirValues.W * w\n\n      // Figure out which sheet we're supposed to be drawing from \n      let sheet = spriteSheets.filter(sheet => {\n        return sheet.type === tileGrid[y][x]\n      })[0]\n\n      const selections = sheet.tiles.filter(x => x.type === sum)\n\n      // Note: Just picking a random one of the variants every time we render for now\n      const selection = selections[Math.floor(Math.random() * selections.length)]\n\n      if (selection) {\n        tile(\n          positionX,\n          positionY,\n          sheet.image, \n          x,\n          y,\n          selection.position.x,\n          selection.position.y,\n          scale,\n          selection.size.width,\n          selection.size.height\n        )\n      } else {\n        console.log(`Tile not defined ${sum}`)\n      }\n    }\n  }\n}\n\nconst defaultDropShadow = {\n  shadowColor: '#000000',\n  shadowBlur: 6,\n  shadowOffsetX: 4,\n  shadowOffsetY: 4\n}\n\nfunction shadow (drawingOperations, options = defaultDropShadow) {\n  ctx.save()\n\n  ctx.shadowColor = options.shadowColor\n  ctx.shadowBlur = options.shadowBlur\n  ctx.shadowOffsetX = options.shadowOffsetX\n  ctx.shadowOffsetY = options.shadowOffsetY\n  \n  drawingOperations()\n  ctx.restore()\n}\n\nfunction dodge (drawingOperations) {\n  ctx.save()\n  ctx.globalCompositeOperation = 'color-dodge';\n  drawingOperations()\n  ctx.restore()\n}\n\nfunction overlay (drawingOperations) {\n  ctx.save()\n  ctx.globalCompositeOperation = 'overlay';\n  drawingOperations()\n  ctx.restore()\n}\n\nfunction transparency (drawingOperations, alpha = 0.25) {\n  ctx.save()\n  ctx.globalAlpha = alpha\n  drawingOperations()\n  ctx.restore()\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  circle,\n  clear,\n  image,\n  line,\n  rect,\n  getContext,\n  setContext,\n  sprite,\n  square,\n  subImage,\n  text,\n  textbox,\n  tiles,\n  shadow,\n  dodge,\n  overlay,\n  transparency\n});\n\n\n//# sourceURL=webpack:///./src/bramble/src/bramble/graphics.js?"
        )

        /***/
      },

    /***/ './src/bramble/src/bramble/grid.js':
      /*!*****************************************!*\
  !*** ./src/bramble/src/bramble/grid.js ***!
  \*****************************************/
      /*! exports provided: default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        eval(
          '__webpack_require__.r(__webpack_exports__);\nfunction make2DArray(width = 1, height = 1, defaultValue = null) {\n  let result = []\n\n  for (let y = 0; y < height; y++) {\n    let row = []\n\n    for (let x = 0; x < width; x++) {\n      row.push(defaultValue)\n    }\n\n    result.push(row)\n  }\n\n  return result\n}\n\nconst defaultGrid = {\n  pos: { x: 0, y: 0 },\n  visible: true,\n  divisions: 4,\n  tileWidth: 8,\n  tileHeight: 8\n}\n\nfunction create(width, height, options = defaultGrid) {\n  let tiles = make2DArray(width, height, 0)\n  let pos = { x: options.pos.x, y: options.pos.y }\n  let visible = options.visible\n  let divisions = options.divisions\n  let tileWidth = options.tileWidth\n  let tileHeight = options.tileHeight\n  \n  return {\n    divisions,\n    pos,\n    tileHeight,\n    tiles,\n    tileWidth,\n    visible\n  }\n}\n\n/* harmony default export */ __webpack_exports__["default"] = ({\n  create\n});\n\n\n//# sourceURL=webpack:///./src/bramble/src/bramble/grid.js?'
        )

        /***/
      },

    /***/ './src/bramble/src/bramble/input.js':
      /*!******************************************!*\
  !*** ./src/bramble/src/bramble/input.js ***!
  \******************************************/
      /*! exports provided: keyboard, mouse, default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keyboard", function() { return keyboard; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mouse", function() { return mouse; });\n/* harmony import */ var _input_keyboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input/keyboard */ "./src/bramble/src/bramble/input/keyboard.js");\n/* harmony import */ var _input_mouse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./input/mouse */ "./src/bramble/src/bramble/input/mouse.js");\n\n\n\nfunction start () {\n  _input_keyboard__WEBPACK_IMPORTED_MODULE_0__["default"].start()\n  _input_mouse__WEBPACK_IMPORTED_MODULE_1__["default"].start()\n}\n\nfunction update () {\n  _input_keyboard__WEBPACK_IMPORTED_MODULE_0__["default"].update()\n  _input_mouse__WEBPACK_IMPORTED_MODULE_1__["default"].update()\n}\n\nconst keyboard = _input_keyboard__WEBPACK_IMPORTED_MODULE_0__["default"].state\nconst mouse = _input_mouse__WEBPACK_IMPORTED_MODULE_1__["default"].state\n\n/* harmony default export */ __webpack_exports__["default"] = ({\n  start,\n  update\n});\n\n\n//# sourceURL=webpack:///./src/bramble/src/bramble/input.js?'
        )

        /***/
      },

    /***/ './src/bramble/src/bramble/input/keyboard.js':
      /*!***************************************************!*\
  !*** ./src/bramble/src/bramble/input/keyboard.js ***!
  \***************************************************/
      /*! exports provided: default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        eval(
          "__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../canvas */ \"./src/bramble/src/bramble/canvas.js\");\n/* harmony import */ var _keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keys */ \"./src/bramble/src/bramble/input/keys.js\");\n\n\n\nlet keys = defaultState()\n\nfunction defaultState () {\n  const defaultState = {\n    pressed: false,\n    justPressed: false,\n    released: false,\n    justReleased: false\n  }\n\n  return _keys__WEBPACK_IMPORTED_MODULE_1__[\"default\"].reduce((acc, key) => {\n    const label = key.label\n    delete key['label']\n\n    acc[label] = { ...key, ...defaultState }\n\n    return acc\n  }, {})\n}\n\nfunction preventDefaultArrows (event) {\n  const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']\n\n  if (keys.includes(event.key)) {\n    event.preventDefault()\n  }\n}\n\nfunction getKey (event, keys) {\n  let result = null\n  const objectKeys = Object.keys(keys)\n\n  for (let i = 0; i < objectKeys.length; i++) {\n    if (keys[objectKeys[i]].code === event.keyCode) {\n      result = keys[objectKeys[i]]\n    }\n  }\n\n  return result\n}\n\nfunction down (event) {\n  preventDefaultArrows(event)\n\n  const key = getKey(event, keys)\n\n  key.pressed = true\n}\n\nfunction up (event) {\n  const key = getKey(event, keys)\n\n  key.pressed = false\n}\n\nfunction update () {\n\n}\n\nfunction start () {\n  // keyboard events\n  document.addEventListener('keydown', down)\n  document.addEventListener('keyup', up)\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  start,\n  update,\n  state: keys\n});\n\n\n//# sourceURL=webpack:///./src/bramble/src/bramble/input/keyboard.js?"
        )

        /***/
      },

    /***/ './src/bramble/src/bramble/input/keys.js':
      /*!***********************************************!*\
  !*** ./src/bramble/src/bramble/input/keys.js ***!
  \***********************************************/
      /*! exports provided: default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        eval(
          "__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ([\n  { code: 8, label: 'backspace' },\n  { code: 9, label: 'tab' },\n\n  { code: 13, label: 'enter' },\n\n  { code: 16, label: 'shift' },\n  { code: 17, label: 'ctrl' },\n  { code: 18, label: 'alt' },\n\n  { code: 20, label: 'caps' },\n\n  { code: 27, label: 'escape' },\n\n  { code: 32, label: 'space' },\n  { code: 33, label: 'pageUp' },\n  { code: 34, label: 'pageDown' },\n  { code: 35, label: 'end' },\n  { code: 36, label: 'home' },\n  { code: 37, label: 'left' },\n  { code: 38, label: 'up' },\n  { code: 39, label: 'right' },\n  { code: 40, label: 'down' },\n\n  { code: 45, label: 'insert' },\n  { code: 46, label: 'delete' },\n\n  { code: 48, label: 'zero' },\n  { code: 49, label: 'one' },\n  { code: 50, label: 'two' },\n  { code: 51, label: 'three' },\n  { code: 52, label: 'four' },\n  { code: 53, label: 'five' },\n  { code: 54, label: 'six' },\n  { code: 55, label: 'seven' },\n  { code: 56, label: 'eight' },\n  { code: 57, label: 'nine' },\n\n  { code: 65, label: 'A' },\n  { code: 66, label: 'B' },\n  { code: 67, label: 'C' },\n  { code: 68, label: 'D' },\n  { code: 69, label: 'E' },\n  { code: 70, label: 'F' },\n  { code: 71, label: 'G' },\n  { code: 72, label: 'H' },\n  { code: 73, label: 'I' },\n  { code: 74, label: 'J' },\n  { code: 75, label: 'K' },\n  { code: 76, label: 'L' },\n  { code: 77, label: 'M' },\n  { code: 78, label: 'N' },\n  { code: 79, label: 'O' },\n  { code: 80, label: 'P' },\n  { code: 81, label: 'Q' },\n  { code: 82, label: 'R' },\n  { code: 83, label: 'S' },\n  { code: 84, label: 'T' },\n  { code: 85, label: 'U' },\n  { code: 86, label: 'V' },\n  { code: 87, label: 'W' },\n  { code: 88, label: 'X' },\n  { code: 89, label: 'Y' },\n  { code: 90, label: 'Z' },\n\n  { code: 91, label: 'superLeft' },\n  { code: 92, label: 'superRight' },\n  { code: 93, label: 'select' },\n\n  { code: 96, label: 'num0' },\n  { code: 97, label: 'num1' },\n  { code: 98, label: 'num2' },\n  { code: 99, label: 'num3' },\n  { code: 100, label: 'num4' },\n  { code: 101, label: 'num5' },\n  { code: 102, label: 'num6' },\n  { code: 103, label: 'num7' },\n  { code: 104, label: 'num8' },\n  { code: 105, label: 'num9' },\n  { code: 106, label: 'multiply' },\n  { code: 107, label: 'add' },\n\n  { code: 109, label: 'subtract' },\n  { code: 110, label: 'point' },\n  { code: 111, label: 'divide' },\n  { code: 112, label: 'F1' },\n  { code: 113, label: 'F2' },\n  { code: 114, label: 'F3' },\n  { code: 115, label: 'F4' },\n  { code: 116, label: 'F5' },\n  { code: 117, label: 'F6' },\n  { code: 118, label: 'F7' },\n  { code: 119, label: 'F8' },\n  { code: 120, label: 'F9' },\n  { code: 121, label: 'F10' },\n  { code: 122, label: 'F11' },\n  { code: 123, label: 'F12' },\n\n  { code: 144, label: 'numLock' },\n  { code: 145, label: 'scrollLock' },\n\n  { code: 186, label: 'semiColon' },\n  { code: 187, label: 'equals' },\n  { code: 188, label: 'comma' },\n  { code: 189, label: 'dash' },\n  { code: 190, label: 'dot' },\n  { code: 191, label: 'forewardSlash' },\n  { code: 192, label: 'graveAccent' },\n\n  { code: 219, label: 'openBracket' },\n  { code: 220, label: 'backSlash' },\n  { code: 221, label: 'closeBracket' },\n  { code: 222, label: 'singleQuote' }\n]);\n\n\n//# sourceURL=webpack:///./src/bramble/src/bramble/input/keys.js?"
        )

        /***/
      },

    /***/ './src/bramble/src/bramble/input/mouse.js':
      /*!************************************************!*\
  !*** ./src/bramble/src/bramble/input/mouse.js ***!
  \************************************************/
      /*! exports provided: default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        eval(
          "__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../canvas */ \"./src/bramble/src/bramble/canvas.js\");\n\n\nlet prevMouse = defaultState()\nlet mouse = defaultState()\n\nfunction diff() {\n  let result = {}\n\n  if (prevMouse.x !== mouse.x) {\n    result['x'] = mouse.x\n  }\n\n  if (prevMouse.y !== mouse.y) {\n    result['y'] = mouse.y\n  }\n\n  if (prevMouse.pressed !== mouse.pressed) {\n    result['pressed'] = mouse.pressed\n  }\n\n  if (prevMouse.justPressed !== mouse.justPressed) {\n    result['justPressed'] = mouse.justPressed\n  }\n\n  if (prevMouse.released !== mouse.released) {\n    result['released'] = mouse.released\n  }\n\n  if (prevMouse.justReleased !== mouse.justReleased) {\n    result['justReleased'] = mouse.justReleased\n  }\n\n  return result\n}\n\nfunction defaultButtonState() {\n  return {\n    pressed: false,\n    justPressed: false,\n    released: false,\n    justReleased: false\n  }\n}\n\nfunction defaultWheelState() {\n  const buttonState = defaultButtonState()\n  return {\n    ...buttonState,\n    moved: false\n  }\n}\n\nfunction defaultState() {\n  return {\n    x: 0,\n    y: 0,\n\n    left: defaultButtonState(),\n    wheel: defaultWheelState(),\n    right: defaultButtonState()\n  }\n}\n\nfunction clone(state) {\n  return Object.assign({}, state)\n}\n\nfunction relative(event, element) {\n  const bounds = _canvas__WEBPACK_IMPORTED_MODULE_0__[\"canvas\"].getBoundingClientRect()\n\n  return {\n    x: event.clientX - bounds.left,\n    y: event.clientY - bounds.top\n  }\n}\n\nfunction move(event) {\n  const newPos = relative(event, _canvas__WEBPACK_IMPORTED_MODULE_0__[\"canvas\"])\n\n  mouse.x = newPos.x\n  mouse.y = newPos.y\n}\n\nfunction down(event) {\n  switch (event.which) {\n    case 1:\n      mouse.left.pressed = true\n      break\n\n    case 2:\n      mouse.middle.pressed = true\n      break\n\n    case 3:\n      mouse.right.pressed = true\n      break\n  }\n}\n\nfunction up(event) {\n  switch (event.which) {\n    case 1:\n      mouse.left.pressed = false\n      break\n\n    case 2:\n      mouse.middle.pressed = false\n      break\n\n    case 3:\n      mouse.right.pressed = false\n      break\n  }\n}\n\nfunction wheel (event) {\n  mouse.wheel.moved = (event.delta === 0)\n    ? false\n    : true \n\n  if (mouse.wheel.moved !== false) {\n    mouse.wheel.direction = (event.deltaY < 0) \n      ? 'up' \n      : 'down'\n  }\n}\n\nfunction update() {\n  mouse.wheel.moved = false \n  prevMouse = clone(mouse)\n}\n\nfunction start() {\n  // mouse events\n  _canvas__WEBPACK_IMPORTED_MODULE_0__[\"canvas\"].addEventListener('mousemove', move)\n  _canvas__WEBPACK_IMPORTED_MODULE_0__[\"canvas\"].addEventListener('mousedown', down)\n  _canvas__WEBPACK_IMPORTED_MODULE_0__[\"canvas\"].addEventListener('mouseup', up)\n  _canvas__WEBPACK_IMPORTED_MODULE_0__[\"canvas\"].addEventListener('wheel', wheel)\n\n  // default mouse position, center of screen\n  mouse.x = _canvas__WEBPACK_IMPORTED_MODULE_0__[\"canvas\"].width / 2\n  mouse.y = _canvas__WEBPACK_IMPORTED_MODULE_0__[\"canvas\"].height / 2\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  start,\n  update,\n  state: mouse\n});\n\n\n//# sourceURL=webpack:///./src/bramble/src/bramble/input/mouse.js?"
        )

        /***/
      },

    /***/ './src/bramble/src/bramble/music.js':
      /*!******************************************!*\
  !*** ./src/bramble/src/bramble/music.js ***!
  \******************************************/
      /*! exports provided: default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sound__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sound */ "./src/bramble/src/bramble/sound.js");\n// music should handle the playback of longer, looping sounds\n\n\n/* harmony default export */ __webpack_exports__["default"] = ({});\n\n\n//# sourceURL=webpack:///./src/bramble/src/bramble/music.js?'
        )

        /***/
      },

    /***/ './src/bramble/src/bramble/number.js':
      /*!*******************************************!*\
  !*** ./src/bramble/src/bramble/number.js ***!
  \*******************************************/
      /*! exports provided: toRadians, toDegrees, default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toRadians", function() { return toRadians; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toDegrees", function() { return toDegrees; });\nfunction toRadians (degrees) {\n  return degrees * (Math.PI / 180)\n}\n\nfunction toDegrees (radians) {\n  return radians * (180 / Math.PI)\n}\n\n/* harmony default export */ __webpack_exports__["default"] = ({\n  toRadians,\n  toDegrees\n});\n\n\n//# sourceURL=webpack:///./src/bramble/src/bramble/number.js?'
        )

        /***/
      },

    /***/ './src/bramble/src/bramble/sfx.js':
      /*!****************************************!*\
  !*** ./src/bramble/src/bramble/sfx.js ***!
  \****************************************/
      /*! exports provided: default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sound__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sound */ "./src/bramble/src/bramble/sound.js");\n// should just handle sound effects, one off sounds\n\n\n/* harmony default export */ __webpack_exports__["default"] = ({});\n\n\n//# sourceURL=webpack:///./src/bramble/src/bramble/sfx.js?'
        )

        /***/
      },

    /***/ './src/bramble/src/bramble/sound.js':
      /*!******************************************!*\
  !*** ./src/bramble/src/bramble/sound.js ***!
  \******************************************/
      /*! exports provided: default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        eval(
          '__webpack_require__.r(__webpack_exports__);\n// This should be a lower level module that handles general sound stuff\n// sfx and music should both get to make use of this\nfunction play(sound) {}\n\nfunction pause(sound) {}\n\nfunction stop(sound) {}\n\n/* harmony default export */ __webpack_exports__["default"] = ({\n  play,\n  pause,\n  stop\n});\n\n\n//# sourceURL=webpack:///./src/bramble/src/bramble/sound.js?'
        )

        /***/
      },

    /***/ './src/bramble/src/bramble/sprite.js':
      /*!*******************************************!*\
  !*** ./src/bramble/src/bramble/sprite.js ***!
  \*******************************************/
      /*! exports provided: default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        eval(
          '__webpack_require__.r(__webpack_exports__);\nfunction create (\n  x = 0,\n  y = 0,\n  width = 0,\n  height = 0,\n  rotation = 0,\n  texture = null,\n  color = \'#ffffff\'\n) {\n  let frames = []\n\n  return {\n    x,\n    y,\n    width,\n    height,\n    rotation,\n    texture,\n    color,\n    frame: 0,\n\n    setFrames: newFrames => {\n      frames = newFrames\n    },\n\n    addFrame: frame => {\n      frames.push(frame)\n    },\n\n    get frames () {\n      return frames\n    },\n\n    get x () {\n      return x\n    },\n\n    set x (newX) {\n      x = newX\n    },\n\n    get y () {\n      return y\n    },\n\n    set y (newY) {\n      y = newY\n    },\n\n    get rotation () {\n      return rotation\n    },\n\n    set rotation (degrees) {\n      rotation = (degrees >= 360)\n        ? 360 - degrees\n        : degrees\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__["default"] = ({\n  create\n});\n\n\n//# sourceURL=webpack:///./src/bramble/src/bramble/sprite.js?'
        )

        /***/
      },

    /***/ './src/bramble/src/bramble/terrain.js':
      /*!********************************************!*\
  !*** ./src/bramble/src/bramble/terrain.js ***!
  \********************************************/
      /*! exports provided: default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        eval(
          '__webpack_require__.r(__webpack_exports__);\nfunction create (name, type, image, tiles) {\n  return {\n    name, \n    type,\n    image,\n    tiles\n  }\n}\n\n/* harmony default export */ __webpack_exports__["default"] = ({\n  create\n});\n\n//# sourceURL=webpack:///./src/bramble/src/bramble/terrain.js?'
        )

        /***/
      },

    /***/ './src/bramble/src/bramble/textbox.js':
      /*!********************************************!*\
  !*** ./src/bramble/src/bramble/textbox.js ***!
  \********************************************/
      /*! exports provided: default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        eval(
          '__webpack_require__.r(__webpack_exports__);\nfunction create (x = 0, y = 0, width = 100, height = 50, text = \'\') {\n  return { x, y, width, height, text }\n}\n\n/* harmony default export */ __webpack_exports__["default"] = ({ create });\n\n\n//# sourceURL=webpack:///./src/bramble/src/bramble/textbox.js?'
        )

        /***/
      },

    /***/ './src/events.js':
      /*!***********************!*\
  !*** ./src/events.js ***!
  \***********************/
      /*! exports provided: onLoaded */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onLoaded", function() { return onLoaded; });\nconst onLoaded = callback =>\n  document.addEventListener(\'DOMContentLoaded\', callback)\n\n\n//# sourceURL=webpack:///./src/events.js?'
        )

        /***/
      },

    /***/ './src/main.js':
      /*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
      /*! no exports provided */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        eval(
          "__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bramble/src/bramble/bramble */ \"./src/bramble/src/bramble/bramble.js\");\n/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./events */ \"./src/events.js\");\n\n\n\n\nconst width = 1400\nconst height = 1000\n\nconst halfWidth = width / 2\nconst halfHeight = height / 2\n\nlet hero = null\n\nlet spritesheet1 = null\nlet spritesheet2 = null\nlet spritesheet3 = null\n\nconst scale = 4\n\nlet tool = 'brush'\n\nconst maxDelay = 2\nlet frameDelay = 2\n\nlet currentTileSet = 1\n\nlet currentLayer = 0\nlet layers = [\n  _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"grid\"].create(10, 10),\n  _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"grid\"].create(10, 10),\n  _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"grid\"].create(10, 10)\n]\n\nconst tileWidth = 8\nconst tileHeight = 8\n\nlet brush = {\n  shape: 'square',\n  size: 1\n}\n\n// Everything within this radius is up for consideration but is not necessarily within the range of our brush\nlet brushRadiusInTiles = 0\nlet brushWidthInTiles = 0\n\n// left, right, top, bottom most edges of the bounding box\nlet l = 0\nlet r = 0\nlet t = 0\nlet b = 0\n\nlet mousePosTile = null\n\nfunction tilePos(grid, x, y) {\n  const tx = Math.floor((x + grid.pos.x) / (tileWidth * scale))\n  const ty = Math.floor((y + grid.pos.y) / (tileHeight * scale))\n\n  const maxX = grid.tiles[0].length\n  const maxY = grid.tiles.length\n\n  return {\n    x: tx >= 0 && tx <= maxX ? tx : maxX,\n    y: ty >= 0 && ty <= maxY ? ty : maxY\n  }\n}\n\nfunction worldPos(tileX, tileY) {\n  return {\n    x: tileX * (tileWidth * scale),\n    y: tileY * (tileHeight * scale)\n  }\n}\n\nfunction distanceBetween(x1, y1, x2, y2) {\n  var a = x1 - x2\n  var b = y1 - y2\n\n  return Math.sqrt(a * a + b * b)\n}\n\nlet highlightedTiles = []\n\nfunction update(delta) {\n  const thisLayer = layers[currentLayer]\n\n  mousePosTile = tilePos(thisLayer, _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"mouse\"].x, _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"mouse\"].y)\n  // console.log(thisLayer, mousePosTile)\n\n  highlightedTiles = []\n\n  if (brush.shape === 'square') {\n    brushWidthInTiles = Math.floor(brush.size / 2)\n\n    l = mousePosTile.x - brushWidthInTiles\n    r = mousePosTile.x + brushWidthInTiles\n\n    t = mousePosTile.y - brushWidthInTiles\n    b = mousePosTile.y + brushWidthInTiles\n\n    for (let y = b; y >= t; y--) {\n      for (let x = l; x <= r; x++) {\n        if (brush.shape === 'square') {\n          highlightedTiles.push({ x, y })\n        }\n      }\n    }\n  }\n\n  if (brush.shape === 'circle') {\n    brushRadiusInTiles = brush.size\n\n    l = mousePosTile.x - brushRadiusInTiles\n    r = mousePosTile.x + brushRadiusInTiles\n\n    t = mousePosTile.y - brushRadiusInTiles\n    b = mousePosTile.y + brushRadiusInTiles\n\n    for (let y = b; y >= t; y--) {\n      for (let x = l; x <= r; x++) {\n        if (brush.shape === 'circle') {\n          let worldp = worldPos(x, y)\n          let result = distanceBetween(\n            mousePosTile.x * tileWidth * scale + (tileWidth * scale) / 2,\n            mousePosTile.y * tileWidth * scale + (tileWidth * scale) / 2,\n            worldp.x + (tileWidth * scale) / 2,\n            worldp.y + (tileHeight * scale) / 2\n          )\n\n          if (result < brush.size * tileWidth * scale) {\n            highlightedTiles.push({ x, y })\n          }\n        }\n      }\n    }\n  }\n\n  // Fills up the section currently highlight with a tileset of your choice\n  const fillHighlighted = function(grid, selected, tileset) {\n    selected.forEach(tile => {\n      if (\n        grid.tiles[tile.y] !== undefined &&\n        grid.tiles[tile.y][tile.x] !== undefined\n      ) {\n        grid.tiles[tile.y][tile.x] = tileset\n      }\n    })\n  }\n\n  if (tool === 'brush') {\n    if (_bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"mouse\"].left.pressed) {\n      fillHighlighted(thisLayer, highlightedTiles, currentTileSet)\n    }\n\n    if (_bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"mouse\"].right.pressed) {\n      fillHighlighted(thisLayer, highlightedTiles, 0)\n    }\n\n    if (_bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"mouse\"].wheel.moved) {\n      switch (_bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"mouse\"].wheel.direction) {\n        case 'up':\n          brush.size++\n          break\n        case 'down':\n          if (brush.size > 1) {\n            brush.size--\n          }\n          break\n\n        default:\n          console.log('neither up nor down somehow')\n      }\n    }\n  }\n\n  if (tool === 'fill') {\n    if (_bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"mouse\"].left.pressed) {\n      // begin filling from current tile\n      floodFill(\n        thisLayer,\n        mousePosTile,\n        thisLayer.tiles[mousePosTile.y][mousePosTile.x],\n        currentTileSet\n      )\n    }\n\n    if (_bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"mouse\"].right.pressed) {\n      // begin filling from current tile\n      floodFill(\n        thisLayer,\n        mousePosTile,\n        thisLayer.tiles[mousePosTile.y][mousePosTile.x],\n        0\n      )\n    }\n  }\n}\n\nfunction floodFill(grid, node, from = 0, to = 0) {\n  if (from === to) {\n    return\n  }\n\n  if (grid.tiles[node.y] !== undefined) {\n    if (grid.tiles[node.y][node.x] !== from) {\n      return\n    }\n\n    grid.tiles[node.y][node.x] = to\n\n    if (grid.tiles[node.y][node.x - 1] !== undefined) {\n      floodFill(grid, { x: node.x - 1, y: node.y }, from, to)\n    }\n\n    if (grid.tiles[node.y][node.x] !== undefined) {\n      floodFill(grid, { x: node.x, y: node.y - 1 }, from, to)\n    }\n\n    if (grid.tiles[node.y][node.x + 1] !== undefined) {\n      floodFill(grid, { x: node.x + 1, y: node.y }, from, to)\n    }\n\n    if (grid.tiles[node.y][node.x] !== undefined) {\n      floodFill(grid, { x: node.x, y: node.y + 1 }, from, to)\n    }\n  }\n}\n\nlet spriteSheets = {}\n\nfunction render() {\n  const thisLayer = layers[currentLayer]\n\n  layers.forEach((layer, i) => {\n    if (i === currentLayer) {\n      _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"graphics\"].shadow(() => {\n        _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"graphics\"].tiles(\n          0,\n          0,\n          layer.tiles,\n          spriteSheets,\n          scale,\n          tileWidth,\n          tileHeight\n        )\n      })\n    } else {\n      _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"graphics\"].tiles(\n        0,\n        0,\n        layer.tiles,\n        spriteSheets,\n        scale,\n        tileWidth,\n        tileHeight\n      )\n    }\n  })\n\n  if (tool === 'brush') {\n    // Highlighted Tiles, the ones the brush will paint to if you click now\n    highlightedTiles.forEach(tile => {\n      _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"graphics\"].square(\n        tile.x * tileWidth * scale,\n        tile.y * tileHeight * scale,\n        tileWidth * scale,\n        {\n          fill: {\n            color: '#669933'\n          }\n        }\n      )\n    })\n\n    // currently highlighted tile\n    _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"graphics\"].square(\n      mousePosTile.x * tileWidth * scale,\n      mousePosTile.y * tileHeight * scale,\n      tileWidth * scale,\n      {\n        fill: {\n          color: '#ff0000'\n        }\n      }\n    )\n\n    if (brush.shape === 'circle') {\n      _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"graphics\"].circle(_bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"mouse\"].x, _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"mouse\"].y, brush.size * tileWidth * scale, {\n        line: {\n          color: '#ffffff',\n          width: 4\n        }\n      })\n    }\n\n    if (brush.shape === 'square') {\n      _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"graphics\"].square(\n        _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"mouse\"].x - (brush.size * tileWidth * scale) / 2,\n        _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"mouse\"].y - (brush.size * tileHeight * scale) / 2,\n        brush.size * tileWidth * scale,\n        {\n          line: {\n            color: '#ffffff',\n            width: 4\n          }\n        }\n      )\n    }\n  }\n\n  // Drawing a visualisation of the Grid\n  if (thisLayer.visible) {\n    _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"graphics\"].dodge(() => {\n      thisLayer.tiles[0].forEach((x, i) => {\n        if (i === 0) {\n          return\n        }\n\n        const from = {\n          x: thisLayer.pos.x + i * thisLayer.tileWidth * scale,\n          y: thisLayer.pos.y\n        }\n        const to = {\n          x: thisLayer.pos.x + i * thisLayer.tileWidth * scale,\n          y:\n            thisLayer.pos.y +\n            thisLayer.tiles.length * thisLayer.tileHeight * scale\n        }\n\n        if (i % thisLayer.divisions === 0) {\n          _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"graphics\"].line(from, to, {\n            width: 1,\n            color: '#666666'\n          })\n        } else {\n          _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"graphics\"].line(from, to, {\n            width: 1,\n            color: '#333333'\n          })\n        }\n      })\n\n      thisLayer.tiles.forEach((y, i) => {\n        if (i === 0) {\n          return\n        }\n\n        const from = {\n          x: thisLayer.pos.x,\n          y: thisLayer.pos.y + i * thisLayer.tileHeight * scale\n        }\n        const to = {\n          x:\n            thisLayer.pos.x +\n            thisLayer.tiles[0].length * thisLayer.tileHeight * scale,\n          y: thisLayer.pos.y + i * thisLayer.tileHeight * scale\n        }\n\n        if (i % thisLayer.divisions === 0) {\n          _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"graphics\"].line(from, to, {\n            width: 1,\n            color: '#666666'\n          })\n        } else {\n          _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"graphics\"].line(from, to, {\n            width: 1,\n            color: '#333333'\n          })\n        }\n      })\n    })\n  }\n\n  // Edges of the Grid\n  _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"graphics\"].rect(\n    thisLayer.pos.x,\n    thisLayer.pos.y,\n    thisLayer.tiles[0].length * thisLayer.tileWidth * scale,\n    thisLayer.tiles.length * thisLayer.tileHeight * scale,\n    {\n      line: {\n        width: 2,\n        color: '#ffffff'\n      }\n    }\n  )\n}\n\nfunction start() {\n  const container = document.getElementById('app-container')\n\n  _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"game\"].attachTo(container)\n  _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"game\"].disableContextMenu()\n  _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"game\"].setSize(width, height)\n  _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"game\"].setSmoothing(false)\n  _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"game\"].setUpdate(update)\n  _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"game\"].setRender(render)\n  _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"game\"].setBackgroundColor('#232323')\n  _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"game\"].start()\n\n  const brushElement = document.querySelector('#brush')\n\n  brushElement.addEventListener('input', e => {\n    brush.size = parseInt(e.target.value)\n  })\n\n  brush.size = brushElement.value\n\n  const terrainElement = document.querySelector('#terrain')\n\n  // Adding the list of imported terrains to the user interface\n  spriteSheets.forEach(sheet => {\n    const option = document.createElement('option')\n    option.text = sheet.name\n    option.value = sheet.type // must be unique! Not currenly enforced\n\n    terrainElement.appendChild(option)\n  })\n\n  terrainElement.addEventListener('change', e => {\n    currentTileSet = parseInt(e.target.value)\n  })\n\n  currentTileSet = parseInt(terrainElement.value)\n\n  const brushShapeElement = document.querySelector('#brush-shape')\n\n  brushShapeElement.addEventListener('change', e => {\n    brush.shape = e.target.value\n  })\n\n  brush.shape = brushShapeElement.value\n\n  const gridDivsElement = document.querySelector('#grid-divs')\n\n  gridDivsElement.addEventListener('input', e => {\n    layers.forEach(layer => {\n      layer.divisions = parseInt(e.target.value)\n    })\n  })\n\n  layers.forEach(layer => {\n    layer.divisions = gridDivsElement.value\n  })\n\n  const gridXElement = document.querySelector('#grid-x')\n  const gridYElement = document.querySelector('#grid-y')\n\n  gridXElement.addEventListener('change', e => {\n    layers.forEach(layer => {\n      layer.pos.x = parseInt(gridXElement.value)\n      layer.pos.y = parseInt(gridYElement.value)\n    })\n  })\n\n  gridYElement.addEventListener('change', e => {\n    layers.forEach(layer => {\n      layer.pos.x = parseInt(gridXElement.value)\n      layer.pos.y = parseInt(gridYElement.value)\n    })\n  })\n\n  layers.forEach(layer => {\n    layer.pos.x = parseInt(gridXElement.value)\n    layer.pos.y = parseInt(gridYElement.value)\n  })\n\n  const gridWidthElement = document.querySelector('#grid-width')\n  const gridHeightElement = document.querySelector('#grid-height')\n\n  const copyGrid = function(grid, width, height) {\n    const copy = grid.tiles.slice()\n\n    grid = _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"grid\"].create(width, height, {\n      pos: { x: 0, y: 0 },\n      visible: true,\n      divisions: parseInt(gridDivsElement.value),\n      tileWidth,\n      tileHeight\n    })\n\n    copy.forEach((y, yi) => {\n      copy[yi].forEach((x, xi) => {\n        if (grid.tiles[yi] !== undefined && grid.tiles[yi][xi] !== undefined) {\n          grid.tiles[yi][xi] = x\n        }\n      })\n    })\n\n    return grid\n  }\n\n  const gridToggleElement = document.querySelector('#grid-toggle')\n\n  gridWidthElement.addEventListener('input', e => {\n    for (let i = 0; i < layers.length; i++) {\n      layers[i] = copyGrid(\n        layers[i],\n        parseInt(e.target.value),\n        parseInt(gridHeightElement.value)\n      )\n    }\n  })\n\n  gridHeightElement.addEventListener('input', e => {\n    for (let i = 0; i < layers.length; i++) {\n      layers[i] = copyGrid(\n        layers[i],\n        parseInt(gridWidthElement.value),\n        parseInt(e.target.value)\n      )\n    }\n  })\n\n  gridWidthElement.addEventListener('change', e => {\n    layers.forEach(layer => {\n      layer.visible = gridToggleElement.checked\n    })\n  })\n\n  gridHeightElement.addEventListener('change', e => {\n    layers.forEach(layer => {\n      layer.visible = gridToggleElement.checked\n    })\n  })\n\n  for (let i = 0; i < layers.length; i++) {\n    layers[i] = _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"grid\"].create(\n      gridWidthElement.value,\n      gridHeightElement.value,\n      {\n        pos: { x: 0, y: 0 },\n        visible: true,\n        divisions: parseInt(gridDivsElement.value),\n        tileWidth,\n        tileHeight\n      }\n    )\n  }\n\n  gridToggleElement.addEventListener('change', e => {\n    layers.forEach(layer => {\n      layer.visible = e.target.checked\n    })\n  })\n\n  layers.forEach(layer => {\n    layer.visible = gridToggleElement.checked\n  })\n\n  const toolElement = document.querySelector('#tool')\n\n  toolElement.addEventListener('change', e => {\n    tool = e.target.value\n  })\n\n  tool = toolElement.value\n\n  const layersElement = document.querySelector('#layers')\n\n  const renderedLayers = layers\n    .map((layer, i) => drawLayer(`Layer ${i + 1}`))\n    .join('')\n\n  layersElement.innerHTML = renderedLayers\n}\n\nfunction loadTiles() {\n  Promise.all([\n    _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"assets\"].loadTerrain('terrain/default.json'),\n    _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"assets\"].loadTerrain('terrain/green-hills.json'),\n    _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"assets\"].loadTerrain('terrain/variants.json'),\n    _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"assets\"].loadTerrain('terrain/big.json'),\n    _bramble_src_bramble_bramble__WEBPACK_IMPORTED_MODULE_0__[\"assets\"].loadTerrain('terrain/stone.json')\n  ])\n    .then(terrain => {\n      spriteSheets = terrain\n      start()\n    })\n    .catch(err => {\n      console.error(err)\n    })\n}\n\nObject(_events__WEBPACK_IMPORTED_MODULE_1__[\"onLoaded\"])(() => {\n  loadTiles()\n})\n\n\n//# sourceURL=webpack:///./src/main.js?"
        )

        /***/
      }

    /******/
  }
)
