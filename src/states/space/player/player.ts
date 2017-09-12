// const shader = require('raw-loader!glslify!./skyShader.frag')
import * as Assets from '../../../assets'
import PlayerTrail from './player-trail/player-trail'

interface ISkyUniforms {
  screenSize: any
  sunPosition: any
}

export default class Player extends Phaser.Group {
  private _cursors: Phaser.CursorKeys
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
    // this._spaceShuttle.anchor.set(0.5, 0.5)

    // this.game.physics.enable(this._spaceShuttle, Phaser.Physics.ARCADE)
    this.game.physics.p2.enable(this._spaceShuttle)
    this.game.camera.follow(this._spaceShuttle, Phaser.Camera.FOLLOW_LOCKON, 0.05, 0.05)
    this.game.physics.p2.restitution = 0.2
    this._cursors = this.game.input.keyboard.createCursorKeys()

    // this._spaceShuttle.body.allowRotation = false

    this.add(this._spaceShuttle)
  }

  public update() {

    if (this._cursors.left.isDown) {
      this._spaceShuttle.body.rotateLeft(100)
    }
    else if (this._cursors.right.isDown) {
      this._spaceShuttle.body.rotateRight(100)
    }
    else {
      this._spaceShuttle.body.setZeroRotation()
    }

    if (this._cursors.up.isDown) {
      this._spaceShuttle.body.thrust(100)
    }
    else if (this._cursors.down.isDown) {
      this._spaceShuttle.body.reverse(100)
    }

    // this._spaceShuttle.rotation = this.game.physics.arcade.moveToPointer(this._spaceShuttle, 10, this.game.input.activePointer, 1000) + Math.PI / 2
    // this._spaceShuttleTrail.refresh(this._spaceShuttle.position)
  }

  public refresh(sunPosition: Phaser.Point) {
  }
}