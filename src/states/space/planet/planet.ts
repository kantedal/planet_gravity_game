import * as Assets from '../../../assets'

export default class Planet extends Phaser.Sprite {
  constructor(game: Phaser.Game, x: number, y: number, radius: number) {
    super(game, x, y)
    this.width = radius
    this.height = radius

    // this.blendMode = PIXI.blendModes.ADD

    const planetShader = new Phaser.Filter(this.game, null, this.game.cache.getShader('planetShader'))
    planetShader.setResolution(2000, 2000)
    this.filters = [planetShader]

    planetShader.update()

    console.log('planet created')
  }
}