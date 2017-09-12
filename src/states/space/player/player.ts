// const shader = require('raw-loader!glslify!./skyShader.frag')
import * as Assets from '../../../assets'
import PlayerTrail from './player-trail/player-trail'

interface ISkyUniforms {
  screenSize: any
  sunPosition: any
}

export default class Player extends Phaser.Group {
  private _spaceShuttle: Phaser.Sprite
  private _spaceShuttleTrail: PlayerTrail

  private _shader: Phaser.Filter
  private _uniforms: ISkyUniforms

  constructor(game: Phaser.Game) {
    super(game)

    this._spaceShuttleTrail = new PlayerTrail(this.game)
    this.add(this._spaceShuttleTrail)

    this._spaceShuttle = new Phaser.Sprite(this.game, 300, 300, Assets.Images.ImagesSpaceShuttle.getName())
    this._spaceShuttle.width = 15
    this._spaceShuttle.height = 15
    this._spaceShuttle.anchor.set(0.5, 0.5)

    this.game.physics.enable(this._spaceShuttle, Phaser.Physics.ARCADE)
    this._spaceShuttle.body.allowRotation = false

    this.add(this._spaceShuttle)
  }

  public update() {
    this._spaceShuttle.rotation = this.game.physics.arcade.moveToPointer(this._spaceShuttle, 10, this.game.input.activePointer, 1000) + Math.PI / 2
    this._spaceShuttleTrail.refresh(this._spaceShuttle.position)
  }

  public refresh(sunPosition: Phaser.Point) {
    this._uniforms.sunPosition.value = { x: sunPosition.x, y: sunPosition.y, z: 100.0 }
    this._shader.syncUniforms()
  }
}