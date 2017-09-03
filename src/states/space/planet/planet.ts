import * as Assets from '../../../assets'
const glsl = require('glslify')
const shader = require('raw-loader!glslify!./planetShader.frag')

interface IPlanetUniforms {
  planetPosition: any
  planetSize: any
  sunPosition: any
}

export default class Planet extends Phaser.Sprite {
  private _shader: Phaser.Filter
  private _uniforms: IPlanetUniforms

  constructor(game: Phaser.Game, x: number, y: number, radius: number) {
    super(game, x, y, Assets.Images.ImagesBackgroundTemplate.getName())
    this.width = radius
    this.height = radius

    this._uniforms = {
      planetPosition: { type: '3f', value: {x, y: this.game.height - y, z: 0.0 } },
      planetSize: { type: '1f', value: radius },
      sunPosition: { type: '3f', value: { x: 200.0, y: this.game.height - this.game.height, z: 0.0 } },
    }

    this._shader = new Phaser.Filter(this.game, this._uniforms, shader)
    this._shader.setResolution(radius, radius)
    this.filters = [ this._shader ]
  }

  public refresh(sunPosition: Phaser.Point) {
    this._uniforms.sunPosition.value = { x: sunPosition.x, y: this.game.height - sunPosition.y, z: 100.0 }
    this._shader.syncUniforms()
  }
}