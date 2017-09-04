import Planet from './planet/planet'
import PlanetGlow from './planet/planet-glow'
import Sun from './sun/sun'
import Sky from './sky/sky'

export default class Space extends Phaser.State {
  private _sky: Sky
  private _sun: Sun
  private _planets: Planet[]
  private _planetGlow: PlanetGlow[]

  public create(): void {
    this._sky = new Sky(this.game)
    this.game.add.existing(this._sky)

    this._sun = new Sun(this.game, 200, 0, 100)
    this.game.add.existing(this._sun)

    this._planets = []
    this._planets.push(new Planet(this.game, 100, 100, 200))
    this._planets.push(new Planet(this.game, 500, 200, 150))

    this._planetGlow = []
    this._planets = []

    this._planetGlow.push(new PlanetGlow(this.game, 140, 200, 230))
    this._planets.push(new Planet(this.game, 140, 200, 200))

    this._planetGlow.push(new PlanetGlow(this.game, 600, 200, 180))
    this._planets.push(new Planet(this.game, 600, 200, 150))


    for (const planetGlow of this._planetGlow) {
      this.game.add.existing(planetGlow)
    }

    for (const planet of this._planets) {
      this.game.add.existing(planet)
    }

    this.game.camera.flash(0x000000, 1000)
  }

  public update(): void {
    // console.log(this.time.time)
    const time = this.time.time / 5000
    this._sun.position.x = 400 + 400 * Math.cos(time)
    this._sun.position.y = 300 + 300 * Math.sin(time)

    for (const planet of this._planets) {
      planet.refresh(this._sun.position)
    }

    for (const planetGlow of this._planetGlow) {
      planetGlow.refresh(this._sun.position)
    }

    this._sky.refresh(new Phaser.Point(this._sun.position.x + this._sun.width / 2.0, this._sun.position.y + this._sun.height / 2.0))
  }

  public render(): void {

  }
}
