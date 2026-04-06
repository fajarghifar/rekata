import { useState } from 'react'
import useLocalStorage from './hooks/useLocalStorage'
import Layout from './components/ui/Layout'
import LobbyView from './components/views/LobbyView'
import GameView from './components/views/GameView'
import SettingsModal from './components/game/SettingsModal'
import { Player, GameSettings, GameState } from './types'

type AppView = 'lobby' | 'game'

/**
 * App — Main State Manager.
 * Manages view navigation and global state (players, settings, gameState).
 */
export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('lobby')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  // Persistent state (localStorage)
  const [players, setPlayers] = useLocalStorage<Player[]>('rekata_players', [])
  const [settings, setSettings] = useLocalStorage<GameSettings>('rekata_settings', {
    orderMode: 'fair-round-robin',
  })
  const [gameState, setGameState] = useLocalStorage<GameState | null>('rekata_gameState', null)

  // ── Navigation ──
  const navigateTo = (view: AppView) => {
    setCurrentView(view)
  }

  const openSettings = () => {
    setIsSettingsOpen(true)
  }

  // ── Player Actions ──
  const addPlayer = (nama: string) => {
    const newPlayer: Player = {
      id: crypto.randomUUID(),
      nama,
    }
    setPlayers([...players, newPlayer])
  }

  const removePlayer = (id: string) => {
    setPlayers(players.filter((p) => p.id !== id))
  }

  // ── Game Actions ──
  const startGame = () => {
    // Jika tidak ada memori, ciptakan kanvas baru
    if (!gameState) {
      setGameState({
        isGameActive: true,
        currentPlayerIndex: 0,
        currentRoundPlayedPlayerIds: [],
        playedCardIds: [],
        skippedCardIds: [],
      })
    } else {
      // Jika nyatanya ada riwayat (Pemain pindah ke Lobby sebentar untuk perbaiki form), pertahankan riwayat dan masuk!
      setGameState({
        ...gameState,
        isGameActive: true
      })
    }
    navigateTo('game')
  }

  const resetCards = () => {
    if (gameState) {
      setGameState({
        ...gameState,
        playedCardIds: [],
        skippedCardIds: [],
      })
    }
  }

  // ── Layout Props per View ──
  const layoutProps: Record<AppView, any> = {
    lobby: {
      mode: 'lobby',
      showBack: false,
      showSettings: true,
      onOpenSettings: openSettings,
    },
    game: {
      mode: 'game',
      showBack: true,
      showSettings: true,
      onBack: () => navigateTo('lobby'),
      onOpenSettings: openSettings,
    },
  }

  // ── Render View ──
  const renderView = () => {
    switch (currentView) {
      case 'lobby':
        return (
          <LobbyView
            players={players}
            onAddPlayer={addPlayer}
            onRemovePlayer={removePlayer}
            onStartGame={startGame}
          />
        )
      case 'game':
        return (
          <GameView
            players={players}
            settings={settings}
            gameState={gameState!}
            onUpdateGameState={setGameState}
          />
        )
      default:
        return null
    }
  }

  return (
    <>
      <Layout {...layoutProps[currentView]}>
        {renderView()}
      </Layout>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={setSettings}
        onResetCards={resetCards}
      />
    </>
  )
}
