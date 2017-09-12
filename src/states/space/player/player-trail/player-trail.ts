const shader = require('raw-loader!glslify!./playerTrailShader.frag')
import * as Assets from '../../../../assets'

interface IPlayerTrailUniforms {
  screenSize: any
  shuttlePosition: any
}

export default class PlayerTrail extends Phaser.Group {
  private _trailSprite: Phaser.Sprite
  private _outputSprite: Phaser.Sprite
  private _renderTextures: Phaser.RenderTexture[]
  private _currentTexture: number = 0

  private _shader: Phaser.Filter
  private _uniforms: IPlayerTrailUniforms

  constructor(game: Phaser.Game) {
    super(game)
    // this.width = this.game.width
    // this.height = this.game.height

    this._renderTextures = []
    this._renderTextures.push(this.game.add.renderTexture(this.game.width, this.game.height, 'trailRenderTexture1'))
    this._renderTextures.push(this.game.add.renderTexture(this.game.width, this.game.height, 'trailRenderTexture2'))

    this._trailSprite = this.game.make.sprite(0, 0)
    this._trailSprite.width = this.game.width
    this._trailSprite.height = this.game.height


    this._uniforms = {
      screenSize: { type: '2f', value: { x: this.game.width, y: this.game.height } },
      shuttlePosition: { type: '2f', value: { x: 0.0, y: 0.0 } },
    }

    this._shader = new Phaser.Filter(this.game, this._uniforms, shader)
    this._shader.setResolution(this.game.width, this.game.height)
    this._trailSprite.filters = [ this._shader ]

    this._outputSprite = new Phaser.Sprite(game, 0, 0, this._renderTextures[0])
    this._outputSprite.width = this.game.width
    this._outputSprite.height = this.game.height
    this.add(this._outputSprite)
  }

  public update() {

  }

  public refresh(shuttlePosition: Phaser.Point) {
    // Swap buffers
    const temp = this._renderTextures[0]
    this._renderTextures[0] = this._renderTextures[1]
    this._renderTextures[1] = temp

    //

    this._uniforms.shuttlePosition.value = { x: shuttlePosition.x, y: shuttlePosition.y }
    this._shader.syncUniforms()

    // const newTextureIndex = Math.abs(this._currentTexture - 1)
    this._trailSprite.setTexture(this._renderTextures[0])
    this._trailSprite.width = this.game.width
    this._trailSprite.height = this.game.height

    // this._renderTextures[0].width = this.game.width
    // this._renderTextures[0].width = this.game.width
    // this._renderTextures[1].height = this.game.height
    // this._renderTextures[1].height = this.game.height

    this._renderTextures[1].renderXY(this._trailSprite, 0, 0, true)

    this._outputSprite.setTexture(this._renderTextures[1])


    //   this._currentTexture = Math.abs(this._currentTexture - 1)
  //
  //   this._trailSprite.setTexture(this._renderTextures[this._currentTexture])
  //   this._outputSprite.setTexture(this._renderTextures[this._currentTexture])
  }

}