import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface ChipProps {
  label: string
  colorIndex?: number
  delay?: number
  onRemove?: () => void
}

const AVATAR_COLORS = [
  { bg: 'bg-sky-100', text: 'text-sky-600' },
  { bg: 'bg-amber-100', text: 'text-amber-600' },
  { bg: 'bg-violet-100', text: 'text-violet-600' },
  { bg: 'bg-emerald-100', text: 'text-emerald-600' },
  { bg: 'bg-rose-100', text: 'text-rose-600' },
  { bg: 'bg-cyan-100', text: 'text-cyan-600' },
]

export default function Chip({ label, colorIndex = 0, delay = 0, onRemove }: ChipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)

  const color = AVATAR_COLORS[colorIndex % AVATAR_COLORS.length]
  const initial = label.charAt(0).toUpperCase()

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay + 30)
    return () => clearTimeout(timer)
  }, [delay])

  const handleRemove = () => {
    setIsRemoving(true)
    setTimeout(() => onRemove?.(), 200)
  }

  return (
    <div
      className={`
        group flex items-center justify-between gap-3
        bg-white
        pl-2.5 pr-3.5 py-2 rounded-xl
        border border-slate-200/80 hover:border-slate-300
        shadow-[0_1px_2px_rgba(0,0,0,0.02)]
        transition-all duration-200 cursor-default
        ${isRemoving
          ? 'opacity-0 scale-75 -translate-y-1'
          : isVisible
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-2 scale-95'
        }
      `}
    >
      <div className="flex items-center gap-2.5">
        <div className={`w-8 h-8 rounded-xl ${color.bg} flex items-center justify-center ${color.text} font-bold text-xs shrink-0`}>
          {initial}
        </div>
        <span className="font-extrabold text-sm text-slate-700">{label}</span>
      </div>
      
      <button
        onClick={handleRemove}
        className="ml-1.5 w-6 h-6 flex items-center justify-center rounded-lg text-slate-400 opacity-100 hover:text-red-500 hover:bg-red-50 transition-all duration-150 cursor-pointer"
        aria-label={`Hapus ${label}`}
      >
        <X className="w-4 h-4" strokeWidth={2.5} />
      </button>
    </div>
  )
}
