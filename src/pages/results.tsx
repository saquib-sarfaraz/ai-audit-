import * as React from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, RefreshCcw } from 'lucide-react'

import { ChartsSection } from '@/components/results/charts-section'
import { DashboardSkeleton } from '@/components/results/dashboard-skeleton'
import { InsightsSection } from '@/components/results/insights-section'
import { OpportunityCta } from '@/components/results/opportunity-cta'
import { RecommendationsSection } from '@/components/results/recommendations-section'
import { ShareSection } from '@/components/results/share-section'
import { SummaryCards } from '@/components/results/summary-cards'
import { ToolBreakdown } from '@/components/results/tool-breakdown'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAuditStore } from '@/lib/stores/audit-store'
import { runMockAudit } from '@/utils/mock-audit'

export function ResultsPage() {
  const input = useAuditStore((s) => s.input)
  const results = useAuditStore((s) => s.results)
  const setResults = useAuditStore((s) => s.setResults)

  const [loading, setLoading] = React.useState(false)

  const generate = () => {
    setLoading(true)
    window.setTimeout(() => {
      setResults(runMockAudit(input))
      setLoading(false)
    }, 450)
  }

  if (loading) {
    return (
      <div className="animate-in fade-in-0 duration-300">
        <DashboardSkeleton />
      </div>
    )
  }

  if (!results) {
    return (
      <div className="grid gap-6">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Audit dashboard
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Run an audit to generate savings estimates and recommendations.
            </p>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <Button asChild className="w-full sm:w-auto">
              <Link to="/audit">Start audit</Link>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={generate}
              className="w-full sm:w-auto"
            >
              Load demo data
            </Button>
          </div>
        </div>

        <Card className="rounded-2xl border bg-muted/30 p-6 text-sm text-muted-foreground shadow-subtle">
          No results yet. Your audit will be saved in localStorage, so you can
          come back and iterate.
        </Card>
      </div>
    )
  }

  if (!results.perTool || results.perTool.length === 0) {
    return (
      <Card className="p-6 shadow-subtle">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-muted">
            <AlertTriangle className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <div className="text-sm font-semibold">Something went wrong</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Results exist but have no tool entries. Try regenerating.
            </div>
            <div className="mt-4">
              <Button onClick={generate} type="button">
                <RefreshCcw /> Regenerate
              </Button>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 animate-in fade-in-0 duration-300">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Audit dashboard
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Generated from saved inputs. Adjust the audit to refine savings.
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link to="/audit">Edit inputs</Link>
          </Button>
          <Button onClick={generate} type="button" className="w-full sm:w-auto">
            <RefreshCcw /> Refresh
          </Button>
        </div>
      </div>

      <SummaryCards results={results} />
      <OpportunityCta results={results} />
      <ToolBreakdown results={results} />
      <RecommendationsSection results={results} />
      <ChartsSection results={results} />
      <InsightsSection results={results} />
      <ShareSection results={results} />
    </div>
  )
}
