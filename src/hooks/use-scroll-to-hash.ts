import * as React from 'react'
import { useLocation } from 'react-router-dom'

export function useScrollToHash() {
  const location = useLocation()
  const lastHash = React.useRef<string>('')

  React.useEffect(() => {
    if (!location.hash) return
    const hash = location.hash.replace('#', '')
    if (!hash) return
    if (lastHash.current === hash) return

    const scroll = () => {
      const el = document.getElementById(hash)
      if (!el) return false
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return true
    }

    if (scroll()) {
      lastHash.current = hash
      return
    }

    const t = window.setTimeout(() => {
      if (scroll()) lastHash.current = hash
    }, 80)

    return () => window.clearTimeout(t)
  }, [location.hash])
}

