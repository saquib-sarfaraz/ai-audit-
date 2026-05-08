import { Outlet } from 'react-router-dom'

import { DashboardNavbar } from '@/components/dashboard-navbar'
import { Sidebar } from '@/components/sidebar'
import { useScrollToHash } from '@/hooks/use-scroll-to-hash'

export function DashboardLayout() {
  useScrollToHash()
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <DashboardNavbar />
      <div className="container flex gap-6 py-6">
        <aside className="hidden w-64 shrink-0 lg:block">
          <Sidebar />
        </aside>
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
