import Victor = require('victor')
import {BoxShape, RigidBody} from './rigid-body'

export class Engine {
  private _dt: number
  private _currentTime: number
  private _rigidBodies: RigidBody[]

  constructor() {
    this._dt = 0.02
    this._currentTime = 0
    this._rigidBodies = []
  }

  public run() {
    for (const rb of this._rigidBodies) {
      const rigidBody = rb as BoxShape
      this.computeForceAndTorque(rigidBody)

      const linearAcceleration = rigidBody.force.clone().multiplyScalar(1 / rigidBody.mass)
      rigidBody.linearVelocity.add(linearAcceleration.multiplyScalar(this._dt))
      rigidBody.position.add(rigidBody.linearVelocity.clone().multiplyScalar(this._dt))

      const angularAcceleration = rigidBody.torque / rigidBody.momentOfInertia
      rigidBody.angularVelocity += angularAcceleration * this._dt
      rigidBody.angle += rigidBody.angularVelocity * this._dt
    }
  }

  public addRigidBody(rigidBody: RigidBody) {
    this._rigidBodies.push(rigidBody)
  }

  private computeForceAndTorque(rigidBody: RigidBody) {
    const f = new Victor(0, -9.82)
    rigidBody.force = f
    const r = new Victor(1, 1)
    rigidBody.torque = r.x * f.y - r.y * f.x
  }

}