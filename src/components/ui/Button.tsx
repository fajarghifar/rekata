import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  children?: ReactNode
}

export default function Button({
  variant = 'primary',
  disabled = false,
  className = '',
  children,
  onClick,
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-bold transition-all duration-200 cursor-pointer select-none'

  const variants = {
    primary: `
      bg-sky-500 text-white rounded-xl h-12 px-8 text-[15px]
      shadow-sm shadow-sky-500/20
      hover:bg-sky-600 hover:shadow-md hover:shadow-sky-500/30
      active:scale-[0.98] active:shadow-sm
    `,
    secondary: `
      bg-white text-slate-700 border flex items-center justify-center border-slate-200 rounded-xl h-12 px-8 text-[15px]
      shadow-sm
      hover:border-slate-300 hover:text-slate-900 hover:bg-slate-50
      active:scale-[0.98]
    `,
    ghost: `
      bg-transparent text-slate-500 rounded-xl px-4 py-2 text-sm
      hover:text-slate-800 hover:bg-slate-100/80
      active:scale-[0.98]
    `,
    danger: `
      bg-red-500 text-white rounded-xl h-12 px-8 text-[15px]
      shadow-sm shadow-red-500/20
      hover:bg-red-600
      active:scale-[0.98]
    `,
  }

  const disabledStyles = `
    !bg-slate-100 !text-slate-400 !shadow-none !border-transparent
    cursor-not-allowed pointer-events-none
  `

  const shimmer = variant === 'primary' && !disabled ? 'shimmer-btn' : ''

  return (
    <button
      className={`${base} ${variants[variant]} ${disabled ? disabledStyles : ''} ${shimmer} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
