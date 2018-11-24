import * as P from 'pixi.js'
import bunnyUrl from './assets/bunny.url'

export default class Game {
  private _app : P.Application

  constructor(app : P.Application) {
    this._app = app
    P.settings.SCALE_MODE = P.SCALE_MODES.NEAREST
  }

  start() : void {
    const bunny = P.Sprite.fromImage(bunnyUrl)
    bunny.anchor.set(0.5)
    bunny.x = this._app.screen.width / 2
    bunny.y = this._app.screen.height / 2

    bunny.interactive = true
    bunny.buttonMode = true

    bunny.on('pointerdown', () => {
      bunny.scale.x *= 1.25
      bunny.scale.y *= 1.25
    })

    this._app.stage.addChild(bunny)
  }

  dispose() {
    this._app.stage.destroy(true)
    this._app.destroy(true, true)
  }
}
