// const shader = require('raw-loader!glslify!./skyShader.frag')
import * as Assets from '../../../assets'
import PlayerTrail from './player-trail/player-trail'
import Planet from '../planet/planet'

interface ISkyUniforms {
  screenSize: any
  sunPosition: any
}

export default class Player extends Phaser.Group {
  private _cursors: Phaser.CursorKeys
  private _spaceShuttle: Phaser.Sprite
  private _spaceShuttleTrail: PlayerTrail
  private _crosshair: Phaser.Sprite

  private _shader: Phaser.Filter
  private _uniforms: ISkyUniforms

  private _lastPosition: Phaser.Point

  constructor(game: Phaser.Game, private _planets: Planet[]) {
    super(game)

    this._spaceShuttle = new Phaser.Sprite(this.game, 300, 300, Assets.Images.ImagesSpaceShuttle.getName())
    this._spaceShuttle.width = 15
    this._spaceShuttle.height = 15
    this._spaceShuttle.anchor.set(0.5, 1.0)
    this.game.physics.p2.enable(this._spaceShuttle)
    this._spaceShuttle.body.damping = 0.5

    this._lastPosition = new Phaser.Point(300, 300)

    // this.game.physics.enable(this._spaceShuttle, Phaser.Physics.ARCADE)
    this.game.camera.follow(this._spaceShuttle, Phaser.Camera.FOLLOW_LOCKON, 0.05, 0.05)
    this.game.physics.p2.restitution = 0.0
    this._cursors = this.game.input.keyboard.createCursorKeys()

    // this._spaceShuttle.body.allowRotation = false
    // this._spaceShuttleTrail = new PlayerTrail(this.game)
    this.game.add.existing(this._spaceShuttle)

    this._crosshair = new Phaser.Sprite(this.game, 100, 100, Assets.Images.ImagesCrosshair.getName())
    // this._crosshair.fixedToCamera = true
    this._crosshair.width = 30
    this._crosshair.height = 30
    this._crosshair.alpha = 0.35
    this._crosshair.angle = 45
    this._crosshair.anchor.setTo(0.5, 0.5)
    this.game.add.existing(this._crosshair)

    // this._spaceShuttle.addChildAt(this._spaceShuttleTrail, 0)
    // this.add(this._spaceShuttleTrail)
  }

  public update() {
    this._crosshair.position.x = this.game.camera.x + (this.game.width - this.game.input.mousePointer.x)
    this._crosshair.position.y = this.game.camera.y + (this.game.height - this.game.input.mousePointer.y)

    const velocity = this._spaceShuttle.position.clone().subtract(this._lastPosition.x, this._lastPosition.y)
    // velocity.normalize()
    const moveAngle = Math.atan2(velocity.y, velocity.x)
    this._spaceShuttle.body.rotation = moveAngle + Math.PI / 2.0


    this._lastPosition.set(this._spaceShuttle.position.x, this._spaceShuttle.position.y)

    const speed = 400
    const angle = Math.atan2(this._crosshair.y - this._spaceShuttle.y, this._crosshair.x - this._spaceShuttle.x)

    if (this.game.input.activePointer.leftButton.isDown) {
      this._spaceShuttle.body.force.x = Math.cos(angle) * speed
      this._spaceShuttle.body.force.y = Math.sin(angle) * speed
    }

    const maxPlanetAttraction = 500
    const maxDistanceFromPlanet = 200
    for (const planet of this._planets) {
      const distanceToPlanet = Phaser.Point.distance(this._spaceShuttle, planet.planetPosition) - planet.radius
      const angle = Math.atan2(planet.planetPosition.y - this._spaceShuttle.y, planet.planetPosition.x - this._spaceShuttle.x)

      const gravityInfluence = maxPlanetAttraction * Math.max(Math.min((maxDistanceFromPlanet - distanceToPlanet) / maxDistanceFromPlanet, 1.0), 0.0)
      // console.log(gravityInfluence)
      this._spaceShuttle.body.force.x += Math.cos(angle) * gravityInfluence
      this._spaceShuttle.body.force.y += Math.sin(angle) * gravityInfluence
    }

    // this._spaceShuttleTrail.refresh(this._spaceShuttle.position)
  }

  public refresh(sunPosition: Phaser.Point) {
  }
}