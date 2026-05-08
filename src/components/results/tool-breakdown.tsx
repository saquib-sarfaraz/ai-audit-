import { ArrowDown, ArrowRight } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type { AuditResults } from '@/types/results'
import { formatUsd } from '@/utils/format'

export function ToolBreakdown({ results }: { results: AuditResults }) {
  const items = results.perTool

  return (
    <section aria-label="Savings breakdown" className="mt-6">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">Savings breakdown</div>
          <div className="text-sm text-muted-foreground">
            Per-tool current vs recommended spend.
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((t) => {
          const pct =
            t.currentMonthlySpendUsd > 0
              ? t.monthlySavingsUsd / t.currentMonthlySpendUsd
              : 0
          return (
            <Card key={t.toolId} className="p-5 shadow-subtle">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold">{t.toolId}</div>
                    {t.monthlySavingsUsd > 0 ? (
                      <Badge variant="secondary" className="h-5 text-[11px]">
                        {Math.round(pct * 100)}% savings
                      </Badge>
                    ) : (
                      <Badge variant="muted" className="h-5 text-[11px]">
                        Optimized
                      </Badge>
                    )}
                  </div>
                  {t.notes.length > 0 ? (
                    <div className="mt-2 text-sm text-muted-foreground">
                      {t.notes.join(' ')}
                    </div>
                  ) : (
                    <div className="mt-2 text-sm text-muted-foreground">
                      No major issues detected for this tool.
                    </div>
                  )}
                </div>

                <div className="shrink-0 text-right">
                  <div className="text-xs text-muted-foreground">Savings</div>
                  <div className="mt-1 text-lg font-semibold tracking-tight">
                    {formatUsd(t.monthlySavingsUsd)}
                    <span className="ml-1 text-xs font-normal text-muted-foreground">
                      /mo
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Current</span>
                  <span className="font-medium text-foreground">
                    {formatUsd(t.currentMonthlySpendUsd)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    Recommended <ArrowRight className="h-3 w-3" />
                  </span>
                  <span className="font-medium text-foreground">
                    {formatUsd(t.recommendedMonthlySpendUsd)}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
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
                <div className="text-xs text-muted-foreground">
                  <ArrowDown className="mr-1 inline-block h-3 w-3" />
                  Lower is better.
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

