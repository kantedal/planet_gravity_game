// const shader = require('raw-loader!glslify!./skyShader.frag')
import * as Assets from '../../../assets'
import PlayerTrail from './player-trail/player-trail'
import Planet from '../planet/planet'
import {IBulletData} from '../../../socket'

interface ISkyUniforms {
  screenSize: any
  sunPosition: any
}

export default class Player extends Phaser.Group {
  private _isInitialized: boolean
  private _cursors: Phaser.CursorKeys
  private _spaceShuttle: Phaser.Sprite
  private _spaceShuttleTrail: PlayerTrail
  private _crosshair: Phaser.Sprite
  private _gravityArrow: Phaser.Sprite

  private _shader: Phaser.Filter
  private _uniforms: ISkyUniforms

  private _lastPosition: Phaser.Point
  private _velocity: Phaser.Point

  private _fuel: number = 100
  private _health: number = 100

  private _bullets: any
  private _bulletsData: IBulletData[]
  private _totalBulletsCount: number = 50
  private _aliveBulletsCount: number = 0

  private _fireRate: number = 5
  private _nextFire: number = 0

  private _score: number = 0

  constructor(game: Phaser.Game, private _planets: Planet[]) {
    super(game)
    
    this._isInitialized = false
    
    // this._spaceShuttle.body.allowRotation = false
    // this._spaceShuttleTrail = new PlayerTrail(this.game)
    

    this._crosshair = new Phaser.Sprite(this.game, 100, 100, Assets.Images.ImagesCrosshair.getName())
    this._crosshair.width = 50
    this._crosshair.height = 50
    this._crosshair.alpha = 0.35
    this._crosshair.angle = 45
    this._crosshair.anchor.setTo(0.5, 0.5)
    this.game.add.existing(this._crosshair)

    // this._spaceShuttle.addChildAt(this._spaceShuttleTrail, 0)
    // this.add(this._spaceShuttleTrail)
    this.game.input.mouse.capture = true
    this.game.input.mspointer.stop()
  }

  public initialize() {
    this._spaceShuttle = new Phaser.Sprite(this.game, 300, 300, Assets.Images.ImagesSpaceShuttle.getName())
    this._spaceShuttle.width = 25
    this._spaceShuttle.height = 25
    this._spaceShuttle.anchor.set(0.5, 1.0)
    this.game.physics.p2.enable(this._spaceShuttle)
    this._spaceShuttle.body.damping = 0.5

    this._lastPosition = new Phaser.Point(300, 300)
    this._velocity = new Phaser.Point(0, 0)
    this.game.camera.follow(this._spaceShuttle, Phaser.Camera.FOLLOW_LOCKON, 0.05, 0.05)
    this.game.physics.p2.restitution = 0.0
    this._cursors = this.game.input.keyboard.createCursorKeys()

    this.game.add.existing(this._spaceShuttle)

    this._gravityArrow = new Phaser.Sprite(this.game, 32, 32, Assets.Images.ImagesArrow.getName())
    this._gravityArrow.width = 32
    this._gravityArrow.height = 32
    this._gravityArrow.alpha = 0.4
    this._gravityArrow.anchor.setTo(0.5, 0.0)
    this._spaceShuttle.addChild(this._gravityArrow)

    this._bulletsData = []
    this._bullets = this.game.add.group()
    this._bullets.enableBody = true
    this._bullets.physicsBodyType = Phaser.Physics.P2JS
    this._bullets.createMultiple(this._totalBulletsCount, Assets.Images.ImagesFire1.getName())
    let bulletIndex = 0
    this._bullets.forEach((bullet: Phaser.Sprite) => {
      bullet.width = 10
      bullet.height = 10
      bullet.body.setCircle(3)
      bullet.lifespan = 3000
      bullet.data.index = bulletIndex++

      this._bulletsData.push({
        position: [0, 0],
        force: 0
      })
    })

    this._isInitialized = true
  }

  public update() {
    this._crosshair.position.x = this.game.camera.x + this.game.input.mousePointer.x
    this._crosshair.position.y = this.game.camera.y + this.game.input.mousePointer.y

    if (this._isInitialized) {
      this._velocity = this._spaceShuttle.position.clone().subtract(this._lastPosition.x, this._lastPosition.y)
      // velocity.normalize()
      const moveAngle = Math.atan2(this._velocity.y, this._velocity.x)
      this._spaceShuttle.body.rotation = moveAngle + Math.PI / 2.0
  
      this._lastPosition.set(this._spaceShuttle.position.x, this._spaceShuttle.position.y)
  
      const angle = Math.atan2(this._crosshair.y - this._spaceShuttle.y, this._crosshair.x - this._spaceShuttle.x)
      const moveDirection = new Phaser.Point(Math.cos(angle), Math.sin(angle))
  
      // Accelerate
      if (this.game.input.activePointer.leftButton.isDown && this._fuel > 0.15) {
        this._spaceShuttle.body.force.x += moveDirection.x * 150
        this._spaceShuttle.body.force.y += moveDirection.y * 150
  
        this._spaceShuttle.body.velocity.x += moveDirection.x * 5.0
        this._spaceShuttle.body.velocity.y += moveDirection.y * 5.0
  
        this._fuel -= (0.15 ) 

        this._score += 1    
      }
      else {
        this._spaceShuttle.body.force.x = moveDirection.x * 75
        this._spaceShuttle.body.force.y = moveDirection.y * 75
  
        this._fuel += 0.02
      }

  
      this._fuel = Math.max(0, Math.min(this._fuel, 100))
  
      // Shoot
      if (this.game.input.keyboard.addKey(32).isDown) {
        if (this.game.time.now > this._nextFire && this._bullets.countDead() > 0) {
          this._nextFire = this.game.time.now + this._fireRate
          const bullet = this._bullets.getFirstDead()
          const bulletDirection = this._velocity.clone().normalize()
          // this._crosshair.position.clone().subtract(
          //   this._spaceShuttle.position.x + 30 * (Math.random() - 0.5),
          //   this._spaceShuttle.position.y + 30 * (Math.random() - 0.5)
          // ).normalize() // velocity.clone().normalize()
  
          bullet.reset(this._spaceShuttle.x + bulletDirection.x * 20, this._spaceShuttle.y + bulletDirection.y * 20)
          bullet.body.velocity.x = bulletDirection.x * 400
          bullet.body.velocity.y = bulletDirection.y * 400
          bullet.alpha = 1.0
          bullet.lifespan = 3000
        }
      }
  
      for (const planet of this._planets) {
        const planetGravity = planet.calculateGravityForce(this._spaceShuttle.position)
        this._spaceShuttle.body.force.x += planetGravity.x
        this._spaceShuttle.body.force.y += planetGravity.y
  
        this._bullets.forEachAlive((bullet: Phaser.Sprite) => {
          const planetGravity = planet.calculateGravityForce(bullet.position)
          bullet.body.force.x += 3.0 * planetGravity.x
          bullet.body.force.y += 3.0 * planetGravity.y
        })
      }
  
      this._aliveBulletsCount = 0
      this._bullets.forEachAlive((bullet: Phaser.Sprite, i) => {
        bullet.alpha *= 0.985
        this._bulletsData[bullet.data.index] = { position: [bullet.position.x, bullet.position.y], force: bullet.alpha }
        this._aliveBulletsCount++
      })
    }
  }

  public refresh(sunPosition: Phaser.Point) {}

  get spaceShuttle() { return this._spaceShuttle }
  get velocity() { return this._velocity }
  get fuel() { return this._fuel }
  set fuel(fuel: number) { this._fuel = fuel }
  get bulletsData() { return this._bulletsData }
  get aliveBulletsCount(): number { return this._aliveBulletsCount }
  get totalBulletsCount(): number { return this._totalBulletsCount }
  get health(): number { return this._health }
  set health(value: number) { this._health = value }
  get score() { return this._score }
}