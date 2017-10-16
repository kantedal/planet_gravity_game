import Player from './player/player'
import * as Assets from '../../assets'

export default class PlayerHud extends Phaser.Group {
  private _fuelBarSprite: Phaser.Sprite
  private _fuelBarFrameSprite: Phaser.Sprite
  private _fuelText: Phaser.Text

  private _healthBarSprite: Phaser.Sprite
  private _healthFrameSprite: Phaser.Sprite
  private _healthText: Phaser.Text

  private _ammoBarSprite: Phaser.Sprite
  private _ammoFrameSprite: Phaser.Sprite
  private _ammoText: Phaser.Text

  constructor(game: Phaser.Game, private _player: Player) {
    super(game)
    const xPos = 10

    this._fuelBarSprite = this.game.add.sprite(xPos, 40, Assets.Atlases.AtlasesPreloadSpritesArray.getName(), Assets.Atlases.AtlasesPreloadSpritesArray.Frames.PreloadBar)
    this._fuelBarSprite.anchor.setTo(0, 0.5)
    this._fuelBarSprite.fixedToCamera = true
    this._fuelBarSprite.alpha = 0.25

    this._fuelBarFrameSprite = this.game.add.sprite(xPos, 40, Assets.Atlases.AtlasesPreloadSpritesArray.getName(), Assets.Atlases.AtlasesPreloadSpritesArray.Frames.PreloadFrame)
    this._fuelBarFrameSprite.anchor.setTo(0, 0.5)
    this._fuelBarFrameSprite.fixedToCamera = true
    this._fuelBarFrameSprite.alpha = 0.25

    this._fuelText = this.game.add.text(xPos + this._fuelBarSprite.width * 0.5, 40, 'FUEL', { font: '35px ' + Assets.GoogleWebFonts.LibreBarcode39ExtendedText })
    this._fuelText.anchor.setTo(0.5)
    this._fuelText.addColor('#ffffff', 0)
    this._fuelText.alpha = 0.6
    this._fuelText.fixedToCamera = true

    this._healthBarSprite = this.game.add.sprite(xPos, 100, Assets.Atlases.AtlasesPreloadSpritesArray.getName(), Assets.Atlases.AtlasesPreloadSpritesArray.Frames.PreloadBar)
    this._healthBarSprite.anchor.setTo(0, 0.5)
    this._healthBarSprite.fixedToCamera = true
    this._healthBarSprite.alpha = 0.25

    this._healthFrameSprite = this.game.add.sprite(xPos, 100, Assets.Atlases.AtlasesPreloadSpritesArray.getName(), Assets.Atlases.AtlasesPreloadSpritesArray.Frames.PreloadFrame)
    this._healthFrameSprite.anchor.setTo(0, 0.5)
    this._healthFrameSprite.fixedToCamera = true
    this._healthFrameSprite.alpha = 0.25

    this._healthText = this.game.add.text(xPos + this._healthBarSprite.width * 0.5, 100, 'HEALTH', { font: '35px ' + Assets.GoogleWebFonts.LibreBarcode39ExtendedText })
    this._healthText.anchor.setTo(0.5)
    this._healthText.addColor('#ffffff', 0)
    this._healthText.alpha = 0.6
    this._healthText.fixedToCamera = true

    this._ammoBarSprite = this.game.add.sprite(xPos, 160, Assets.Atlases.AtlasesPreloadSpritesArray.getName(), Assets.Atlases.AtlasesPreloadSpritesArray.Frames.PreloadBar)
    this._ammoBarSprite.anchor.setTo(0, 0.5)
    this._ammoBarSprite.fixedToCamera = true
    this._ammoBarSprite.alpha = 0.25

    this._ammoFrameSprite = this.game.add.sprite(xPos, 160, Assets.Atlases.AtlasesPreloadSpritesArray.getName(), Assets.Atlases.AtlasesPreloadSpritesArray.Frames.PreloadFrame)
    this._ammoFrameSprite.anchor.setTo(0, 0.5)
    this._ammoFrameSprite.fixedToCamera = true
    this._ammoFrameSprite.alpha = 0.25

    this._ammoText = this.game.add.text(xPos + this._ammoBarSprite.width * 0.5, 160, 'AMMO', { font: '35px ' + Assets.GoogleWebFonts.LibreBarcode39ExtendedText })
    this._ammoText.anchor.setTo(0.5)
    this._ammoText.addColor('#ffffff', 0)
    this._ammoText.alpha = 0.6
    this._ammoText.fixedToCamera = true
  }

  public update() {
    this._fuelBarSprite.scale.set(this._player.fuel / 100, 1.0)
    this._ammoBarSprite.scale.set((this._player.totalBulletsCount - this._player.aliveBulletsCount) / this._player.totalBulletsCount, 1.0)
    this._healthBarSprite.scale.set(this._player.health / 100, 1.0)
  }
}