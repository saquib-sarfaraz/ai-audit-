import { ArrowDownRight, Lightbulb, Repeat2, Shield, Sparkles } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Recommendation } from '@/types/results'
import { formatUsd } from '@/utils/format'

const typeMeta: Record<
  Recommendation['type'],
  { label: string; icon: typeof Sparkles; className: string }
> = {
  downgrade: { label: 'Downgrade', icon: ArrowDownRight, className: 'text-amber-600 dark:text-amber-300' },
  consolidate: { label: 'Consolidate', icon: Repeat2, className: 'text-indigo-600 dark:text-indigo-300' },
  alternative: { label: 'Alternative', icon: Sparkles, className: 'text-violet-600 dark:text-violet-300' },
  optimize: { label: 'Optimize', icon: Lightbulb, className: 'text-emerald-600 dark:text-emerald-300' },
  budget: { label: 'Budget', icon: Shield, className: 'text-sky-600 dark:text-sky-300' },
}

const impactVariant: Record<Recommendation['impact'], 'default' | 'secondary' | 'muted'> = {
  high: 'default',
  medium: 'secondary',
  low: 'muted',
}

export function RecommendationCard({ rec }: { rec: Recommendation }) {
  const meta = typeMeta[rec.type]
  const Icon = meta.icon

  return (
    <Card className="group overflow-hidden p-5 shadow-subtle transition-transform hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'grid h-9 w-9 place-items-center rounded-2xl bg-muted/50',
                meta.className
              )}
            >
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{rec.title}</div>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="text-[11px]">
                  {meta.label}
                </Badge>
                <Badge variant={impactVariant[rec.impact]} className="text-[11px]">
                  {rec.impact.toUpperCase()} impact
                </Badge>
                {rec.toolId ? (
                  <Badge variant="muted" className="text-[11px]">
                    {rec.toolId}
                  </Badge>
                ) : null}
              </div>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{rec.description}</p>
        </div>

        <div className="shrink-0 text-right">
          <div className="text-xs text-muted-foreground">Est. savings</div>
          <div className="mt-1 text-lg font-semibold tracking-tight">
            {formatUsd(rec.estimatedMonthlySavingsUsd)}
            <span className="ml-1 text-xs font-normal text-muted-foreground">/mo</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

