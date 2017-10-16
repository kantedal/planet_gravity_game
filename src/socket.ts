import * as io from 'socket.io-client'
const shortid = require('shortid')

export interface INetworkListener {
  playerConnected: (player: IPlayerData) => void
  playerDisconnected: (playerId: string) => void
  updatePlayers: (players: { [playerId: string]: IPlayerData }) => void
}

export interface IPlayerData {
  id: string
  position: number[]
  velocity: number[]
  bullets: IBulletData[]
}

export interface IBulletData {
  position: number[]
  force: number
}

export default class Socket {
  private _isConnected: boolean
  private _playerId: string
  private _server: any

  constructor(private _networkListener: INetworkListener) {
    this._isConnected = false
    this._playerId = shortid.generate()
  }

  public connect() {
    const playerData = {
      id: this._playerId,
      name: '',
      position: [0, 0],
      velocity: [0, 0],
      bullets: []
    }

    this._server = io('http://192.168.2.159:4000')

    this._server.on('connect', () => {
      this._isConnected = true
      this._server.emit('connectPlayer', playerData)
    })

    this._server.on('disconnect', () => this._isConnected = false)
    this._server.on('updatePlayers', (playersData) => this._networkListener.updatePlayers(playersData))
    this._server.on('playerDisconnected', (playerId) => this._networkListener.playerDisconnected(playerId))
    this._server.on('playerConnected', (playerData) => this._networkListener.playerConnected(playerData))
    this._server.on('initPlayers', (playersData) => {
      console.log('init players', playersData)
      for (const playerId in playersData) {
        this._networkListener.playerConnected(playersData[playerId])
      }
    })
  }

  updatePlayerData(playerData: IPlayerData) {
    if (this._isConnected) {
      this._server.emit('updatePlayerData', playerData)
    }
  }

  get playerId() { return this._playerId }
}