import Victor = require('victor')

enum Shapes { Box, Circle }

export abstract class RigidBody {
  static Shapes = Shapes

  protected _mass: number
  protected _position: Victor
  protected _linearVelocity: Victor
  protected _angle: number
  protected _angularVelocity: number
  protected _force: Victor
  protected _torque: number

  constructor(private _shape: number) {
    this._mass = 0
    this._position = new Victor(0, 0)
    this._linearVelocity = new Victor(0, 0)
    this._angle = 0
    this._angularVelocity = 0
    this._force = new Victor(0, 0)
    this._torque = 0
  }

  get position(): Victor { return this._position }
  set position(p: Victor) { this._position = p.clone() }

  get linearVelocity(): Victor { return this._linearVelocity }
  set linearVelocity(v: Victor) { this._linearVelocity = v.clone() }

  get angle(): number { return this._angularVelocity }
  set angle(angle: number) { this._angle = angle }

  get angularVelocity(): number { return this._angularVelocity }
  set angularVelocity(v: number) { this._angularVelocity = v }

  get force(): Victor { return this._force }
  set force(force: Victor) { this._force = force.clone() }

  get torque(): number { return this._torque }
  set torque(torque: number) { this._torque = torque }

  get mass(): number { return this._mass }
  get shape(): number { return this._shape }
}

export class BoxShape extends RigidBody {
  private _dimensions: Victor
  private _momentOfInertia: number

  constructor(position: Victor, dimensions: Victor, mass: number) {
    super(RigidBody.Shapes.Box)
    this._position = position.clone()
    this._dimensions = dimensions.clone()
    this._mass = mass
    this._momentOfInertia = this._mass * (this._dimensions.x * this._dimensions.x + this._dimensions.y * this._dimensions.y) / 12
  }

  get dimensions(): Victor { return this._dimensions }
  get momentOfInertia(): number { return this._momentOfInertia }
}