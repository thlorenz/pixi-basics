import * as P from 'pixi.js'

function maybeLoad(url : string, onloaded : Function) : void {
  // There seems to be no way to cleanly dispose all loaded resources
  // even via dispose calls.
  // Thus during hot reloading we may try to reload an already loaded resource.
  // If that was the case we can safely continue.
  try {
    P.loader
      .add(url)
      .load(onloaded)
  } catch (err) {
    if (/^Resource named .+ already exists/.test(err.message)) {
      onloaded()
    } else {
      console.error(err.toString())
    }
  }
}

export default class Game {
  _app : P.Application
  _centerX: number
  _centerY: number

  constructor(app : P.Application) {
    this._app = app
    this._centerX = this._app.screen.width / 2
    this._centerY = this._app.screen.height / 2
  }

  start() : void {
    maybeLoad('fighter.json', this._onassetsLoaded.bind(this))
  }

  _onassetsLoaded() {
    const frames : P.Texture[] = []

    for (let i =0; i < 30; i++) {
      const id = i < 10 ? '0' + i : '' + i
      const texture = P.Texture.fromFrame(`rollSequence00${id}.png`)
      frames.push(texture)
    }

    const anim = new P.extras.AnimatedSprite(frames)
    anim.x = this._centerX
    anim.y = this._centerY
    anim.anchor.set(0.5)
    anim.animationSpeed = 0.5
    anim.play()

    this._app.stage.addChild(anim)
    this._app.ticker.add(() => (anim.rotation += 0.01))
  }

  dispose() {
    this._app.stage.destroy(true)
    this._app.destroy(true, true)
  }
}
