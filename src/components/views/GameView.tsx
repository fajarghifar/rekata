import { useState } from 'react'
import Button from '../ui/Button'
import { Player, GameState, GameSettings } from '../../types'
import { useGameEngine } from '../../hooks/useGameEngine'

// Isolated Internal Components
import WelcomeCard from '../game/WelcomeCard'
import EmptyCard from '../game/EmptyCard'
import QuestionCard from '../game/QuestionCard'
import SkipConfirmModal from '../game/SkipConfirmModal'

interface GameViewProps {
  players: Player[]
  settings: GameSettings
  gameState: GameState
  onUpdateGameState: (state: GameState) => void
}

export default function GameView({ players, settings, gameState, onUpdateGameState }: GameViewProps) {
  // Pure UI State
  const [isSkipModalOpen, setIsSkipModalOpen] = useState(false)

  // Decoupled Game Logic Hook
  const {
    isStarted,
    isDrawing,
    isFinished,
    activeQuestion,
    activePlayer,
    totalDeck,
    playedCount,
    handleStartSession,
    handleCompleteTurn,
    handleTriggerSkip,
    handleSkipConfirm
  } = useGameEngine({ players, settings, gameState, onUpdateGameState })

  // Component Router Delegate
  const renderCardContainer = () => {
    if (isFinished) return <EmptyCard />
    if (!isStarted || (!activeQuestion && !isDrawing)) return <WelcomeCard onStart={handleStartSession} />
    return <QuestionCard question={activeQuestion!} isDrawing={isDrawing} />
  }

  return (
    <div className="w-full max-w-sm md:max-w-md flex-1 flex flex-col justify-between items-center py-2 h-full mx-auto">

      {/* Progress & Passive Player Indicator */}
      <div className={`w-full flex items-end justify-between px-2 mb-6 transition-opacity duration-500 ${isStarted && !isFinished ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Giliran Pemain</span>
          <div className="flex items-center gap-2">
            <div className="shrink-0 w-7 h-7 rounded-full bg-sky-100 flex items-center justify-center text-xs font-extrabold text-sky-600">
              {activePlayer?.nama?.charAt(0).toUpperCase()}
            </div>
            <span className="text-base font-extrabold text-slate-800">{activePlayer?.nama}</span>
          </div>
        </div>

        <div className="flex flex-col items-end pb-0.5">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Sisa Kartu</span>
          <span className="shrink-0 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
            {totalDeck - playedCount} / {totalDeck}
          </span>
        </div>
      </div>

      {/* 3D Perspective Virtual Layout Layer - Auto-expanding to absorb vertical space */}
      <div className="relative z-10 w-full flex-1 flex flex-col group perspective-1000 my-4 md:my-6">
        
        {/* Isolated Core Interactive Card - Forces 100% Parent Height */}
        <div className="relative z-10 w-full flex-1 flex flex-col transition-transform duration-500 md:group-hover:scale-105">
          {renderCardContainer()}
        </div>

        {/* Pseudo Depth Stack Underneath (Translative Gravitational Physics) */}
        <div className="absolute top-4 -bottom-3 left-4 right-4 bg-white/50 backdrop-blur-sm rounded-3xl -z-10 border border-white/60 shadow-sm transition-all duration-500 md:group-hover:translate-y-2 md:group-hover:scale-95" />
        <div className="absolute top-8 -bottom-6 left-8 right-8 bg-white/30 backdrop-blur-sm rounded-3xl -z-20 border border-white/40 shadow-sm transition-all duration-500 md:group-hover:translate-y-4 md:group-hover:scale-90" />
      </div>

      {/* Action Buttons Wheel - Relies on flex gap distribution */}
      <div className={`mt-8 md:mt-12 w-full flex items-center justify-between gap-4 transition-all duration-500 ${isStarted && !isFinished && activeQuestion && !isDrawing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <Button variant="danger" className="flex-1 h-14 md:h-16 font-extrabold text-sm md:text-base px-2 shadow-sm shadow-red-500/20" onClick={() => handleTriggerSkip(() => setIsSkipModalOpen(true))} disabled={isDrawing}>
          Lewati
        </Button>
        <Button variant="primary" className="flex-1 h-14 md:h-16 font-extrabold text-sm md:text-base px-2 shadow-sm shadow-sky-500/30" onClick={handleCompleteTurn} disabled={isDrawing}>
          Selesai
        </Button>
      </div>

      <SkipConfirmModal 
         isOpen={isSkipModalOpen} 
         onClose={() => setIsSkipModalOpen(false)} 
         onConfirm={() => handleSkipConfirm(() => setIsSkipModalOpen(false))} 
      />
    </div>
  )
}
