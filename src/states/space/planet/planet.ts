import * as Assets from '../../../assets'
const glsl = require('glslify')
const shader = require('raw-loader!glslify!./planetShader.frag')

interface IPlanetUniforms {
  planetPosition: any
  planetSize: any
  sunPosition: any
  cameraPosition: any
  screenSize: any
}

export default class Planet extends Phaser.Sprite {

  private _radius: number
  private _planetPosition: Phaser.Point
  private _shader: Phaser.Filter
  private _uniforms: IPlanetUniforms

  constructor(game: Phaser.Game, x: number, y: number, radius: number) {
    super(game, 0, 0)
    this.width = this.game.width
    this.height = this.game.height
    // this.anchor.set(0.5, 0.5)

    this._radius = radius / 2.0
    this._planetPosition = new Phaser.Point(x, y)

    this._uniforms = {
      planetPosition: { type: '3f', value: {x, y: this.game.height - y, z: 0.0 } },
      planetSize: { type: '1f', value: radius },
      sunPosition: { type: '3f', value: { x: 200.0, y: this.game.height - this.game.height, z: 0.0 } },
      cameraPosition: { type: '3f', value: { x: this.game.camera.x, y: this.game.camera.y, z: 500 }},
      screenSize: { type: '2f', value: { x: this.game.width , y: this.game.height }}
    }

    this._shader = new Phaser.Filter(this.game, this._uniforms, shader)
    this._shader.setResolution(this.game.width, this.game.height)
    this.filters = [ this._shader ]


    const collisionBall = this.game.add.sprite(x, y)
    collisionBall.width = radius
    collisionBall.height = radius
    this.game.physics.p2.enable([collisionBall])
    collisionBall.body.setCircle(radius / 2.0)
    collisionBall.body.kinematic = true
    // collisionBall.body.damping = 0.1
  }

  public refresh(sunPosition: Phaser.Point) {
    this._uniforms.sunPosition.value = { x: sunPosition.x, y: sunPosition.y, z: -100.0 }
    this._uniforms.cameraPosition.value = { x: this.game.camera.x, y: this.game.camera.y, z: 500.0 }
    this._shader.syncUniforms()
  }

  public calculateGravityForce(point: Phaser.Point) {
    const maxPlanetAttraction = 500
    const maxDistanceFromPlanet = 200

    const distanceToPlanet = Phaser.Point.distance(point, this.planetPosition) - this._radius
    const angle = Math.atan2(this.planetPosition.y - point.y, this.planetPosition.x - point.x)

    const gravityInfluence = maxPlanetAttraction * Math.max(Math.min((maxDistanceFromPlanet - distanceToPlanet) / maxDistanceFromPlanet, 1.0), 0.0)
    // console.log(gravityInfluence)
    return new Phaser.Point(Math.cos(angle) * gravityInfluence,  Math.sin(angle) * gravityInfluence)
  }

  get radius(): number { return this._radius }
  get planetPosition(): Phaser.Point { return this._planetPosition }
}