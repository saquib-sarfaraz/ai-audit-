import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import { AlertTriangle, ExternalLink } from 'lucide-react'

import { ChartsSection } from '@/components/results/charts-section'
import { RecommendationsSection } from '@/components/results/recommendations-section'
import { SummaryCards } from '@/components/results/summary-cards'
import { ToolBreakdown } from '@/components/results/tool-breakdown'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAuditStore } from '@/lib/stores/audit-store'
import { runMockAudit } from '@/utils/mock-audit'

export function ReportPage() {
  const { id } = useParams()
  const input = useAuditStore((s) => s.input)
  const results = useAuditStore((s) => s.results)
  const setResults = useAuditStore((s) => s.setResults)

  const generate = () => setResults(runMockAudit(input))

  if (!results) {
    return (
      <Card className="p-6 shadow-subtle">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold">Report not found</div>
            <div className="mt-2 text-sm text-muted-foreground">
              This frontend MVP stores reports locally in your browser. Run an
              audit or generate a demo report.
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Button asChild>
                <Link to="/audit">Start audit</Link>
              </Button>
              <Button variant="outline" onClick={generate} type="button">
                Generate demo report
              </Button>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  if (id && results.id !== id) {
    return (
      <Card className="p-6 shadow-subtle">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-muted">
            <AlertTriangle className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <div className="text-sm font-semibold">Report ID mismatch</div>
            <div className="mt-2 text-sm text-muted-foreground">
              Requested report <span className="font-mono">{id}</span>, but your
              local dashboard has <span className="font-mono">{results.id}</span>.
              Generate a new report to match this link.
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Button onClick={generate} type="button">
                Generate report
              </Button>
              <Button asChild variant="outline">
                <Link to="/results">
                  Back to dashboard <ExternalLink />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Shared report</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Read-only summary of the audit dashboard.
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link to="/audit">Start your own audit</Link>
          </Button>
          <Button asChild className="w-full sm:w-auto">
            <Link to="/results">Open dashboard</Link>
          </Button>
        </div>
      </div>

      <SummaryCards results={results} />
      <ToolBreakdown results={results} />
      <RecommendationsSection results={results} />
      <ChartsSection results={results} />
    </div>
  )
}
