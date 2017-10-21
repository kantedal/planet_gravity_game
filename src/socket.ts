import * as io from 'socket.io-client'
const shortid = require('shortid')

export interface INetworkListener {
  playerConnected: (player: IPlayerData) => void
  playerDisconnected: (playerId: string) => void
  updatePlayers: (players: { [playerId: string]: IPlayerData }) => void
  setupGame: (gameSetup: IGameSetup) => void
  updateGame: (gameSetup: IGameSetup) => void
}

export interface IGameSetup {
  planets: { [planetId: string]: any }
  fuelTanks: { [fuelTankId: string]: any }
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
    

    this._server = io('http://192.168.2.159:4000')
    // this._server = io('http://172.20.10.2:4000')
    // this._server = io('http://10.253.225.5:4000')

    this._server.on('connect', () => {
      this._isConnected = true
      
    })

    this._server.on('disconnect', () => this._isConnected = false)
    this._server.on('updatePlayers', (playersData) => this._networkListener.updatePlayers(playersData))
    this._server.on('playerDisconnected', (playerId) => this._networkListener.playerDisconnected(playerId))
    this._server.on('playerConnected', (playerData) => this._networkListener.playerConnected(playerData))
    this._server.on('init', (gameData) => {
      this._networkListener.setupGame(gameData.gameSetup)
      for (const playerId in gameData.players) {
        this._networkListener.playerConnected(gameData.players[playerId])
      }
    })
    this._server.on('updateGame', (gameSetup: IGameSetup) => this._networkListener.updateGame(gameSetup))
  }

  startGame() {
    const playerData = {
      id: this._playerId,
      name: '',
      position: [0, 0],
      velocity: [0, 0],
      bullets: []
    }

    this._server.emit('connectPlayer', playerData)
  }

  updatePlayerData(playerData: IPlayerData) {
    if (this._isConnected) {
      this._server.emit('updatePlayerData', playerData)
    }
  }

  fuelTankTaken(fuelTankId: string) {
    this._server.emit('fuelTaken', fuelTankId)
  }

  disconnect() {
    this._server.disconnect()
  }

  get playerId() { return this._playerId }
}