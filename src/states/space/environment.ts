import Foreground from './foreground/foreground'
import SkyLayer from './sky-layer/sky-layer'
import Sky from './sky-background/sky'
import Sun from './sun/sun'
import Planet from './planet/planet'
const spaceShader = require('raw-loader!glslify!./spaceShader.frag')
const chromaticShader = require('raw-loader!glslify!./shaders/chromatic-aberration.glsl')

interface ISpaceUniforms {
  screenSize: any
  time: any
  grainRand: any
}

export default class Environment {
  private _skyBackground: Sky
  private _skyLayer1: SkyLayer
  private _skyLayer2: SkyLayer
  private _sun: Sun
  private _planets: Planet[]
  private _foregroundLayer1: Foreground
  private _foregroundLayer2: Foreground
  private _spaceGroup: Phaser.Group
  private _spaceShader: Phaser.Filter
  private _spaceShaderUniforms: ISpaceUniforms
  private _chromaticShader: Phaser.Filter
  private _chromaticShaderUniforms: any
  private _renderTexture: Phaser.RenderTexture
  private _outputSprite: Phaser.Sprite

  constructor(public game: Phaser.Game) {
    this._planets = []

    this._spaceGroup = new Phaser.Group(this.game)

    this._skyBackground = new Sky(this.game)
    this.game.add.existing(this._skyBackground)

    this._skyLayer1 = new SkyLayer(this.game, 0.8, 75)
    this._skyLayer2 = new SkyLayer(this.game, 0.9, 50)
    this.game.add.existing(this._skyLayer1)
    this.game.add.existing(this._skyLayer2)

    this._sun = new Sun(this.game, 200, 0, 100)
    // this.game.add.existing(this._sun)

    this._spaceShaderUniforms = {
      screenSize: { type: '2f', value: { x: this.game.width, y: this.game.height }},
      time: { type: '1f', value: this.game.time.now },
      grainRand: { type: '2f', value: { x: 2.0 * (Math.random() - 0.5), y: 2.0 * (Math.random() - 0.5) }},
    }
    this._spaceShader = new Phaser.Filter(this.game, this._spaceShaderUniforms, spaceShader)

    this._chromaticShaderUniforms = {
      screenSize: { type: '2f', value: { x: this.game.width, y: this.game.height }},
      time: { type: '1f', value: this.game.time.now },
    }
    this._chromaticShader = new Phaser.Filter(this.game, this._chromaticShaderUniforms, chromaticShader)

    this.game.world.filters = [this._spaceShader, this._chromaticShader]

  }

  update(time: number, camera: Phaser.Camera) {
    this._sun.position.x = 400 + 400 * Math.cos(time)
    this._sun.position.y = 300 + 300 * Math.sin(time)

    this._skyBackground.refresh(new Phaser.Point(this._sun.position.x, this._sun.position.y))
    this._skyLayer1.refresh(new Phaser.Point(this._sun.position.x, this._sun.position.y))
    this._skyLayer2.refresh(new Phaser.Point(this._sun.position.x, this._sun.position.y))
    this._foregroundLayer1.refresh()
    this._foregroundLayer2.refresh()

    this._spaceShaderUniforms.time.value = this.game.time.now * 0.001
    this._spaceShaderUniforms.grainRand.value = { x: 2.0 * (Math.random() - 0.5), y: 2.0 * (Math.random() - 0.5) }
    this._spaceShader.syncUniforms()

    this._chromaticShaderUniforms.time.value = this.game.time.now * 0.0005
    this._chromaticShader.syncUniforms()

    // if (this._renderTexture) {
    //   this._renderTexture.renderXY(this.game.world, camera.x, camera.y, true)
    //   this._outputSprite.setTexture(this._renderTexture)
    //   this._outputSprite.position.set(-camera.x, -camera.y)
    // }

    for (const planet of this._planets) {
      planet.refresh(this._sun.position)
    }
  }

  initPlanets(planetData: { [planetId: string]: any }) {

    for (const planetId in planetData) {
      const planet = planetData[planetId]
      this._planets.push(new Planet(this.game, planet.position[0], planet.position[1], planet.radius, planetId))
    }

    for (const planet of this._planets) {
      this.game.add.existing(planet)
    }

    this._foregroundLayer1 = new Foreground(this.game, 1.1, 0.6)
    this._foregroundLayer2 = new Foreground(this.game, 1.3, 0.4)
    this.game.add.existing(this._foregroundLayer1)
    this.game.add.existing(this._foregroundLayer2)
  }


  get sun(): Sun { return this._sun }
  get planets(): Planet[] { return this._planets }
}