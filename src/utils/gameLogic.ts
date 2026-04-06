import { Player, GameState, GameSettings, Question } from '../types'

/**
 * Mendapatkan indeks acak yang aman dari rentang batas.
 */
const getRandomIndex = (max: number): number => {
  return Math.floor(Math.random() * max)
}

/**
 * Menentukan indeks pemain berikutnya berdasarkan mode permainan (adil vs murni acak).
 */
export const getNextPlayerIndex = (
  players: Player[],
  gameState: GameState,
  settings: GameSettings
): {
  nextPlayerIndex: number;
  newRoundIds: string[];
} => {
  const isFair = settings.orderMode === 'fair-round-robin'
  const totalPlayers = players.length

  if (!isFair) {
    // Mode Acak Murni
    return {
      nextPlayerIndex: getRandomIndex(totalPlayers),
      newRoundIds: [] // Tidak perlu mengingat siklus ronde
    }
  }

  // Mode Adil / Fair Round-Robin
  let currentRoundIds = [...gameState.currentRoundPlayedPlayerIds]
  
  // Jika seluruh pemain sudah tampil 1 putaran penuh, reset tracker untuk ronde baru!
  if (currentRoundIds.length >= totalPlayers) {
    currentRoundIds = []
  }

  // Cari index yang memuat pemain-pemain yang belum main di ronde ini
  const availableIndices = players
    .map((p, i) => ({ id: p.id, index: i }))
    .filter(p => !currentRoundIds.includes(p.id))
    .map(p => p.index)

  // Tarik secara acak dari yang tersisa
  const pickedIndex = availableIndices[getRandomIndex(availableIndices.length)]
  
  // Daftarkan dia ke tracker yang telah main di ronde ini
  currentRoundIds.push(players[pickedIndex].id)

  return {
    nextPlayerIndex: pickedIndex,
    newRoundIds: currentRoundIds
  }
}

/**
 * Menarik satu kartu eksklusif dari bank kartu yang belum pernah terbuka sama sekali.
 */
export const drawNextCardId = (
  questions: Question[],
  playedIds: number[]
): number | null => {
  // Hanya ambil kartu yang tidak ada di rekaman playedIds
  const unplayedQuestions = questions.filter(q => !playedIds.includes(q.id))

  // Semua kartu habis dibakar memori
  if (unplayedQuestions.length === 0) return null

  const randomQ = unplayedQuestions[getRandomIndex(unplayedQuestions.length)]
  return randomQ.id
}
