import * as Assets from '../../../assets'
const glsl = require('glslify')
const shader = require('raw-loader!glslify!./planetGlowShader.frag')

interface IPlanetGlowUniforms {
  planetPosition: any
  planetSize: any
  sunPosition: any
  screenSize: any
}

export default class PlanetGlow extends Phaser.Sprite {
  private _shader: Phaser.Filter
  private _uniforms: IPlanetGlowUniforms

  constructor(game: Phaser.Game, x: number, y: number, radius: number) {
    super(game, x, y, Assets.Images.ImagesBackgroundTemplate.getName())
    this.width = radius
    this.height = radius
    this.anchor.set(0.5, 0.5)

    this._uniforms = {
      planetPosition: { type: '3f', value: {x, y: this.game.height - y, z: 0.0 } },
      planetSize: { type: '1f', value: radius },
      sunPosition: { type: '3f', value: { x: 200.0, y: this.game.height - this.game.height, z: 0.0 } },
      screenSize: { type: '2f', value: { x: this.game.width , y: this.game.height }}
    }

    this._shader = new Phaser.Filter(this.game, this._uniforms, shader)
    this._shader.setResolution(radius, radius)
    this.filters = [ this._shader ]
  }

  public refresh(sunPosition: Phaser.Point) {
    this._uniforms.sunPosition.value = { x: sunPosition.x, y: sunPosition.y, z: 100.0 }
    this._shader.syncUniforms()
  }
}