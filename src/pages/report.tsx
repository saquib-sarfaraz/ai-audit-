import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import { AlertTriangle, ExternalLink } from 'lucide-react'

import { ChartsSection } from '@/components/results/charts-section'
import { RecommendationsSection } from '@/components/results/recommendations-section'
import { SummaryCards } from '@/components/results/summary-cards'
import { ToolBreakdown } from '@/components/results/tool-breakdown'
import { DashboardSkeleton } from '@/components/results/dashboard-skeleton'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { LeadCaptureModal } from '@/components/results/lead-capture-modal'
import { getReport, generateAiSummary } from '@/lib/api'
import type { AuditResults } from '@/types/results'

export function ReportPage() {
  const { id } = useParams()
  const [results, setResults] = React.useState<AuditResults | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')
  const [summary, setSummary] = React.useState('')
  const didLoad = React.useRef(false)

  React.useEffect(() => {
    if (didLoad.current) return
    didLoad.current = true
    
    async function load() {
      if (!id) return
      try {
        setLoading(true)
        // Note: AI Summary is now generated synchronously before navigation in audit-form.tsx
        
        const res = await getReport(id)
        if (res.success) {
          const d = res.data
          
          // If summary is null, attempt to trigger generation one more time synchronously
          let currentSummary = d.summary
          if (!currentSummary) {
             try {
               const sumRes = await generateAiSummary(id)
               if (sumRes.success && sumRes.data.summary) {
                 currentSummary = sumRes.data.summary
               }
             } catch (e) {
               console.warn("Secondary summary attempt failed:", e)
             }
          }

          const mapped: AuditResults = {
            id: d.reportId,
            generatedAtIso: d.createdAt || new Date().toISOString(),
            totalCurrentMonthlyUsd: d.monthlySpend,
            totalMonthlySavingsUsd: d.monthlySavings,
            totalAnnualSavingsUsd: d.annualSavings,
            totalRecommendedMonthlyUsd: d.monthlySpend - d.monthlySavings,
            perTool: (d.tools || []).map((t: any) => ({
              toolId: t.toolId || (t.name ? t.name.toLowerCase().replace(/\s+/g, '_') : 'unknown'),
              currentMonthlySpendUsd: t.currentMonthlySpendUsd || t.monthlySpend || 0,
              recommendedMonthlySpendUsd: t.recommendedMonthlySpendUsd || t.monthlySpend || 0,
              monthlySavingsUsd: t.monthlySavingsUsd || 0,
              notes: t.notes || []
            })),
            recommendations: (d.recommendations || []).map((r: any, i: number) => ({
              id: `rec-${i}`,
              type: 'optimize',
              impact: r.estimatedMonthlySavings > 50 ? 'high' : 'medium',
              title: r.action || 'Optimization',
              description: r.description,
              toolId: r.tool?.toLowerCase().replace(/\s+/g, '_'),
              estimatedMonthlySavingsUsd: r.estimatedMonthlySavings || 0
            }))
          }
          setResults(mapped)
          setSummary(currentSummary || '')
        }
      } catch (err) {
        setError('Failed to load report')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) {
    return (
      <div className="animate-in fade-in-0 duration-300">
        <DashboardSkeleton />
      </div>
    )
  }

  if (error || !results) {
    return (
      <Card className="p-6 shadow-subtle">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold">Report not found</div>
            <div className="mt-2 text-sm text-muted-foreground">
              {error || 'Could not find the requested report.'}
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Button asChild>
                <Link to="/audit">Start audit</Link>
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
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:w-auto">
          {id && <LeadCaptureModal reportId={id} />}
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link to="/audit">Start your own audit</Link>
          </Button>
          <Button asChild className="w-full sm:w-auto">
            <Link to="/results">Open dashboard</Link>
          </Button>
        </div>
      </div>

      <Card className="p-6 bg-indigo-500/5 border-indigo-500/10">
        <h3 className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">AI Executive Assessment</h3>
        <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
          {summary || 'AI-generated summary assessment unavailable.'}
        </p>
      </Card>

      <SummaryCards results={results} />
      <ToolBreakdown results={results} />
      <RecommendationsSection results={results} />
      <ChartsSection results={results} />
    </div>
  )
}
