import Player from './player/player'
import OpponentPlayer from './player/opponent-player'
import Environment from './environment'
import PlayerHud from './player-hud'
import Socket, {INetworkListener, IPlayerData} from '../../socket'


export default class Space extends Phaser.State implements INetworkListener {
  private _socket: Socket
  private _player: Player
  private _playerHud: PlayerHud
  private _opponentPlayers: { [playerId: string]: OpponentPlayer }
  private _environment: Environment

  public create(): void {
    this._socket = new Socket(this)
    this._socket.connect()

    this.game.world.setBounds(0, 0, 1200, 1200)
    this.physics.startSystem(Phaser.Physics.P2JS)
    this.physics.startSystem(Phaser.Physics.ARCADE)

    this._environment = new Environment(this.game)

    this._player = new Player(this.game, this._environment.planets)
    this.game.add.existing(this._player)

    this._playerHud = new PlayerHud(this.game, this._player)

    this.game.camera.flash(0x000000, 1000)

    this._opponentPlayers = {}

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
    this._environment.update(time, this.camera)
    this._socket.updatePlayerData({
      id: this._socket.playerId,
      position: [this._player.spaceShuttle.position.x, this._player.spaceShuttle.position.y],
      velocity: [this._player.velocity.x, this._player.velocity.y],
      bullets: this._player.bulletsData
    })
  }

  public updatePlayers(players: { [playerId: string]: IPlayerData }) {
    // console.log('update players', players)
    for (const playerId in players) {
      if (playerId !== this._socket.playerId && this._opponentPlayers[playerId]) {
        this._opponentPlayers[playerId].refresh(players[playerId])
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
}
