import { useEffect, useState, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const [show, setShow] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Ensure hydration mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  // Entry/exit animation management
  useEffect(() => {
    if (isOpen) {
      setShow(true)
    } else {
      const timer = setTimeout(() => setShow(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!show || !mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop (Glass Effect) */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Modal Content */}
      <div className={`
        relative w-full max-w-md bg-white rounded-3xl shadow-[0_16px_64px_rgba(0,0,0,0.1)]
        overflow-hidden transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${isOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-12 scale-95 opacity-0'}
      `}>
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100/50 hover:bg-slate-200 text-slate-500 transition-colors z-10 cursor-pointer"
          aria-label="Tutup Atribut Modal"
        >
          <X className="w-4 h-4" strokeWidth={2.5} />
        </button>

        <div className="p-1">
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
}
