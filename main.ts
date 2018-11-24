import Game from './lib/02-container.bunny-column'
import * as P from 'pixi.js'

const CANVAS_WIDTH : number = 700
const CANVAS_HEIGHT : number = 600

window.addEventListener('DOMContentLoaded', initGame)

function removeExistingGame() : void {
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
  const game = new Game(app)
  game.start()
}

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept(function accept() {
    initGame()
  })
}
