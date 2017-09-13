const shader = require('raw-loader!glslify!./spaceShader.frag')

import Planet from './planet/planet'
import PlanetGlow from './planet/planet-glow'
import Sun from './sun/sun'
import Sky from './sky/sky'
import Player from './player/player'

interface ISpaceUniforms {
  screenSize: any
  time: any
  grainRand: any
}

export default class Space extends Phaser.State {
  private _player: Player
  private _sky: Sky
  private _sun: Sun
  private _planets: Planet[]
  private _planetGlow: PlanetGlow[]

  private _spaceGroup: Phaser.Group
  private _spaceShader: Phaser.Filter
  private _spaceShaderUniforms: ISpaceUniforms
  private _renderTexture: Phaser.RenderTexture
  private _outputSprite: Phaser.Sprite

  public create(): void {
    this.game.world.setBounds(0, 0, 2000, 2000)
    this.physics.startSystem(Phaser.Physics.P2JS)

    this._spaceGroup = new Phaser.Group(this.game)

    this._sky = new Sky(this.game)
    // this._spaceGroup.add(this._sky)
    this.game.add.existing(this._sky)

    this._sun = new Sun(this.game, 200, 0, 100)
    // this._spaceGroup.add(this._sun)

    this._planetGlow = []
    this._planets = []

    this._planetGlow.push(new PlanetGlow(this.game, 140, 200, 230))
    this._planets.push(new Planet(this.game, 140, 200, 200))

    this._planetGlow.push(new PlanetGlow(this.game, 600, 200, 180))
    this._planets.push(new Planet(this.game, 600, 200, 150))

    this._planetGlow.push(new PlanetGlow(this.game, 1000, 1000, 300))
    this._planets.push(new Planet(this.game, 1000, 1000, 270))

    for (const planetGlow of this._planetGlow) {
      // this._spaceGroup.add(planetGlow)
      this.game.add.existing(planetGlow)
    }

    for (const planet of this._planets) {
      // this._spaceGroup.add(planet)
      this.game.add.existing(planet)
    }

    this._player = new Player(this.game, this._planets)
    // this._spaceGroup.add(this._player)
    this.game.add.existing(this._player)

    this.game.camera.flash(0x000000, 1000)

    this._spaceShaderUniforms = {
      screenSize: { type: '2f', value: { x: this.game.width, y: this.game.height }},
      time: { type: '1f', value: this.game.time.time / 10000 },
      grainRand: { type: '2f', value: { x: 2.0 * (Math.random() - 0.5), y: 2.0 * (Math.random() - 0.5) }},
    }
    this._spaceShader = new Phaser.Filter(this.game, this._spaceShaderUniforms, shader)
    this.game.world.filters = [this._spaceShader]

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

    for (const planetGlow of this._planetGlow) {
      planetGlow.refresh(this._sun.position)
    }

    this._sky.refresh(new Phaser.Point(this._sun.position.x, this._sun.position.y))

    this._spaceShaderUniforms.time.value = this.game.time.time / 10000
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
