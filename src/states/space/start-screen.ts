import * as Assets from '../../assets'

export interface IStartScreenListener {
  startGame: () => void
}

export default class StartScreen {
  private _startScreenGroup: Phaser.Group
  private _titleText: Phaser.Text
  private _descriptionText: Phaser.Text

  private _spaceInstructions: Phaser.Text
  private _spaceClickSprite: Phaser.Sprite
  private _mouseClickInstructions: Phaser.Text
  private _mouseClickSprite: Phaser.Sprite
  private _startButton: Phaser.Sprite

  constructor(private _game: Phaser.Game, private _startScreenListener: IStartScreenListener) {
    this._startScreenGroup = new Phaser.Group(this._game)    
  }

  public init() {
    this._titleText = new Phaser.Text(this._game, this._game.width * 0.5, this._game.height * 0.30, 'PLANET GRAVITY GAME', { font: '80px ' + Assets.GoogleWebFonts.LibreBarcode39ExtendedText })
    this._titleText.anchor.set(0.5)
    this._titleText.addColor('#ffffff', 0)
    this._startScreenGroup.addChild(this._titleText)

    const descriptionText = 'Collect points by eliminating your opponents and stay alive. Make sure you do not run out of fuel by collecting the fuel tanks placed around the planets.'
    this._descriptionText = new Phaser.Text(this._game, this._game.width * 0.5, this._game.height * 0.40, descriptionText, { font: '20px ' + Assets.GoogleWebFonts.SpaceMono})
    this._descriptionText.anchor.set(0.5, 0.0)
    this._descriptionText.addColor('#ffffff', 0)
    this._descriptionText.wordWrap = true
    this._descriptionText.wordWrapWidth = this._game.width * 0.7
    this._descriptionText.align = 'center'
    this._descriptionText.alpha = 0.5
    this._startScreenGroup.addChild(this._descriptionText)

    const keyInstructionHeight = 0.55
    const keyImagesHeight = 0.63

    this._spaceInstructions = new Phaser.Text(this._game, this._game.width * 0.3, this._game.height * keyInstructionHeight, 'Click space to fire!', { font: '20px ' + Assets.GoogleWebFonts.SpaceMono})
    this._spaceInstructions.anchor.set(0.5)
    this._spaceInstructions.addColor('#ffffff', 0)
    this._spaceInstructions.wordWrap = true
    this._spaceInstructions.wordWrapWidth = this._game.width * 0.7
    this._spaceInstructions.align = 'center'
    this._spaceInstructions.alpha = 0.5
    this._startScreenGroup.addChild(this._spaceInstructions)

    this._spaceClickSprite = new Phaser.Sprite(this._game, 300, 300, Assets.Images.ImagesSpace.getName())
    this._spaceClickSprite.position.set(this._game.width * 0.3, this._game.height * keyImagesHeight)
    this._spaceClickSprite.anchor.set(0.5)
    this._spaceClickSprite.scale.set(0.4)
    this._spaceClickSprite.alpha = 0.6
    this._startScreenGroup.addChild(this._spaceClickSprite)

    this._mouseClickInstructions = this._game.add.text(this._game.width * 0.7, this._game.height * keyInstructionHeight, 'Left mouse click to accelerate!', { font: '20px ' + Assets.GoogleWebFonts.SpaceMono})
    this._mouseClickInstructions.anchor.set(0.5)
    this._mouseClickInstructions.addColor('#ffffff', 0)
    this._mouseClickInstructions.wordWrap = true
    this._mouseClickInstructions.wordWrapWidth = this._game.width * 0.7
    this._mouseClickInstructions.align = 'center'
    this._mouseClickInstructions.alpha = 0.5
    this._startScreenGroup.addChild(this._mouseClickInstructions)

    this._mouseClickSprite = new Phaser.Sprite(this._game, 300, 300, Assets.Images.ImagesMouseClick.getName())
    this._mouseClickSprite.position.set(this._game.width * 0.7, this._game.height * keyImagesHeight)
    this._mouseClickSprite.anchor.set(0.5)
    this._mouseClickSprite.scale.set(0.25)
    this._mouseClickSprite.alpha = 0.6    
    this._startScreenGroup.addChild(this._mouseClickSprite)

    this._startButton = new Phaser.Sprite(this._game, 300, 300, Assets.Images.ImagesStartgame.getName())
    this._startButton.anchor.set(0.5)
    this._startButton.alpha = 0.6
    this._startButton.scale.set(0.5)
    this._startButton.position.set(this._game.width * 0.5, this._game.height * 0.8)
    this._startButton.inputEnabled = true
    this._startButton.events.onInputDown.add(() => this._startScreenListener.startGame(), this)
    this._startButton.events.onInputOver.add(() => this._startButton.alpha = 0.3, this)
    this._startButton.events.onInputUp.add(() => this._startButton.alpha = 0.6, this)
    this._startButton.events.onInputOut.add(() => this._startButton.alpha = 0.6, this)
    this._startScreenGroup.addChild(this._startButton)

    this._game.add.existing(this._startScreenGroup)  
  }

  public hide() {
    this._game.add.tween(this._startScreenGroup).to({ alpha: 0.0 }, 1000, 'Sine.easeInOut', true)
    setTimeout(() => this._startScreenGroup.destroy(), 1000)
  }

}