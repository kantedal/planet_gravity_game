import * as Assets from '../assets'

export default class Gameover extends Phaser.State {
  private googleFontText: Phaser.Text

  public create(): void {
    this.googleFontText = this.game.add.text(this.game.width / 2, this.game.height / 2, 'GAME OVER', {
      font: '100px ' + Assets.GoogleWebFonts.LibreBarcode39ExtendedText
    })
    this.googleFontText.anchor.setTo(0.5)
    this.googleFontText.addColor('#ffffff', 0)

    this.game.camera.flash(0x000000, 1000)
  }
}
