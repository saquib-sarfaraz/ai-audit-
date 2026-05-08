import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { AuditResults } from '@/types/results'
import { formatUsd } from '@/utils/format'

export function OpportunityCta({ results }: { results: AuditResults }) {
  const pct =
    results.totalCurrentMonthlyUsd > 0
      ? results.totalMonthlySavingsUsd / results.totalCurrentMonthlyUsd
      : 0
  const isOptimized = results.totalMonthlySavingsUsd <= 50 || pct < 0.05
  const isHigh = results.totalMonthlySavingsUsd >= 500 || pct >= 0.2

  if (isOptimized) {
    return (
      <section className="mt-6">
        <Card className="flex flex-col gap-4 rounded-2xl border bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-6 shadow-subtle sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-background shadow-subtle">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
            </div>
            <div>
              <div className="text-sm font-semibold">You’re optimized</div>
              <div className="mt-1 text-sm text-muted-foreground">
                Low savings opportunity detected. Keep reviewing seats monthly and
                set budgets for usage-based tools.
              </div>
            </div>
          </div>
          <Button asChild variant="outline">
            <Link to="/audit">
              Run another audit <ArrowRight />
            </Link>
          </Button>
        </Card>
      </section>
    )
  }

  return (
    <section className="mt-6">
      <Card className="flex flex-col gap-4 rounded-2xl border bg-gradient-to-br from-indigo-500/10 to-violet-500/10 p-6 shadow-subtle sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-background shadow-subtle">
            <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
          </div>
          <div>
            <div className="text-sm font-semibold">
              {isHigh ? 'High savings opportunity' : 'Savings opportunity'}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              Estimated{' '}
              <span className="font-medium text-foreground">
                {formatUsd(results.totalMonthlySavingsUsd)}/mo
              </span>{' '}
              in savings. Share this report with your team and execute the top
              recommendations.
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link to={`/report/${results.id}`}>
              Share report <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/audit">Adjust inputs</Link>
          </Button>
        </div>
      </Card>
    </section>
  )
}

