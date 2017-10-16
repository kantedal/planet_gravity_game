import * as Assets from '../../assets'

export default class FuelTank {

  private _fuelTankSprite: Phaser.Sprite

  constructor(public game: Phaser.Game, private _id: string, position: number[]) {
    this._fuelTankSprite = new Phaser.Sprite(this.game, position[0], position[1], Assets.Images.ImagesFueltank.getName())
    this._fuelTankSprite.width = 15
    this._fuelTankSprite.height = 15
    this._fuelTankSprite.anchor.set(0.5, 0.5)
    this._fuelTankSprite.alpha = 0.5

    this.game.add.existing(this._fuelTankSprite)
  }

  get fuelTankSprite(): Phaser.Sprite {
    return this._fuelTankSprite
  }
}