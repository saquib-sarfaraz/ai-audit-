import { AlertTriangle, CheckCircle2, Gauge, Layers3 } from 'lucide-react'

import { Card } from '@/components/ui/card'
import type { AuditResults } from '@/types/results'
import { formatCurrency } from '@/utils/format'

function countByType(results: AuditResults) {
  const counts = new Map<string, number>()
  for (const r of results.recommendations) {
    counts.set(r.type, (counts.get(r.type) ?? 0) + 1)
  }
  return counts
}

export function InsightsSection({ results }: { results: AuditResults }) {
  const counts = countByType(results)
  const topType =
    Array.from(counts.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'optimize'

  const risk =
    results.totalCurrentMonthlyUsd >= 1500
      ? 'High'
      : results.totalCurrentMonthlyUsd >= 600
        ? 'Medium'
        : 'Low'

  return (
    <section id="insights" className="mt-6 scroll-mt-24">
      <div className="mb-4">
        <div className="text-sm font-semibold">Optimization insights</div>
        <div className="text-sm text-muted-foreground">
          A quick readout you can drop into a finance update.
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-6 shadow-subtle">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Gauge className="h-4 w-4 text-muted-foreground" />
            Biggest lever
          </div>
          <div className="mt-3 text-sm text-muted-foreground">
            Most suggestions are in{' '}
            <span className="font-medium text-foreground">{topType}</span>.
          </div>
        </Card>

        <Card className="p-6 shadow-subtle">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Layers3 className="h-4 w-4 text-muted-foreground" />
            Quick wins
          </div>
          <div className="mt-3 text-sm text-muted-foreground">
            Target the top 2 recommendations first to capture savings quickly.
          </div>
        </Card>

        <Card className="p-6 shadow-subtle">
          <div className="flex items-center gap-2 text-sm font-semibold">
            {risk === 'High' ? (
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-300" />
            ) : (
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
            )}
            Spend risk
          </div>
          <div className="mt-3 text-sm text-muted-foreground">
            Risk: <span className="font-medium text-foreground">{risk}</span> •
            Current: <span className="font-medium text-foreground">{formatCurrency(results.totalCurrentMonthlyUsd)}/mo</span>
          </div>
        </Card>
      </div>
    </section>
  )
}

