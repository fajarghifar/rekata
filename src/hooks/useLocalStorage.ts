import { useState, useEffect } from 'react'

/**
 * Custom hook untuk baca/tulis localStorage dengan auto-sync ke React state.
 *
 * @param key - Key localStorage (misal: 'rekata_players')
 * @param defaultValue - Nilai default jika key belum ada
 */
export default function useLocalStorage<T>(key: string, defaultValue: T): [T, (val: T | ((val: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      if (typeof window !== 'undefined') {
        const stored = window.localStorage.getItem(key)
        return stored !== null ? JSON.parse(stored) : defaultValue
      }
      return defaultValue
    } catch {
      return defaultValue
    }
  })

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value))
      }
    } catch {
      // localStorage is full or unavailable — fail silently
    }
  }, [key, value])

  return [value, setValue]
}
