import * as Assets from '../../../assets'
const shader = require('raw-loader!glslify!./sunShader.frag')

interface ISunUniforms {
  sunSize: any
  sunPosition: any
}

export default class Sun extends Phaser.Sprite {
  private _uniforms: ISunUniforms

  constructor(game: Phaser.Game, x: number, y: number, radius: number) {
    super(game, x, y)
    this.width = radius
    this.height = radius
    // this.anchor.set(0.5, 0.5)

    this._uniforms = {
      sunSize: { type: '1f', value: radius },
      sunPosition: { type: '3f', value: {x, y, z: 0.0 } },
    }

    const sunShader = new Phaser.Filter(this.game, this._uniforms, shader)
    sunShader.setResolution(radius, radius)
    this.filters = [sunShader]
  }

  public update() {
    console.log(this.position.x)
  }
}