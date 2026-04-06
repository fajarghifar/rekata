import { InputHTMLAttributes, KeyboardEvent } from 'react'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: (value: string) => void
  onSubmit?: () => void
}

export default function Input({
  placeholder = '',
  value = '',
  onChange,
  onSubmit,
  maxLength = 15,
  disabled = false,
  className = '',
  ...props
}: InputProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSubmit) {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <input
      type="text"
      className={`
        w-full h-14 md:h-16 bg-slate-50 border border-slate-200/80 rounded-xl px-5
        text-sm md:text-base text-slate-800 font-semibold
        placeholder:text-slate-400 placeholder:font-medium
        outline-none
        focus:bg-white focus:border-sky-300 focus:ring-2 focus:ring-sky-100/50
        transition-all duration-200
        disabled:opacity-40 disabled:cursor-not-allowed
        ${className}
      `}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      onKeyDown={handleKeyDown}
      maxLength={maxLength}
      disabled={disabled}
      {...props}
    />
  )
}
