import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type { AuditResults } from '@/types/results'
import { formatUsd } from '@/utils/format'

export function SummaryCards({ results }: { results: AuditResults }) {
  const savingsPct =
    results.totalCurrentMonthlyUsd > 0
      ? results.totalMonthlySavingsUsd / results.totalCurrentMonthlyUsd
      : 0

  const status =
    results.totalMonthlySavingsUsd <= 50 || savingsPct < 0.05
      ? 'optimized'
      : results.totalMonthlySavingsUsd >= 500 || savingsPct >= 0.2
        ? 'high'
        : 'moderate'

  return (
    <section id="overview" className="scroll-mt-24">
      <div className="grid gap-4 lg:grid-cols-4">
        <Card className="p-6 shadow-subtle lg:col-span-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-semibold">Estimated savings</div>
              <div className="mt-2 text-3xl font-semibold tracking-tight">
                {formatUsd(results.totalMonthlySavingsUsd)}
                <span className="ml-1 text-base font-normal text-muted-foreground">
                  /mo
                </span>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {formatUsd(results.totalAnnualSavingsUsd)} per year •{' '}
                {Math.round(savingsPct * 100)}% reduction
              </div>
            </div>
            <Badge
              variant={status === 'high' ? 'default' : status === 'moderate' ? 'secondary' : 'muted'}
              className="h-6"
            >
              {status === 'high'
                ? 'High opportunity'
                : status === 'moderate'
                  ? 'Room to optimize'
                  : 'You are optimized'}
            </Badge>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border bg-muted/30 p-4">
              <div className="text-xs text-muted-foreground">Current spend</div>
              <div className="mt-1 text-lg font-semibold">
                {formatUsd(results.totalCurrentMonthlyUsd)}
                <span className="ml-1 text-xs font-normal text-muted-foreground">
                  /mo
                </span>
              </div>
            </div>
            <div className="rounded-2xl border bg-muted/30 p-4">
              <div className="text-xs text-muted-foreground">Recommended</div>
              <div className="mt-1 text-lg font-semibold">
                {formatUsd(results.totalRecommendedMonthlyUsd)}
                <span className="ml-1 text-xs font-normal text-muted-foreground">
                  /mo
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-subtle">
          <div className="text-xs text-muted-foreground">Top drivers</div>
          <div className="mt-2 text-sm font-semibold">Downgrade & right-size</div>
          <div className="mt-2 text-sm text-muted-foreground">
            Suggested savings from seat counts and plan tiers.
          </div>
        </Card>

        <Card className="p-6 shadow-subtle">
          <div className="text-xs text-muted-foreground">Recommendations</div>
          <div className="mt-2 text-3xl font-semibold tracking-tight">
            {results.recommendations.length}
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            Prioritized next steps to execute.
          </div>
        </Card>
      </div>
    </section>
  )
}

