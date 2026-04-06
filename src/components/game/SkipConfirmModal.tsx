import Modal from '../ui/Modal'
import { AlertTriangle } from 'lucide-react'

interface SkipConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function SkipConfirmModal({ isOpen, onClose, onConfirm }: SkipConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center pt-8 pb-4 px-2">
        <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-8 h-8" strokeWidth={2.5} />
        </div>
        
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight text-center mb-2">
          Lewati Pertanyaan?
        </h2>
        <p className="text-sm md:text-base text-slate-500 text-center font-medium max-w-xs mb-8">
          Pertanyaan ini akan dilewati. Giliran akan otomatis berpindah ke pemain selanjutnya.
        </p>

        <div className="w-full flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-14 md:h-16 text-sm md:text-base font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 h-14 md:h-16 text-sm md:text-base font-bold text-white bg-red-500 rounded-xl shadow-lg shadow-red-500/30 hover:bg-red-600 hover:shadow-red-500/40 active:scale-95 transition-all cursor-pointer"
          >
            Ya, Lewati
          </button>
        </div>
      </div>
    </Modal>
  )
}
