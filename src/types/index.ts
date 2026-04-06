export interface Player {
  id: string
  nama: string
}

export type GameOrderMode = 'fair-round-robin' | 'random'

export interface GameSettings {
  orderMode: GameOrderMode
}

export interface GameState {
  isGameActive: boolean
  currentPlayerIndex: number
  /** Digunakan oleh fair-round-robin untuk melacak siapa yang belum main di ronde ini */
  currentRoundPlayedPlayerIds: string[]
  playedCardIds: number[]
  skippedCardIds: number[]
}

export interface Question {
  id: number
  category: string
  text: string
  icon: string
  color: string
}
