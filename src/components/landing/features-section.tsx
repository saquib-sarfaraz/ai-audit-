import {
  BarChart3,
  CheckCircle2,
  Layers3,
  Sparkles,
  Users,
  Wallet,
} from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    title: 'Audit in minutes',
    description:
      'Capture tools, plan tiers, seats, and monthly spend with inline validation.',
    icon: Wallet,
  },
  {
    title: 'Overspending alerts',
    description:
      'Detect subscriptions with poor utilization, duplicate coverage, or plan mismatch.',
    icon: BarChart3,
  },
  {
    title: 'Downgrade opportunities',
    description:
      'Spot seats and tiers that can be reduced with low team impact.',
    icon: CheckCircle2,
  },
  {
    title: 'Alternative tools',
    description:
      'Compare equivalents and consolidation options to simplify your AI stack.',
    icon: Layers3,
  },
  {
    title: 'Team-aware insights',
    description:
      'Recommendations adapt to team size and primary use case, not generic advice.',
    icon: Users,
  },
  {
    title: 'Clean dashboard',
    description:
      'A polished results view with charts, savings totals, and next-best actions.',
    icon: Sparkles,
  },
]

export function FeaturesSection() {
  return (
    <section className="border-y bg-muted/30">
      <div className="container py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            A dashboard your finance team will actually open
          </h2>

        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <Card
                key={f.title}
                className="group bg-background/60 shadow-subtle transition-transform hover:-translate-y-0.5"
              >
                <CardHeader>
                  <div className="mb-2 flex items-center gap-2">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 text-indigo-600 shadow-subtle dark:text-indigo-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">{f.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {f.description}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

