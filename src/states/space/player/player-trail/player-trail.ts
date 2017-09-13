const shader = require('raw-loader!glslify!./playerTrailShader.frag')
import * as Assets from '../../../../assets'

interface IPlayerTrailUniforms {
  screenSize: any
  shuttlePosition: any
}

export default class PlayerTrail extends Phaser.Group {
  private _emitter: any

  constructor(game: Phaser.Game) {
    super(game)

    this._emitter = game.add.emitter(game.world.centerX, game.world.centerY, 1000)
    this._emitter.makeParticles( [ Assets.Images.ImagesFire1.getName() ] )
    this._emitter.gravity = 0
    this._emitter.setAlpha(1, 0, 500)
    this._emitter.setScale(0.08, 0.0, 0.08, 0.0, 500)

    this._emitter.start(false, 3000, 5)
  }


  public refresh(shuttlePosition: Phaser.Point) {
    this._emitter.minParticleSpeed.set(-1.0, 1.0)
    this._emitter.maxParticleSpeed.set(-1.0, 1.0)

    this._emitter.emitX = shuttlePosition.x
    this._emitter.emitY = shuttlePosition.y
  }

}