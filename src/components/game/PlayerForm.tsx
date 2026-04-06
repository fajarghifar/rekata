import { useState } from 'react'
import Input from '../ui/Input'
import { Plus } from 'lucide-react'
import { Player } from '../../types'

interface PlayerFormProps {
  players: Player[]
  onAddPlayer: (name: string) => void
}

export default function PlayerForm({ players, onAddPlayer }: PlayerFormProps) {
  const [inputName, setInputName] = useState('')
  const [shake, setShake] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const trimmedName = inputName.trim()

  const handleInputChange = (val: string) => {
    setInputName(val)
    if (errorMsg) setErrorMsg('')
  }

  const handleAdd = () => {
    if (!trimmedName) return

    const isDuplicate = players.some(
      (p) => p.nama.toLowerCase() === trimmedName.toLowerCase()
    )

    if (isDuplicate) {
      setShake(true)
      setErrorMsg('Nama ini sudah digunakan')
      setTimeout(() => setShake(false), 500)
      return
    }

    onAddPlayer(trimmedName)
    setInputName('')
    setErrorMsg('')
  }

  return (
    <div className="w-full">
      <div className="flex gap-3">
        <div className={`flex-1 ${shake ? 'animate-shake' : ''}`}>
          <Input
            placeholder="Masukkan nama pemain..."
            value={inputName}
            onChange={handleInputChange}
            onSubmit={handleAdd}
          />
        </div>
        <button
          onClick={handleAdd}
          disabled={!trimmedName}
          className="
            shrink-0 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center
            bg-sky-500 text-white rounded-xl
            shadow-sm shadow-sky-500/20
            hover:bg-sky-600 hover:shadow-md hover:shadow-sky-500/30
            active:scale-95
            transition-all duration-200 cursor-pointer
            disabled:bg-slate-100 disabled:text-slate-300 disabled:shadow-none disabled:transform-none disabled:cursor-not-allowed
          "
          aria-label="Tambah pemain"
        >
          <Plus className="w-5 h-5" strokeWidth={2.5} />
        </button>
      </div>
      {/* Inline Error Message */}
      <div className={`overflow-hidden transition-all duration-300 ${errorMsg ? 'max-h-8 mt-1.5 opacity-100' : 'max-h-0 mt-0 opacity-0'}`}>
        <p className="text-[12px] font-semibold text-red-500 ml-1">
          {errorMsg}
        </p>
      </div>
    </div>
  )
}
