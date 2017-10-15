import 'p2'
import 'pixi'
import 'phaser'

import * as WebFontLoader from 'webfontloader'

import Boot from './states/boot'
import Preloader from './states/preloader'
import Title from './states/title'
import * as Utils from './utils/utils'
import * as Assets from './assets'
import PhysicsTest from './states/physics-test'
import Space from './states/space/space'

class App extends Phaser.Game {
  constructor(config: Phaser.IGameConfig) {
    super (config)

    this.state.add('boot', Boot)
    this.state.add('preloader', Preloader)
    this.state.add('title', Title)
    this.state.add('physicsTest', PhysicsTest)
    this.state.add('space', Space)

    this.state.start('boot')
  }
}

function startApp(): void {
  let gameWidth: number = window.innerWidth
  let gameHeight: number = window.innerHeight

  document.addEventListener('contextmenu', event => event.preventDefault())

  if (SCALE_MODE === 'USER_SCALE') {
    let screenMetrics: Utils.ScreenMetrics = Utils.ScreenUtils.calculateScreenMetrics(gameWidth, gameHeight)

    gameWidth = screenMetrics.gameWidth
    gameHeight = screenMetrics.gameHeight
  }

// There are a few more options you can set if needed, just take a look at Phaser.IGameConfig
  let gameConfig: Phaser.IGameConfig = {
    width: gameWidth,
    height: gameHeight,
    renderer: Phaser.AUTO,
    parent: '',
    antialias: true,
    resolution: 1
  };

  let app = new App(gameConfig)
}

window.onload = () => {
  let webFontLoaderOptions: any = null
  const webFontsToLoad: string[] = GOOGLE_WEB_FONTS

  if (webFontsToLoad.length > 0) {
    webFontLoaderOptions = (webFontLoaderOptions || {})

    webFontLoaderOptions.google = {
      families: webFontsToLoad
    }
  }

  if (Object.keys(Assets.CustomWebFonts).length > 0) {
    webFontLoaderOptions = (webFontLoaderOptions || {})

    webFontLoaderOptions.custom = {
      families: [],
      urls: []
    };

    for (let font in Assets.CustomWebFonts) {
      webFontLoaderOptions.custom.families.push(Assets.CustomWebFonts[font].getFamily())
      webFontLoaderOptions.custom.urls.push(Assets.CustomWebFonts[font].getCSS())
    }
  }

  if (webFontLoaderOptions === null) {
    startApp()
  }
  else {
    webFontLoaderOptions.active = startApp
    WebFontLoader.load(webFontLoaderOptions)
  }
};
