
export class Rectangle extends Phaser.Graphics {
  private rect: Phaser.Graphics

  constructor(game: Phaser.Game, width: number, height: number) {
    super(game, 0, 0)
    this.game.add.graphics(0, 0)

    this.beginFill(0x555555)
    this.drawRect(400, 200, width, height)
    this.pivot = new Phaser.Point(width / 2, height / 2)
  }
}