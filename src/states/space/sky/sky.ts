const shader = require('raw-loader!glslify!./skyShader.frag')

interface ISkyUniforms {
  screenSize: any
  sunPosition: any
  cameraPosition: any
}

export default class Sky extends Phaser.Sprite {
  private _shader: Phaser.Filter
  private _uniforms: ISkyUniforms

  constructor(game: Phaser.Game) {
    super(game, 0, 0)
    this.width = game.width
    this.height = game.height
    this.fixedToCamera = true

    this._uniforms = {
      screenSize: { type: '2f', value: { x: game.width, y: game.height } },
      sunPosition: { type: '3f', value: {x: 0.0, y: 0.0, z: 0.0 } },
      cameraPosition: { type: '2f', value: { x: this.game.camera.x, y: this.game.camera.y }}
    }

    this._shader = new Phaser.Filter(this.game, this._uniforms, shader)
    this._shader.setResolution(game.width, game.height)
    this.filters = [ this._shader ]
  }

  public update() {
    // this.cameraOffset.set(this.game.camera.x, this.game.camera.y)
    // this.position.set(this.game.camera.x, this.game.camera.y)
    // console.log('update sky')
  }

  public refresh(sunPosition: Phaser.Point) {
    this._uniforms.sunPosition.value = { x: sunPosition.x, y: sunPosition.y, z: -100.0 }
    this._uniforms.cameraPosition.value = { x: this.game.camera.x * 0.1, y: this.game.camera.y * 0.1 }
    this._shader.syncUniforms()
  }
}