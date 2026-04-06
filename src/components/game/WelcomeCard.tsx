import Button from '../ui/Button'
import { MessageSquare } from 'lucide-react'

interface WelcomeCardProps {
  onStart: () => void
}

export default function WelcomeCard({ onStart }: WelcomeCardProps) {
  return (
    <div key="state-welcome" className="w-full min-h-80 sm:min-h-115 md:min-h-130 flex-1 h-full flex flex-col items-center justify-center p-8 md:p-10 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white text-center relative overflow-hidden">
      {/* Ambient Graphic Elements */}
      <div className="w-16 h-16 shrink-0 bg-indigo-100 text-indigo-500 rounded-2xl flex items-center justify-center mb-6 rotate-3">
        <MessageSquare className="w-8 h-8" strokeWidth={2} />
      </div>
      {/* Core Typography */}
      <div className="flex flex-col gap-2 mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight leading-tight">
          Mulai Permainan?
        </h2>
        <p className="text-sm md:text-base text-slate-500 px-4 md:px-6 leading-relaxed font-medium">
          Tekan tombol di bawah untuk membuka kartu pertama.
        </p>
      </div>
      <div className="mt-10">
        {/* Primary Action Trigger */}
        <Button
          onClick={onStart}
          className="w-full sm:w-auto px-10 h-14 md:h-16 font-bold text-sm md:text-base shadow-lg shadow-indigo-500/30 group-hover:-translate-y-1 transition-all duration-300"
        >
          Mulai
        </Button>
      </div>
    </div>
  )
}
