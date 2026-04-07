import Button from '../ui/Button'
import PlayerForm from '../game/PlayerForm'
import PlayerGrid from '../game/PlayerGrid'
import { Player } from '../../types'

interface LobbyViewProps {
  players: Player[]
  onAddPlayer: (name: string) => void
  onRemovePlayer: (id: string) => void
  onStartGame: () => void
}

export default function LobbyView({
  players,
  onAddPlayer,
  onRemovePlayer,
  onStartGame,
}: LobbyViewProps) {
  const canStart = players.length >= 2

  return (
    <div className="w-full max-w-xl flex flex-col items-center">

      {/* Primary Setup Panel */}
      <div className="
        w-full
        bg-white/95 backdrop-blur-md rounded-2xl
        border border-white
        shadow-sm shadow-slate-200/50
        p-5 sm:p-7 md:p-8 space-y-2
        relative z-10
      ">
        <PlayerForm players={players} onAddPlayer={onAddPlayer} />

        <div className="w-full pt-4">
          <PlayerGrid players={players} onRemovePlayer={onRemovePlayer} />
        </div>

        {/* Action Button Section */}
        <div className="pt-8 border-t border-slate-100 flex flex-col items-center gap-3">
          <Button
            variant="primary"
            disabled={!canStart}
            onClick={onStartGame}
            className="w-full sm:w-72 h-14 md:h-16 text-sm md:text-base"
          >
            Mulai Bermain
          </Button>

          <div className={`transition-all duration-300 overflow-hidden flex items-center justify-center ${!canStart ? 'max-h-6 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}>
            <p className="text-sm text-slate-400 font-medium tracking-wide">
              Belum cukup pemain (Minimal 2)
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}
