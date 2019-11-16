# Bramble

A little game engine for jamming on prototypes.

__This is not yet intended for public use__


## Example

This is just some example code, it's what's sitting in my test game project at the moment. I'll update it periodically and add some real docs when it's time.

```js
import {
  game,
  graphics,
  keyboard,
  mouse,
  assets,
  music,
  sfx,
  sprite
} from './bramble/bramble'

import { onLoaded } from './events'

const width = 640
const height = 360

const halfWidth = width / 2
const halfHeight = height / 2

let hero = null

const frameMax = 7
let frameCount = frameMax

function update (delta) {
  if (mouse.pressed) {
    hero.width = 32 * 2
    hero.height = 32 * 2
  } else {
    hero.width = 32 * 4
    hero.height = 32 * 4
  }

  if (frameCount > 0) {
    frameCount--
  } else {
    frameCount = frameMax

    if (hero.frame < 4) {
      hero.frame ++
    } else {
      hero.frame = 0
    }
  }

  hero.x = mouse.x - hero.width / 2
  hero.y = mouse.y - hero.height / 2
}

function render () {
  graphics.rect(0, 0, halfWidth, halfHeight, '#232323')
  graphics.rect(halfWidth, 0, halfWidth, halfHeight, '#333333')
  graphics.rect(halfWidth, halfHeight, halfWidth, halfHeight, '#232323')
  graphics.rect(0, halfHeight, halfWidth, halfHeight, '#333333')

  graphics.subImage(
    hero.x,
    hero.y,
    hero.width,
    hero.height,
    hero.frames[hero.frame].x,
    hero.frames[hero.frame].y,
    hero.frames[hero.frame].width,
    hero.frames[hero.frame].height,
    hero.texture
  )

  graphics.text(
    10,
    30,
    `Hero: ${JSON.stringify(hero)}`,
    '#ffffff',
    '12pt sans-serif'
  )
}

function start () {
  const container = document.getElementById('app-container')
  game.attachTo(container)

  game.disableContextMenu()
  game.setSize(width, height)
  game.setSmoothing(false)
  game.setUpdate(update)
  game.setRender(render)

  game.start()
}

function load () {
  Promise.all([
    assets.loadImage('images/big.png').then(img => {
      hero = sprite.create(0, 0, 32, 32, 0, img)
      hero.setFrames([
        { x: 0, y: 0, width: 32, height: 32 },
        { x: 32, y: 0, width: 32, height: 32 },
        { x: 64, y: 0, width: 32, height: 32 },
        { x: 96, y: 0, width: 32, height: 32 },
        { x: 128, y: 0, width: 32, height: 32 }
      ])
    })
  ]).then(() => start())
    .catch(err => console.error(err))
}

onLoaded(() => {
  load()
})
```

## Authors

  + [Erik Watson](http://erikwatson.me)
