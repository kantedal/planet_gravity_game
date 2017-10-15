import SkyLayer from './sky-layer/sky-layer'
const shader = require('raw-loader!glslify!./spaceShader.frag')

import Planet from './planet/planet'
import PlanetGlow from './planet/planet-glow'
import Sun from './sun/sun'
import Sky from './sky-background/sky'
import Player from './player/player'
import Foreground from './foreground/foreground'

interface ISpaceUniforms {
  screenSize: any
  time: any
  grainRand: any
}

export default class Space extends Phaser.State {
  private _player: Player
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
  private _renderTexture: Phaser.RenderTexture
  private _outputSprite: Phaser.Sprite

  public create(): void {
    this.game.world.setBounds(0, 0, 1200, 1200)
    this.physics.startSystem(Phaser.Physics.P2JS)
    this.physics.startSystem(Phaser.Physics.ARCADE)

    this._spaceGroup = new Phaser.Group(this.game)

    this._skyBackground = new Sky(this.game)
    this.game.add.existing(this._skyBackground)

    this._skyLayer1 = new SkyLayer(this.game, 0.8, 75)
    this._skyLayer2 = new SkyLayer(this.game, 0.9, 50)
    this.game.add.existing(this._skyLayer1)
    this.game.add.existing(this._skyLayer2)

    this._sun = new Sun(this.game, 200, 0, 100)
    this.game.add.existing(this._sun)

    this._planets = []

    this._planets.push(new Planet(this.game, 400, 700, 200))
    this._planets.push(new Planet(this.game, 600, 200, 150))
    this._planets.push(new Planet(this.game, 1000, 1000, 270))
    this._planets.push(new Planet(this.game, 1000, 300, 200))
    // this._planets.push(new Planet(this.game, 1800, 300, 200))
    // this._planets.push(new Planet(this.game, 1700, 1700, 220))
    // this._planets.push(new Planet(this.game, 1500, 700, 300))

    for (const planet of this._planets) {
      this.game.add.existing(planet)
    }

    this._player = new Player(this.game, this._planets)
    this.game.add.existing(this._player)

    this.game.camera.flash(0x000000, 1000)

    this._spaceShaderUniforms = {
      screenSize: { type: '2f', value: { x: this.game.width, y: this.game.height }},
      time: { type: '1f', value: this.game.time.time / 10000 },
      grainRand: { type: '2f', value: { x: 2.0 * (Math.random() - 0.5), y: 2.0 * (Math.random() - 0.5) }},
    }
    this._spaceShader = new Phaser.Filter(this.game, this._spaceShaderUniforms, shader)
    this.game.world.filters = [this._spaceShader]

    this._foregroundLayer1 = new Foreground(this.game, 1.1, 0.6)
    this._foregroundLayer2 = new Foreground(this.game, 1.3, 0.4)
    this.game.add.existing(this._foregroundLayer1)
    this.game.add.existing(this._foregroundLayer2)

    // this._renderTexture = this.game.add.renderTexture(this.game.width, this.game.height, 'texture1')
    // this._outputSprite = this.game.add.sprite(0, 0)
    // this._outputSprite.fixedToCamera = true
    // this._outputSprite.filters = [ this._spaceShader ]

    // this.game.add.existing(this._spaceShader)

    // this.game.add.existing(this._player)

    // this.game.add.sprite(0, 0,  Assets.Images.ImagesSpaceShuttle.getName())
    // this.game.add.filter('spaceShader', shader)
  }

  public update(): void {
    // this._spaceGroup.fixedToCamera = true
    // this._spaceGroup.position.set(this.game.camera.x, -this.game.camera.y)

    const time = this.time.time / 5000
    this._sun.position.x = 400 + 400 * Math.cos(time)
    this._sun.position.y = 300 + 300 * Math.sin(time)

    for (const planet of this._planets) {
      planet.refresh(this._sun.position)
    }

    this._skyBackground.refresh(new Phaser.Point(this._sun.position.x, this._sun.position.y))
    this._skyLayer1.refresh(new Phaser.Point(this._sun.position.x, this._sun.position.y))
    this._skyLayer2.refresh(new Phaser.Point(this._sun.position.x, this._sun.position.y))
    this._foregroundLayer1.refresh()
    this._foregroundLayer2.refresh()

    this._spaceShaderUniforms.time.value = this.game.time.time / 10000 - 150532758
    this._spaceShaderUniforms.grainRand.value = { x: 2.0 * (Math.random() - 0.5), y: 2.0 * (Math.random() - 0.5) }
    this._spaceShader.syncUniforms()

    if (this._renderTexture) {
      this._renderTexture.renderXY(this.game.world, this.camera.x, this.camera.y, true)
      this._outputSprite.setTexture(this._renderTexture)
      this._outputSprite.position.set(-this.camera.x, -this.camera.y)
    }

  }

  public render(): void {
  }
}
