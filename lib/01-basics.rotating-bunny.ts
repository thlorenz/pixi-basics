import * as P from 'pixi.js'
import bunnyUrl from './assets/bunny.url'

export default class Game {
  private _app : P.Application

  constructor(app : P.Application) {
    this._app = app
  }

  start() : void {
    const bunny = P.Sprite.fromImage(bunnyUrl)
    bunny.anchor.set(0.5)
    bunny.x = this._app.screen.width / 2
    bunny.y = this._app.screen.height / 2
    bunny.scale.x = 5
    bunny.scale.y = 5

    this._app.stage.addChild(bunny)
    this._app.ticker.add(delta => {
      bunny.rotation += 0.05 * delta
      bunny.skew.x += 0.01 * delta
      bunny.skew.y += 0.01 * delta
    })
  }
}
