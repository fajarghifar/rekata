import Chip from '../ui/Chip'
import { Player } from '../../types'

interface PlayerGridProps {
  players: Player[]
  onRemovePlayer: (id: string) => void
}

export default function PlayerGrid({ players, onRemovePlayer }: PlayerGridProps) {
  if (players.length === 0) return null

  return (
    <div className="w-full pt-1">
      <div className="flex items-center gap-3 mb-5 ml-1">
        <h3 className="text-sm md:text-base font-extrabold text-slate-600">Daftar Pemain</h3>
        <span className="flex items-center justify-center bg-sky-100 text-sky-600 px-3 py-1 rounded-lg text-xs font-bold border border-sky-200/50">
          {players.length}
        </span>
      </div>

      {/* Scrollable Container Bound (Safeguards against overflow collapsing) */}
      <div className="flex flex-wrap gap-3 min-h-12 max-h-40 md:max-h-56 overflow-y-auto overflow-x-hidden pr-2 pb-2">
        {players.map((player, index) => (
          <Chip
            key={player.id}
            label={player.nama}
            colorIndex={index}
            delay={index * 50}
            onRemove={() => onRemovePlayer(player.id)}
          />
        ))}
      </div>
    </div>
  )
}
