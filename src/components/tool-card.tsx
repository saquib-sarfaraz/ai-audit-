import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export type ToolCardModel = {
  name: string
  description: string
  badge?: string
  accent: {
    from: string
    to: string
  }
}

export function ToolCard({ tool }: { tool: ToolCardModel }) {
  return (
    <Card className="group overflow-hidden shadow-subtle transition-transform hover:-translate-y-0.5">
      <div className="flex items-start gap-4 p-5">
        <div
          className={cn(
            'grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-sm font-semibold text-white shadow-subtle',
            tool.accent.from,
            tool.accent.to
          )}
          aria-hidden="true"
        >
          {tool.name.slice(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="truncate text-sm font-semibold">{tool.name}</div>
            {tool.badge ? (
              <Badge variant="secondary" className="h-5 px-2 text-[11px]">
                {tool.badge}
              </Badge>
            ) : null}
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            {tool.description}
          </div>
        </div>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent opacity-60" />
      <div className="p-5 pt-4 text-xs text-muted-foreground">
        Track seats, plan tier, and cost-per-seat to identify easy savings.
      </div>
    </Card>
  )
}

