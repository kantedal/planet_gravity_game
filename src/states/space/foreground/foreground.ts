const shader = require('raw-loader!glslify!./foregroundShader.glsl')

interface IForegroundUniforms {
  screenSize: any
  cameraPosition: any
  scale: any
  time: any
  offset: any
}

export default class Foreground extends Phaser.Sprite {
  private _startTime: number
  private _shader: Phaser.Filter
  private _uniforms: IForegroundUniforms

  constructor(game: Phaser.Game, private _parallaxFactor: number, scale: number) {
    super(game, 0, 0)
    this.width = game.width
    this.height = game.height
    this.fixedToCamera = true

    this._startTime = this.game.time.time / 50000

    this._uniforms = {
      screenSize: { type: '2f', value: { x: game.width, y: game.height } },
      cameraPosition: { type: '2f', value: { x: this.game.camera.x, y: this.game.camera.y }},
      scale: { type: '1f', value: scale },
      time: { type: '1f', value: this.game.time.time / 10000 },
      offset: { type: '2f', value: { x: Math.random() * 1000, y: Math.random() * 1000 }}
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

  public refresh() {
    this._uniforms.cameraPosition.value = { x: this.game.camera.x * this._parallaxFactor, y: this.game.camera.y * this._parallaxFactor }
    this._uniforms.time.value = this.game.time.time / 50000 - this._startTime
    this._shader.syncUniforms()
  }
}