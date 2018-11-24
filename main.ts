import Game from './lib/04-click.bunny'
import * as P from 'pixi.js'

// See npm run start:server inside package.json
P.loader.baseUrl = 'http://localhost:1235/'

const CANVAS_WIDTH : number = 700
const CANVAS_HEIGHT : number = 600

window.addEventListener('DOMContentLoaded', initGame)

let game : Game
function removeExistingGame() : void {
  if (game != null) game.dispose()
  const els = document.body.children
  if (els.length > 0) document.body.removeChild(els.item(0) as Node)
}

function init() : P.Application {
  removeExistingGame()
  const app = new P.Application(
      CANVAS_WIDTH
    , CANVAS_HEIGHT
    , { backgroundColor: 0x1099bb }
  )
  document.body.appendChild(app.view)
  return app
}

function initGame() : void {
  const app = init()
  game = new Game(app)
  game.start()
}

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept(function accept() {
    initGame()
  })
}
