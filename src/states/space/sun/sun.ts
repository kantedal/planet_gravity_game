const shader = require('raw-loader!glslify!./sunShader.frag')

interface ISunUniforms {
  sunSize: any
  sunPosition: any
  cameraPosition: any
  screenSize: any
}

export default class Sun extends Phaser.Sprite {
  private _shader: Phaser.Filter
  private _uniforms: ISunUniforms

  constructor(game: Phaser.Game, x: number, y: number, radius: number) {
    super(game, x, y)
    this.width = radius
    this.height = radius
    // this.anchor.set(0.5, 0.5)

    this._uniforms = {
      sunSize: { type: '1f', value: radius },
      sunPosition: { type: '3f', value: {x, y, z: 0.0 } },
      cameraPosition: { type: '3f', value: { x: this.game.camera.x, y: this.game.camera.y, z: 500 }},
      screenSize: { type: '2f', value: { x: this.game.width , y: this.game.height }}
    }

    this._shader = new Phaser.Filter(this.game, this._uniforms, shader)
    this._shader.setResolution(radius, radius)
    this.filters = [ this._shader ]
  }

  public update() {
    this._uniforms.sunPosition.value = { x: this.position.x, y: this.position.y, z: -100.0 }
    this._uniforms.cameraPosition.value = { x: this.game.camera.x, y: this.game.camera.y, z: 500.0 }
    this._shader.syncUniforms()
  }
}