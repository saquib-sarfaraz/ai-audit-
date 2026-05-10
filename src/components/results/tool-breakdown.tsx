import { ArrowDown, ArrowRight } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type { AuditResults } from '@/types/results'
import { formatCurrency } from '@/utils/format'

export function ToolBreakdown({ results }: { results: AuditResults }) {
  const items = results.perTool

  return (
    <section aria-label="Savings breakdown" className="mt-8">
      <div className="mb-6 flex items-end justify-between gap-3">
        <div>
          <div className="text-lg font-bold tracking-tight">Savings breakdown</div>
          <div className="text-sm text-muted-foreground mt-1">
            Per-tool current vs recommended spend.
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {items.map((t, i) => {
          const pct =
            t.currentMonthlySpendUsd > 0
              ? t.monthlySavingsUsd / t.currentMonthlySpendUsd
              : 0
              
          // Make toolId look like a proper name
          const toolName = t.toolId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

          return (
            <Card key={`${t.toolId}-${i}`} className="p-6 shadow-sm border-primary/5 hover:border-primary/20 transition-all duration-300 bg-gradient-to-br from-background to-muted/20 group">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <div className="text-base font-semibold tracking-tight">{toolName}</div>
                    {t.monthlySavingsUsd > 0 ? (
                      <Badge variant="secondary" className="h-6 px-2 text-xs font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 dark:bg-emerald-500/20 hover:bg-emerald-500/20">
                        {Math.round(pct * 100)}% savings
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="h-6 px-2 text-xs font-medium text-muted-foreground border-border/50">
                        Optimized
                      </Badge>
                    )}
                  </div>
                  {t.notes.length > 0 ? (
                    <div className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {t.notes.join(' ')}
                    </div>
                  ) : (
                    <div className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      Optimized for current usage.
                    </div>
                  )}
                </div>

                <div className="shrink-0 text-right">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Savings</div>
                  <div className="mt-1 text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform origin-right">
                    {formatCurrency(t.monthlySavingsUsd)}
                    <span className="ml-1 text-sm font-normal opacity-80">
                      /mo
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Current</span>
                  <span className="font-semibold text-foreground">
                    {formatCurrency(t.currentMonthlySpendUsd)}
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-muted/50 border border-primary/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500"
                    style={{
                      width: `${
                        t.currentMonthlySpendUsd === 0
                          ? 0
                          : Math.max(
                              4,
                              Math.min(
                                100,
                                (t.recommendedMonthlySpendUsd /
                                  t.currentMonthlySpendUsd) *
                                  100
                              )
                            )
                      }%`,
                    }}
                    aria-hidden="true"
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                    Recommended <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(t.recommendedMonthlySpendUsd)}
                  </span>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

