import * as Assets from '../../../assets'
import PlanetGlow from './planet-glow'
const glsl = require('glslify')
const shader = require('raw-loader!glslify!./planetShader.frag')

interface IPlanetUniforms {
  planetPosition: any
  planetColor: any
  planetSize: any
  sunPosition: any
  cameraPosition: any
  screenSize: any
}

export default class Planet extends Phaser.Sprite {
  private _radius: number
  private _planetPosition: Phaser.Point
  private _planetGlow: PlanetGlow
  private _shader: Phaser.Filter
  private _uniforms: IPlanetUniforms

  constructor(game: Phaser.Game, x: number, y: number, radius: number, private _planetId) {
    super(game, 0, 0)
    this.width = this.game.width
    this.height = this.game.height
    // this.anchor.set(0.5, 0.5)

    this._radius = radius / 2.0
    this._planetPosition = new Phaser.Point(x, y)

    this._uniforms = {
      planetPosition: { type: '3f', value: {x, y: this.game.height - y, z: 0.0 } },
      planetColor: { type: '3f', value: { x: 2.0 * (Math.random() - 0.5), y: 2.0 * (Math.random() - 0.5), z: 2.0 * (Math.random() - 0.5) }},
      planetSize: { type: '1f', value: radius },
      sunPosition: { type: '3f', value: { x: 200.0, y: this.game.height - this.game.height, z: 0.0 } },
      cameraPosition: { type: '3f', value: { x: this.game.camera.x, y: this.game.camera.y, z: 500 }},
      screenSize: { type: '2f', value: { x: this.game.width , y: this.game.height }}
    }

    this._shader = new Phaser.Filter(this.game, this._uniforms, shader)
    this._shader.setResolution(this.game.width, this.game.height)
    this.filters = [ this._shader ]

    this._planetGlow = new PlanetGlow(this.game, x, y, radius + 80)
    this.game.add.existing(this._planetGlow)

    const collisionSphere = this.game.add.sprite(x, y)
    collisionSphere.width = radius
    collisionSphere.height = radius
    this.game.physics.p2.enable([collisionSphere])
    collisionSphere.body.setCircle(radius / 2.0)
    collisionSphere.body.kinematic = true
    // collisionBall.body.damping = 0.1
  }

  public refresh(sunPosition: Phaser.Point) {
    this._uniforms.sunPosition.value = { x: sunPosition.x, y: sunPosition.y, z: -100.0 }
    this._uniforms.cameraPosition.value = { x: this.game.camera.x, y: this.game.camera.y, z: 500.0 }
    this._planetGlow.refresh(sunPosition)
    this._shader.syncUniforms()
  }

  public calculateGravityForce(point: Phaser.Point) {
    const maxPlanetAttraction = 2000 * this._radius / 300
    const maxDistanceFromPlanet = 160
    const offset = 30

    const distanceToPlanet = Phaser.Point.distance(point, this.planetPosition) - this._radius

    if (distanceToPlanet < maxDistanceFromPlanet) {
      const angle = Math.atan2(this.planetPosition.y - point.y, this.planetPosition.x - point.x)

      if (distanceToPlanet < offset) {
        const gravityInterpolation = (offset - distanceToPlanet) / offset
        const gravityInfluence = -300 * gravityInterpolation
        return new Phaser.Point(Math.cos(angle) * gravityInfluence,  Math.sin(angle) * gravityInfluence)
      }
      else {
        const gravityInterpolation = ((maxDistanceFromPlanet - offset) - (distanceToPlanet - offset)) / (maxDistanceFromPlanet - offset)
        const gravityInfluence = maxPlanetAttraction * gravityInterpolation
        return new Phaser.Point(Math.cos(angle) * gravityInfluence,  Math.sin(angle) * gravityInfluence)
      }
    }

    return new Phaser.Point(0, 0)

    // if (distanceToPlanet < maxDistanceFromPlanet) {
    //   console.log((distanceToPlanet))
    // }

    // const gravityInfluence = ()
    // const gravityInfluence = maxPlanetAttraction * Math.max(Math.min((maxDistanceFromPlanet - distanceToPlanet) / maxDistanceFromPlanet, 1.0), 0.0)
    // console.log(gravityInfluence)
  }

  get radius(): number { return this._radius }
  get planetPosition(): Phaser.Point { return this._planetPosition }
}