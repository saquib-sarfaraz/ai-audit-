import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { ThemeProvider } from '@/components/theme/theme-provider'
import { DashboardLayout } from '@/layouts/dashboard-layout'
import { MarketingLayout } from '@/layouts/marketing-layout'
import { AuditPage } from '@/pages/audit'
import { LandingPage } from '@/pages/landing'
import { ReportPage } from '@/pages/report'
import { ResultsPage } from '@/pages/results'

const router = createBrowserRouter([
  {
    element: <MarketingLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'audit', element: <AuditPage /> },
    ],
  },
  {
    element: <DashboardLayout />,
    children: [
      { path: 'results', element: <ResultsPage /> },
      { path: 'report/:id', element: <ReportPage /> },
    ],
  },
])

export function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
