import Planet from './planet/planet'

export default class Space extends Phaser.State {

  public create(): void {
    const background = this.game.add.sprite(0, 0)
    background.width = this.game.width
    background.height = this.game.height

    const boxShader = new Phaser.Filter(this.game, null, this.game.cache.getShader('skyShader'))
    boxShader.setResolution(this.game.width, this.game.height)
    background.filters = [boxShader]

    const planet = new Planet(this.game, 100, 100, 200)
    this.game.add.existing(planet)
    this.game.camera.flash(0x000000, 1000)
  }

  public update(): void {

  }

  public render(): void {

  }
}
