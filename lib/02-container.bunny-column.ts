import * as P from 'pixi.js'
import bunnyUrl from './assets/bunny.url'

export default class Game {
  _app : P.Application
  _centerX: number
  _centerY: number

  constructor(app : P.Application) {
    this._app = app
    this._centerX = this._app.screen.width / 2
    this._centerY = this._app.screen.height / 2
    console.log(this._app.renderer.width)
    console.log(this._app.renderer.height)
  }

  start() : void {
    const texture = P.Texture.fromImage(bunnyUrl)

    const container = new P.Container()
    this._app.stage.addChild(container)

    for (let i = 0; i < 25; i++) {
      const bunny = new P.Sprite(texture)
      bunny.anchor.set(0.5)
      bunny.x = (i % 5) * 40
      bunny.y = Math.floor(i / 5) * 40
      container.addChild(bunny)
    }

    container.x = this._centerX
    container.y = this._centerY

    // Pivot
    container.pivot.x = container.width / 2
    container.pivot.y = container.height / 2
    this._app.ticker.add(delta => (container.rotation -= 0.01 * delta))
  }
}
