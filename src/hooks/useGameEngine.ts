import { useState, useRef, useEffect } from 'react'
import { Player, GameState, GameSettings, Question } from '../types'
import { drawNextCardId, getNextPlayerIndex } from '../utils/gameLogic'
import questionsData from '../data/questions.json'

interface UseGameEngineProps {
  players: Player[]
  settings: GameSettings
  gameState: GameState
  onUpdateGameState: (state: GameState) => void
}

export function useGameEngine({ players, settings, gameState, onUpdateGameState }: UseGameEngineProps) {
  const [isStarted, setIsStarted] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null)
  
  const drawTimeoutRef = useRef<number | null>(null)
  
  const allQuestions = questionsData as Question[]
  const totalDeck = allQuestions.length
  const playedCount = gameState.playedCardIds.length
  const isFinished = playedCount >= totalDeck

  // Safe fallback to prevent crash if players array mutates heavily
  const activePlayer = players[gameState.currentPlayerIndex] || players[0]

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (drawTimeoutRef.current) clearTimeout(drawTimeoutRef.current)
    }
  }, [])

  // Core Game Engine: Execute draw sequence
  const performDraw = (newPlayedId?: number, newSkippedId?: number) => {
    if (drawTimeoutRef.current) clearTimeout(drawTimeoutRef.current)
    
    setIsDrawing(true)

    // Compute derived state using the exact latest IDs immediately to prevent React batching collisions
    const currentPlayedIds = newPlayedId ? [...gameState.playedCardIds, newPlayedId] : gameState.playedCardIds
    const currentSkippedIds = newSkippedId ? [...gameState.skippedCardIds, newSkippedId] : gameState.skippedCardIds
    
    // Predict next card ahead of lock
    const newCardId = drawNextCardId(allQuestions, currentPlayedIds)
    if (newCardId === null) {
      setIsDrawing(false)
      onUpdateGameState({
        ...gameState,
        playedCardIds: currentPlayedIds,
        skippedCardIds: currentSkippedIds
      })
      return 
    }

    const cardObj = allQuestions.find(q => q.id === newCardId) || null
    
    // Compute turn fairness
    const { nextPlayerIndex, newRoundIds } = getNextPlayerIndex(players, gameState, settings)

    // Mutate overall app state instantly
    setActiveQuestion(cardObj)
    onUpdateGameState({
      ...gameState,
      playedCardIds: currentPlayedIds,
      skippedCardIds: currentSkippedIds,
      currentPlayerIndex: nextPlayerIndex,
      currentRoundPlayedPlayerIds: newRoundIds
    })

    // Cinematic hold period: 3 Seconds Shuffling Freeze
    drawTimeoutRef.current = window.setTimeout(() => {
      setIsDrawing(false)
    }, 3000)
  }

  const handleStartSession = () => {
    setIsStarted(true)
    performDraw()
  }

  const handleCompleteTurn = () => {
    if (!activeQuestion || isDrawing) return
    performDraw(activeQuestion.id, undefined)
  }

  const handleTriggerSkip = (openModalCb: () => void) => {
    if (!activeQuestion || isDrawing) return
    openModalCb()
  }

  const handleSkipConfirm = (closeModalCb: () => void) => {
    if (activeQuestion) {
      performDraw(undefined, activeQuestion.id)
    }
    closeModalCb()
  }

  return {
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
  }
}
