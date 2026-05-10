import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type { AuditResults } from '@/types/results'
import { formatCurrency } from '@/utils/format'

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
      <div className="grid gap-4">
        <Card className="relative overflow-hidden p-6 shadow-subtle border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Estimated savings</div>
              <div className="mt-2 text-4xl font-bold tracking-tight text-foreground">
                {formatCurrency(results.totalMonthlySavingsUsd)}
                <span className="ml-1 text-lg font-normal text-muted-foreground">
                  /mo savings
                </span>
              </div>
              <div className="mt-2 text-sm text-emerald-600/80 dark:text-emerald-400/80 font-medium">
                {results.totalMonthlySavingsUsd === 0 ? "Already optimized" : "Available to capture"}
              </div>
            </div>
            <Badge
              variant={status === 'high' ? 'default' : status === 'moderate' ? 'secondary' : 'muted'}
              className="h-6 shadow-sm"
            >
              {status === 'high'
                ? 'High opportunity'
                : status === 'moderate'
                  ? 'Room to optimize'
                  : 'You are optimized'}
            </Badge>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border bg-background/50 p-4 shadow-sm backdrop-blur-sm">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Current spend</div>
              <div className="mt-2 text-xl font-semibold text-foreground">
                {formatCurrency(results.totalCurrentMonthlyUsd)}
                <span className="ml-1 text-sm font-normal text-muted-foreground">
                  /mo
                </span>
              </div>
            </div>
            <div className="rounded-xl border bg-background/50 p-4 shadow-sm backdrop-blur-sm border-emerald-500/20">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Recommended</div>
              <div className="mt-2 text-xl font-semibold text-emerald-600 dark:text-emerald-400">
                {formatCurrency(results.totalRecommendedMonthlyUsd)}
                <span className="ml-1 text-sm font-normal opacity-80">
                  /mo
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

