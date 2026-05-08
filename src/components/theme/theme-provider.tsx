import * as React from 'react'

import { useThemeStore } from '@/lib/stores/theme-store'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const mode = useThemeStore((s) => s.mode)

  React.useEffect(() => {
    const root = window.document.documentElement
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const apply = () => {
      const isDark = mode === 'dark' || (mode === 'system' && media.matches)
      root.classList.toggle('dark', isDark)
    }

    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [mode])

  return <>{children}</>
}

