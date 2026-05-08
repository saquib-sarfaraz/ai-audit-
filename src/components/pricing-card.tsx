import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export type PricingCardModel = {
  name: string
  price: string
  caption?: string
  highlights: string[]
  cta: {
    label: string
    href: string
  }
  featured?: boolean
}

export function PricingCard({ plan }: { plan: PricingCardModel }) {
  return (
    <Card
      className={cn(
        'relative overflow-hidden p-6 shadow-subtle',
        plan.featured && 'border-primary/40 bg-gradient-to-br from-indigo-500/10 to-violet-500/10'
      )}
    >
      {plan.featured ? (
        <div className="absolute right-4 top-4 rounded-full border bg-background/70 px-2 py-1 text-[11px] font-medium shadow-subtle backdrop-blur">
          Recommended
        </div>
      ) : null}
      <div className="text-sm font-semibold">{plan.name}</div>
      <div className="mt-2 text-3xl font-semibold tracking-tight">{plan.price}</div>
      {plan.caption ? (
        <div className="mt-2 text-sm text-muted-foreground">{plan.caption}</div>
      ) : null}

      <div className="mt-6 grid gap-2 text-sm text-muted-foreground">
        {plan.highlights.map((h) => (
          <div key={h} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-emerald-600 dark:text-emerald-300" />
            <span>{h}</span>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Button asChild className="w-full" variant={plan.featured ? 'default' : 'outline'}>
          <Link to={plan.cta.href}>{plan.cta.label}</Link>
        </Button>
      </div>
    </Card>
  )
}
