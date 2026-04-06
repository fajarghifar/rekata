import { useState, useEffect } from 'react'
import { Question } from '../../types'
import { Home, Users, AlertTriangle, MonitorSmartphone, Heart, Brain, Map, MessageSquare } from 'lucide-react'

// Passive reference to questionsData for randomized Shuffling Roulette
import questionsData from '../../data/questions.json'

// Icon Component Render Map
const ICON_MAP: Record<string, any> = {
  Home, Users, AlertTriangle, MonitorSmartphone, Heart, Brain, Map, MessageSquare
}

// Native Tailwind V4 Color Schema
const COLOR_MAP: Record<string, { bg: string; text: string }> = {
  indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600' },
  emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600' },
  rose: { bg: 'bg-rose-100', text: 'text-rose-600' },
  sky: { bg: 'bg-sky-100', text: 'text-sky-600' },
  pink: { bg: 'bg-pink-100', text: 'text-pink-600' },
  violet: { bg: 'bg-violet-100', text: 'text-violet-600' },
  amber: { bg: 'bg-amber-100', text: 'text-amber-600' },
  slate: { bg: 'bg-slate-100', text: 'text-slate-600' },
}

interface QuestionCardProps {
  question: Question | null
  isDrawing: boolean
}

export default function QuestionCard({ question, isDrawing }: QuestionCardProps) {

  // -- ROULETTE KINETIC SYSTEM (SHUFFLING) --
  const [shufflingData, setShufflingData] = useState<{ category: string, icon: string, color: string } | null>(null)

  useEffect(() => {
    let interval: number | null = null;

    if (isDrawing) {
      // Commands the UI engine to transform identity every 150ms! Maximum Gacha Tension!
      interval = window.setInterval(() => {
        const pool = questionsData as Question[]
        const randomQ = pool[Math.floor(Math.random() * pool.length)]
        setShufflingData({ category: randomQ.category, icon: randomQ.icon, color: randomQ.color })
      }, 150)
    } else {
      // Clears the illusion when the actual card lands
      setShufflingData(null)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isDrawing])


  // ===================== TARGET FOREGROUND CALCULATION =====================
  const theme = question?.color ? COLOR_MAP[question.color] || COLOR_MAP.slate : COLOR_MAP.slate
  const IconComponent = question?.icon ? ICON_MAP[question.icon] || MessageSquare : MessageSquare


  // ===================== SHUFFLE BACKPACK CALCULATION =====================
  const backfaceColor = isDrawing && shufflingData ? shufflingData.color : (question?.color || 'slate')
  const backfaceIcon = isDrawing && shufflingData ? shufflingData.icon : (question?.icon || 'MessageSquare')
  const backfaceCategory = isDrawing && shufflingData ? shufflingData.category : (question?.category || 'MENGACAK')

  const backTheme = COLOR_MAP[backfaceColor] || COLOR_MAP.slate
  const BackIconComponent = ICON_MAP[backfaceIcon] || MessageSquare


  // ABSOLUTE CARD DOM LAYOUT (Native Flex-Grow 100%)
  return (
    <div key={`question-${question?.id || 'empty'}`} className="w-full min-h-80 sm:min-h-115 md:min-h-130 flex-1 h-full flex flex-col group perspective-1000">
      
      {/* 3D Screen Rotation Cylinder: */}
      <div 
        className="w-full flex-1 grid transition-transform duration-800 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{
          transformStyle: 'preserve-3d',
          transform: !isDrawing ? 'rotateY(-180deg)' : 'rotateY(0deg)'
        }}
      >

        {/* 
          1. PHYSICAL FRONT (RENDERED AS SHUFFLING ROULETTE)
          Painted symmetrically to mirror the other side for logical transitions
        */}
        <div 
          className="[grid-area:1/1] w-full h-full flex-1 flex flex-col items-center justify-center p-8 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white overflow-hidden relative"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Card Category Icon with Casino Pulse Animation */}
          <div className={`p-10 rounded-full mb-8 animate-pulse shadow-inner ${backTheme.bg}`}>
            <BackIconComponent className={`w-20 h-20 opacity-80 ${backTheme.text}`} strokeWidth={1.5} />
          </div>

          <div className="absolute top-8 inset-x-0 mx-auto w-max z-20">
             <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shrink-0 ${backTheme.bg} ${backTheme.text}`}>
               {backfaceCategory}
             </div>
          </div>
        </div>

        {/* 
          2. PHYSICAL BACK (RENDERED AS MAIN QUESTION)
          Rotated -180 Degrees ready to attack the screen upon 3S timeout completion!
        */}
        <div 
          className="[grid-area:1/1] w-full h-full flex-1 flex flex-col items-center p-8 md:p-10 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white relative overflow-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {/* Category Badge - Absolute Center Precision! */}
          <div className="absolute top-8 inset-x-0 mx-auto w-max z-20">
            <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shrink-0 ${theme.bg} ${theme.text}`}>
              {question?.category || 'KATEGORI'}
            </div>
          </div>

          {/* Wide Center Column - Collision prevention for heavy text questions */}
          <div className="w-full flex-1 flex flex-col justify-center items-center mt-14 mb-4 z-10 wrap-break-word max-w-70 md:max-w-sm mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-[1.65rem] font-extrabold text-slate-800 leading-snug tracking-tight text-center">
              {question?.text || ''}
            </h2>
          </div>

          {/* Watermark Icon Decoration */}
          <div className="absolute -bottom-4 right-4 opacity-[0.03] pointer-events-none transform -rotate-12 z-0">
            <IconComponent className="w-48 h-48 text-slate-900" strokeWidth={1} />
          </div>
        </div>

      </div>
    </div>
  )
}
