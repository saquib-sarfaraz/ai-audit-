import { Outlet } from 'react-router-dom'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useScrollToHash } from '@/hooks/use-scroll-to-hash'

export function MarketingLayout() {
  useScrollToHash()
  return (
    <div className="min-h-dvh bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
