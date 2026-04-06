import { RotateCcw } from 'lucide-react'

export default function EmptyCard() {
  return (
    <div key="state-finished" className="w-full min-h-80 sm:min-h-115 md:min-h-130 flex-1 h-full flex flex-col items-center justify-center p-8 text-center animate-fade-in-up bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white overflow-hidden relative">
      <div className="w-16 h-16 shrink-0 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-6">
        <RotateCcw className="w-8 h-8" strokeWidth={2.5} />
      </div>
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight leading-tight mb-3">
        Permainan Selesai
      </h2>
      <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed px-4 md:px-6">
        Semua kartu telah dimainkan. Buka menu pengaturan di kanan atas untuk memulai ulang permainan.
      </p>
    </div>
  )
}
