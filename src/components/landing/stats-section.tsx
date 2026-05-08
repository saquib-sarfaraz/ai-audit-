import { Card } from '@/components/ui/card'

const stats = [
  { label: 'Median savings', value: '18–32%' },
  { label: 'Audit time', value: '< 2 min' },
  { label: 'Tools supported', value: '8+' },
  { label: 'Seats optimized', value: 'Up to 45%' },
]

export function StatsSection() {
  return (
    <section className="container py-12 sm:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Savings you can forecast
        </h2>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Get clean monthly and annual estimates, plus a breakdown of where the
          wins come from.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-6 shadow-subtle">
            <div className="text-3xl font-semibold tracking-tight">
              {s.value}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
          </Card>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border bg-gradient-to-br from-indigo-500/10 to-violet-500/10 p-6 shadow-subtle sm:p-8">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="text-sm font-semibold">Example outcome</div>
            <p className="mt-2 text-sm text-muted-foreground">
              A 25-person product team reduced AI spend by consolidating tools
              and adjusting plan tiers—without losing core workflows.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl border bg-background/60 p-4">
              <div className="text-xs text-muted-foreground">Monthly</div>
              <div className="mt-1 text-lg font-semibold">$1,240</div>
            </div>
            <div className="rounded-2xl border bg-background/60 p-4">
              <div className="text-xs text-muted-foreground">Annual</div>
              <div className="mt-1 text-lg font-semibold">$14,880</div>
            </div>
            <div className="rounded-2xl border bg-background/60 p-4">
              <div className="text-xs text-muted-foreground">Tools</div>
              <div className="mt-1 text-lg font-semibold">3 → 2</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

