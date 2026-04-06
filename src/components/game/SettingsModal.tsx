import { useState } from 'react'
import Modal from '../ui/Modal'
import { Settings2, RotateCcw, Globe, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { GameSettings } from '../../types'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  settings: GameSettings
  onUpdateSettings: (settings: GameSettings) => void
  onResetCards: () => void
}

export default function SettingsModal({ isOpen, onClose, settings, onUpdateSettings, onResetCards }: SettingsModalProps) {
  const isFairMode = settings.orderMode === 'fair-round-robin'
  const [isConfirmingReset, setIsConfirmingReset] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false) // Custom State Reset Sequencer

  const handleToggleMode = () => {
    onUpdateSettings({
      ...settings,
      orderMode: isFairMode ? 'random' : 'fair-round-robin',
    })
  }

  const confirmResetAction = () => {
    onResetCards()
    setIsConfirmingReset(false)
    setIsSuccess(true)
    setTimeout(() => {
      setIsSuccess(false)
      onClose()
    }, 2500)
  }

  // Effect to reset internal state when modal opens/closes
  if (!isOpen && isConfirmingReset) {
    setIsConfirmingReset(false)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col pt-6 pb-3 px-5">

        {/* Title (Strong Hierarchy: Left-Aligned) */}
        <div className="w-full text-left mb-6 pl-1">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-none">Pengaturan</h2>
          <p className="text-xs font-bold text-slate-400 mt-1.5 uppercase tracking-widest">Sistem & Preferensi</p>
        </div>

        {/* Modal List Area */}
        <div className="w-full flex flex-col gap-6">

          {/* ================ GENERAL PREFERENCES GROUP ================ */}
          <div className="bg-slate-50/70 border border-slate-100 rounded-2xl overflow-hidden shadow-sm">

            {/* Turn System Toggle */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200/60">
              <div className="flex items-center gap-3.5 pr-2">
                <div className="w-10 h-10 bg-white shadow-sm border border-slate-100 text-sky-500 rounded-xl flex items-center justify-center shrink-0">
                  <Settings2 className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="font-bold text-sm md:text-base text-slate-800 leading-tight">Sistem Giliran</p>
                  <p className="text-xs font-medium text-slate-400 mt-0.5 max-w-50">
                    {isFairMode ? 'Semua mendapat jatah adil.' : 'Pemain dipilih secara acak.'}
                  </p>
                </div>
              </div>

              {/* Custom Minimalist Toggle Switch */}
              <button
                onClick={handleToggleMode}
                className={`
                  w-11 h-6 flex items-center shrink-0 rounded-full transition-colors duration-300 p-1 cursor-pointer
                  ${isFairMode ? 'bg-sky-500' : 'bg-slate-200'}
                `}
                aria-label="Toggle Mode Giliran"
              >
                <div className={`
                  bg-white w-5 h-5 rounded-full shadow-sm transform transition-transform duration-300
                  ${isFairMode ? 'translate-x-4.5' : 'translate-x-0'}
                `} />
              </button>
            </div>

            {/* Language (Disabled) */}
            <div className="flex items-center justify-between p-4 opacity-70">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 bg-slate-100/80 text-slate-400 rounded-xl flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="font-bold text-sm md:text-base text-slate-800 leading-tight">Bahasa</p>
                  <p className="text-xs font-medium text-slate-400 mt-0.5">Hanya bahasa Indonesia</p>
                </div>
              </div>
              <span className="text-xs px-3 py-1 bg-slate-200/50 rounded-md font-bold text-slate-500 uppercase tracking-widest shrink-0">ID</span>
            </div>

          </div>

          {/* ================ DANGER ZONE ================ */}
          <div className={`border rounded-2xl overflow-hidden shadow-sm transition-colors duration-500 ${isSuccess ? 'bg-emerald-50/80 border-emerald-200' : 'bg-red-50/40 border-red-100'}`}>
            {isSuccess ? (
              <div className="w-full flex items-center justify-center gap-3 p-5 my-2 animate-fade-in text-emerald-600">
                <CheckCircle2 className="w-6 h-6 shrink-0" strokeWidth={2.5} />
                <p className="font-extrabold text-sm tracking-wide">Data Berhasil Direset!</p>
              </div>
            ) : !isConfirmingReset ? (
              <button
                onClick={() => setIsConfirmingReset(true)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-red-50 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3.5 pr-2">
                  <div className="w-10 h-10 bg-white shadow-sm border border-red-100 text-red-500 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:text-red-500 transition-all duration-300">
                    <RotateCcw className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="font-bold text-sm md:text-base text-red-500 group-hover:text-red-600 leading-tight transition-colors">
                      Reset Data Permainan
                    </p>
                    <p className="text-xs font-medium text-red-400/80 mt-0.5 leading-relaxed pr-2">
                      Hapus riwayat kartu yang dimainkan dan mulai dari awal.
                    </p>
                  </div>
                </div>
              </button>
            ) : (
              <div className="w-full flex flex-col gap-3.5 p-4 bg-red-50/60 animate-fade-in-up">
                <div className="flex items-start gap-3 text-red-600">
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" strokeWidth={2} />
                  <div>
                     <p className="text-sm md:text-base leading-tight font-extrabold tracking-tight">Menghapus Seluruh Riwayat?</p>
                     <p className="text-xs leading-relaxed font-semibold text-red-500/80 mt-1">
                       Aksi ini paksa melupakan seluruh memori kartu pemain yang tersimpan dalam ronde ini!
                     </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => setIsConfirmingReset(false)}
                    className="flex-1 py-2.5 text-xs md:text-sm font-extrabold text-slate-500 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-700 transition-colors cursor-pointer"
                  >
                    Batalkan
                  </button>
                  <button
                    onClick={confirmResetAction}
                    className="flex-1 py-2.5 text-xs md:text-sm font-extrabold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors shadow-[0_4px_12px_rgba(239,68,68,0.3)] hover:shadow-[0_6px_16px_rgba(239,68,68,0.4)] cursor-pointer"
                  >
                    Ya, Eksekusi!
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </Modal>
  )
}
