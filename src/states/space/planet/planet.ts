import * as Assets from '../../../assets'

interface IPlanetUniforms {
  planetPosition: any
  planetSize: any
  sunPosition: any
}

export default class Planet extends Phaser.Sprite {
  private _uniforms: any

  constructor(game: Phaser.Game, x: number, y: number, radius: number) {
    super(game, x, y, Assets.Images.ImagesBackgroundTemplate.getName())
    this.width = radius
    this.height = radius

    this._uniforms = {
      planetPosition: { type: '3f', value: {x, y, z: 0.0 } },
      planetSize: { type: '1f', value: radius },
      sunPosition: { type: '3f', value: { x: 0.0, y: 0.0, z: 0.0 } },
    }

    const planetShader = new Phaser.Filter(this.game, this._uniforms, this.game.cache.getShader('planetShader'))
    planetShader.setResolution(radius, radius)
    this.filters = [planetShader]

    planetShader.update()
  }

  public update() {

  }
}