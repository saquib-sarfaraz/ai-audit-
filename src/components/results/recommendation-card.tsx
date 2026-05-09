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
    <Card className="group overflow-hidden p-6 shadow-sm border-primary/5 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-background to-muted/20">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-background shadow-sm border border-border/50',
                meta.className
              )}
            >
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-base font-semibold tracking-tight">{rec.title}</div>
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="text-[10px] font-medium tracking-wide uppercase bg-background">
                  {meta.label}
                </Badge>
                <Badge variant={impactVariant[rec.impact]} className="text-[10px] font-medium tracking-wide uppercase">
                  {rec.impact} impact
                </Badge>
                {rec.toolId ? (
                  <Badge variant="muted" className="text-[10px] font-medium tracking-wide uppercase bg-background">
                    {rec.toolId.replace(/_/g, ' ')}
                  </Badge>
                ) : null}
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{rec.description}</p>
        </div>

        <div className="shrink-0 text-right ml-4">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Est. savings</div>
          <div className="mt-1 text-2xl font-bold tracking-tight text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {formatUsd(rec.estimatedMonthlySavingsUsd)}
            <span className="ml-1 text-sm font-normal opacity-80">/mo</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

