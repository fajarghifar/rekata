import { ReactNode } from 'react'
import { Settings, ArrowLeft } from 'lucide-react'

interface LayoutProps {
  mode?: 'lobby' | 'game'
  showBack?: boolean
  showSettings?: boolean
  onBack?: () => void
  onOpenSettings?: () => void
  children: ReactNode
}

export default function Layout({
  mode = 'lobby',
  showBack = false,
  showSettings = false,
  onBack,
  onOpenSettings,
  children,
}: LayoutProps) {
  return (
    <div className="h-dvh flex flex-col items-center px-4 overflow-hidden bg-[#fafafa] relative">

      {/* Subtle App Glow Orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-100 h-100 bg-sky-200/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-75 h-75 bg-indigo-200/15 rounded-full blur-[60px] pointer-events-none" />

      {/* Floating Header Protocol: Detached from flow. Using absolute to ensure True Visual Center on Viewport, while avoiding overlaps with safe paddings later. */}
      <div className="absolute top-0 w-full max-w-3xl px-4 md:px-0 flex items-center justify-between py-6 z-20">
        <div className="w-12">
          {showBack && (
            <button
              onClick={onBack}
              className="p-2 -ml-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100/80 active:scale-95 transition-all duration-200 backdrop-blur-sm cursor-pointer"
              aria-label="Kembali"
            >
              <ArrowLeft className="w-5.5 h-5.5" strokeWidth={1.5} />
            </button>
          )}
        </div>

        {/* Dynamic Center Logo if Mode === Game */}
        <div className="flex-1 flex justify-center fade-in duration-300">
          {mode === 'game' && (
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight select-none">
              rekata<span className="text-sky-500">.</span>
            </h1>
          )}
        </div>

        <div className="w-12 flex justify-end">
          {showSettings && (
            <button
              onClick={onOpenSettings}
              className="p-2 -mr-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100/80 active:scale-95 transition-all duration-200 backdrop-blur-sm cursor-pointer"
              aria-label="Pengaturan"
            >
              <Settings className="w-5.5 h-5.5" strokeWidth={1.5} />
            </button>
          )}
        </div>
      </div>

      {/* Main Content Centered with Safe Vertical Padding: No-Scroll Bounds Protected */}
      <div className="w-full max-w-2xl flex-1 flex flex-col relative z-10 animate-fade-in-up pt-28 pb-10" style={{ animationDelay: '50ms' }}>

        {/* Compact Hero Header (Only in Lobby mode) */}
        {mode === 'lobby' && (
          <div className="text-center mb-16 md:mb-20 transition-all duration-300 shrink-0">
            <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              rekata<span className="text-sky-500">.</span>
            </h1>
            <p className="text-slate-400/90 text-sm font-medium mt-1 mb-0 mx-auto tracking-wide">
              Persiapkan diri untuk percakapan yang lebih bermakna
            </p>
          </div>
        )}

        {/* Dynamic App Layout View Container */}
        <div className="w-full flex justify-center">
          {children}
        </div>

      </div>
    </div>
  )
}
