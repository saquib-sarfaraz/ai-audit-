import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { ThemeMode } from '@/types/theme'

type ThemeState = {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
  toggle: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'system',
      setMode: (mode) => set({ mode }),
      toggle: () => {
        const current = get().mode
        const next =
          current === 'dark' ? 'light' : current === 'light' ? 'system' : 'dark'
        set({ mode: next })
      },
    }),
    { name: 'ai-audit:theme' }
  )
)

