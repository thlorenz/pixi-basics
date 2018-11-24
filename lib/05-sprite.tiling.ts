import * as P from 'pixi.js'

interface GameOpts {
  RESOURCE_URL : string
}

export default class Game {
  _app : P.Application
  _resourceUrl: string

  constructor(app : P.Application, { RESOURCE_URL } : GameOpts) {
    this._app = app
    this._resourceUrl = RESOURCE_URL
  }

  start() : void {
    const texture = P.Texture.fromImage(`${this._resourceUrl}/p2.jpeg`)
    const tilingSprite = new P.extras.TilingSprite(
        texture
      , this._app.screen.width
      , this._app.screen.height
    )
    this._app.stage.addChild(tilingSprite)

    let count = 0
    this._app.ticker.add(() => {
      count += 0.005
      tilingSprite.tileScale.x = 2 + Math.sin(count)
      tilingSprite.tileScale.y = 2 + Math.cos(count)

      tilingSprite.tilePosition.x += 1
      tilingSprite.tilePosition.y += 1
    })
  }

  dispose() {
    this._app.stage.destroy(true)
    this._app.destroy(true, true)
  }
}
