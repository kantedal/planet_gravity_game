import Victor = require('victor')
import * as Assets from '../assets';
import * as Physics from '../physics/physics'

export default class PhysicsTest extends Phaser.State {
  private physicsEngine: Physics.Engine
  private physicsBox: Physics.BoxShape
  private boxShader: Phaser.Filter
  private box: Phaser.Sprite
  private ground: Phaser.Graphics

  public create(): void {
    this.physicsEngine = new Physics.Engine()
    this.physicsBox = new Physics.BoxShape(new Victor(0, 0), new Victor(1, 1), 1.0)
    this.physicsEngine.addRigidBody(this.physicsBox)

    this.boxShader = new Phaser.Filter(this.game, null, this.game.cache.getShader('boxShader'))
    this.boxShader.setResolution(50, 50)

    this.box = this.game.add.sprite(100, 100, Assets.Images.ImagesSquareTest.getName())
    this.box.anchor.set(0.5)
    this.box.width = 50
    this.box.height = 50
    //this.box.filters = [ this.boxShader ]



    this.ground = this.game.add.graphics(0, 0)
    this.ground.pivot.x = 400
    this.ground.pivot.y = 50

    this.ground.beginFill(0x333333)
    this.ground.drawRect(0, 0, 800, 100)
    this.ground.endFill()


    // this.game.add.existing(this.box)
    this.game.camera.flash(0x000000, 1000)
  }

  public update(): void {
    this.boxShader.update()
  }

  public render(): void {
    this.physicsEngine.run()

    this.box.position.x = this.physicsBox.position.x + 100
    this.box.position.y = -this.physicsBox.position.y
    this.box.angle = this.physicsBox.angle

    this.ground.position.set(400, 600)
  }
}
