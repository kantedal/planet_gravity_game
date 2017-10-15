import * as io from 'socket.io-client'
const shortid = require('shortid')

export interface INetworkListener {
  playerConnected: (player: IPlayerData) => void
  playerDisconnected: (player: IPlayerData) => void
  updatePlayers: (players: IPlayerData[]) => void
}

export interface IPlayerData {
  id: string
  position: number[]
}

export default class Socket {
  isConnected: boolean
  playerId: string
  players: { [playerId: string]: any }

  constructor(private _networkListener: INetworkListener) {
    this.isConnected = false
    this.playerId = shortid.generate()
    this.players = {}
  }

  public connect() {
    const playerData = {
      id: this.playerId,
      name: '',
      position: [0, 0]
    }

    const server = io('http://192.168.2.159:4000')

    server.on('connect', () => {
      this.isConnected = true
      server.emit('connectPlayer', playerData)
    })

    server.on('disconnect', () => this.isConnected = false)
    server.on('updatePlayers', (playersData) => this.players = playersData)
  }

  updatePlayerData() {

  }
}