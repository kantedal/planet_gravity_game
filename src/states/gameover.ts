import * as Assets from '../assets'

export default class Gameover extends Phaser.State {
  private _gameOverText: Phaser.Text
  private _scoreText: Phaser.Text

  public create(params): void {
    this._gameOverText = this.game.add.text(this.game.width / 2, this.game.height / 2 - 60, 'GAME OVER', {
      font: '100px ' + Assets.GoogleWebFonts.LibreBarcode39ExtendedText
    })
    this._gameOverText.anchor.setTo(0.5)
    this._gameOverText.addColor('#ffffff', 0)

    this.game.camera.flash(0x000000, 1000)
  }

  public init(params) {
    this._gameOverText = this.game.add.text(this.game.width / 2, this.game.height / 2 + 60, 'SCORE ' + params.score , {
      font: '100px ' + Assets.GoogleWebFonts.LibreBarcode39ExtendedText
    })
    this._gameOverText.anchor.setTo(0.5)
    this._gameOverText.addColor('#ffffff', 0)
  }
}
