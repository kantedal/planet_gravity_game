import Player from './player/player';
import Environment from './environment';
import Socket, {INetworkListener, IPlayerData} from '../../socket'


export default class Space extends Phaser.State implements INetworkListener {
  private _socket: Socket
  private _player: Player
  private _opponentPlayers: Player[]
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

    this.game.camera.flash(0x000000, 1000)

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
  }

  public updatePlayers(players: IPlayerData[]) {

  }

  public playerConnected(playerData: IPlayerData) {
    console.log('playerAdded')
  }

  public playerDisconnected(playerData: IPlayerData) {

  }
}
