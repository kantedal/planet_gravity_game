import {IPlayerData} from '../../../socket'
import * as Assets from '../../../assets'
import Player from './player'

export default class OpponentPlayer extends Phaser.Group {

  private _playerId: string
  private _spaceShuttle: Phaser.Sprite
  private _bullets: any
  private _totalBulletsCount: number = 50

  constructor(game: Phaser.Game, playerData: IPlayerData, private mainPlayer: Player) {
    super(game)
    this._playerId = playerData.id

    this._spaceShuttle = new Phaser.Sprite(this.game, 300, 300, Assets.Images.ImagesSpaceShuttle.getName())
    this._spaceShuttle.width = 25
    this._spaceShuttle.height = 25
    this._spaceShuttle.anchor.set(0.5, 0.5)
    this.game.add.existing(this._spaceShuttle)

    this._bullets = this.game.add.group()
    // this._bullets.enableBody = true
    // this._bullets.physicsBodyType = Phaser.Physics.P2JS
    this._bullets.createMultiple(this._totalBulletsCount, Assets.Images.ImagesFire1.getName())
    this._bullets.forEach((bullet: Phaser.Sprite) => {
      bullet.width = 10
      bullet.height = 10
      bullet.alpha = 1.0
      bullet.anchor.set(0.5)
      // bullet.body.static = true
      bullet.position.set(0, 0)
      bullet.reset(0, 0)
    })
  }

  public refresh(playerData: IPlayerData) {
    this._spaceShuttle.position.set(playerData.position[0], playerData.position[1])

    const moveAngle = Math.atan2(playerData.velocity[0], playerData.velocity[1])
    this._spaceShuttle.rotation = -moveAngle + Math.PI

    let bulletIndex = 0
    this._bullets.forEach((bullet: Phaser.Sprite) => {
      if (playerData.bullets[bulletIndex]) {
        const force = playerData.bullets[bulletIndex].force
        if (force !== 0) {
          const position = playerData.bullets[bulletIndex].position
          bullet.position.set(position[0], position[1])
          bullet.alpha = force

          if (bullet.position.distance(this.mainPlayer.spaceShuttle.position) < 10) {
            this.mainPlayer.health = Math.max(0, this.mainPlayer.health - 3 * force)
          }
        }
        else {
          bullet.alpha = 0.0
        }
      }
      bulletIndex++
    })

    // this._bullets.forEachAlive((bullet) => {
    //   console.log('alive bullet')
    // })
  }

  get spaceShuttle(): Phaser.Sprite { return this._spaceShuttle }
  get bullets(): any { return this._bullets }
  get playerId(): string { return this._playerId }
}