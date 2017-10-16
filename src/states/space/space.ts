import Player from './player/player'
import OpponentPlayer from './player/opponent-player'
import Environment from './environment'
import PlayerHud from './player-hud'
import Socket, {IGameSetup, INetworkListener, IPlayerData} from '../../socket'
import Planet from './planet/planet'
import FuelTank from './fuel-tank'

export default class Space extends Phaser.State implements INetworkListener {
  private _socket: Socket
  private _initialized: boolean
  private _player: Player
  private _playerHud: PlayerHud
  private _opponentPlayers: { [playerId: string]: OpponentPlayer }
  private _environment: Environment

  private _fuelTanks: { [fuelTankId: string]: FuelTank }

  public create(): void {
    this._socket = new Socket(this)
    this._socket.connect()

    this.game.world.setBounds(0, 0, 1200, 1200)
    this.physics.startSystem(Phaser.Physics.P2JS)
    this.physics.startSystem(Phaser.Physics.ARCADE)

    this._environment = new Environment(this.game)

    this.game.camera.flash(0x000000, 1000)

    this._opponentPlayers = {}

    this._initialized = false
    // this._renderTexture = this.game.add.renderTexture(this.game.width, this.game.height, 'texture1')
    // this._outputSprite = this.game.add.sprite(0, 0)
    // this._outputSprite.fixedToCamera = true
    // this._outputSprite.filters = [ this._spaceShader ]

    // this.game.add.existing(this._spaceShader)

    // this.game.add.existing(this._player)

    // this.game.add.sprite(0, 0,  Assets.Images.ImagesSpaceShuttle.getName())
    // this.game.add.filter('spaceShader', shader)
  }

  public update(): void {
    const time = this.time.time / 5000
    if (this._initialized) {
      this._environment.update(time, this.camera)
      this._socket.updatePlayerData({
        id: this._socket.playerId,
        position: [this._player.spaceShuttle.position.x, this._player.spaceShuttle.position.y],
        velocity: [this._player.velocity.x, this._player.velocity.y],
        bullets: this._player.bulletsData
      })

      for (const fuelTankId in this._fuelTanks) {
        const fuelTank = this._fuelTanks[fuelTankId]
        if (Phaser.Point.distance(fuelTank.fuelTankSprite.position, this._player.spaceShuttle.position) < 10) {
          this._socket.fuelTankTaken(fuelTankId)
          this._player.fuel = Math.min(100, this._player.fuel + 50)
        }
      }

      if (this._player.health === 0) {
        this._socket.disconnect()
        this.game.state.start('gameover')
      }
    }
  }

  public updatePlayers(players: { [playerId: string]: IPlayerData }) {
    // console.log('update players', players)
    if (this._initialized) {
      for (const playerId in players) {
        if (playerId !== this._socket.playerId && this._opponentPlayers[playerId]) {
          this._opponentPlayers[playerId].refresh(players[playerId])
        }
      }
    }
  }

  public playerConnected(playerData: IPlayerData) {
    if (playerData.id !== this._socket.playerId) {
      const newPlayer = new OpponentPlayer(this.game, playerData, this._player)
      this.game.add.existing(newPlayer)
      this._opponentPlayers[playerData.id] = newPlayer
    }
  }

  public playerDisconnected(playerId: string) {
    if (this._opponentPlayers[playerId]) {
      this._opponentPlayers[playerId].spaceShuttle.destroy()
      this._opponentPlayers[playerId].bullets.destroy()
      this._opponentPlayers[playerId].destroy()
      delete this._opponentPlayers[playerId]
    }
  }

  public setupGame(gameSetup: IGameSetup) {
    this._environment.initPlanets(gameSetup.planets)

    this._player = new Player(this.game, this._environment.planets)
    this.game.add.existing(this._player)

    this._playerHud = new PlayerHud(this.game, this._player)

    this._fuelTanks = {}
    for (const fuelTankId in gameSetup.fuelTanks) {
      const fuelTankData = gameSetup.fuelTanks[fuelTankId]

      if (!this._fuelTanks[fuelTankId]) {
        this._fuelTanks[fuelTankId] = new FuelTank(this.game, fuelTankData.id, fuelTankData.position)
      }
      else {
        this._fuelTanks[fuelTankId].fuelTankSprite.position.set(fuelTankData.position[0], fuelTankData.position[1])
      }
    }

    this._initialized = true
  }

  public updateGame(gameSetup: IGameSetup) {
    for (const fuelTankId in gameSetup.fuelTanks) {
      const fuelTankData = gameSetup.fuelTanks[fuelTankId]

      if (!this._fuelTanks[fuelTankId]) {
        this._fuelTanks[fuelTankId] = new FuelTank(this.game, fuelTankData.id, fuelTankData.position)
      }
      else {
        this._fuelTanks[fuelTankId].fuelTankSprite.position.set(fuelTankData.position[0], fuelTankData.position[1])
      }
    }
  }
}
