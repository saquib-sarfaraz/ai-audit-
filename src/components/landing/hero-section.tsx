import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="container relative py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground shadow-subtle backdrop-blur">
            AI spend visibility for teams
          </p>
          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Cut AI SaaS costs without slowing your team down.
          </h1>
          <p className="mt-4 text-balance text-base text-muted-foreground sm:text-lg">
            Enter your AI subscriptions and monthly spend. Get an audit dashboard
            with overspending alerts, downgrade opportunities, and personalized
            recommendations.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/audit">
                Start audit <ArrowRight />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
            >
              <Link to="/results">View demo dashboard</Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { k: 'Plan tiers', v: 'Right-size seats' },
              { k: 'Tool overlap', v: 'Consolidate spend' },
              { k: 'API usage', v: 'Set budgets' },
            ].map((i) => (
              <div
                key={i.k}
                className="rounded-2xl border bg-background/60 p-4 text-left shadow-subtle backdrop-blur"
              >
                <div className="text-xs text-muted-foreground">{i.k}</div>
                <div className="mt-1 text-sm font-semibold">{i.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

