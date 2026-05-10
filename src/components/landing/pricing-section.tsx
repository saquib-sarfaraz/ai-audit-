import { PricingCard } from '@/components/pricing-card'

const plans = [
  {
    name: 'Quick scan',
    price: '10 min',
    caption: 'Lightweight review for small teams',
    highlights: [
      'Capture tool + spend snapshot',
      'Identify obvious seat waste',
      'Get 3–5 prioritized recommendations',
    ],
    cta: { label: 'Start scan', href: '/audit' },
  },
  {
    name: 'Team audit',
    price: '1–2 hrs',
    caption: 'Best for product & engineering teams',
    highlights: [
      'Model multiple tools and seats',
      'Plan downgrade opportunities',
      'Alternative tools + consolidation ideas',
      'Charts + shareable report view',
    ],
    cta: { label: 'Run team audit', href: '/audit' },
    featured: true,
  },
  {
    name: 'Org rollout',
    price: '1 week',
    caption: 'Standardize AI spend for the org',
    highlights: [
      'Define approved tools + tiers',
      'Monthly seat review process',
      'Usage budgets for APIs',
      'Executive-ready savings summary',
    ],
    cta: { label: 'View dashboard', href: '/results' },
  },
]

export function PricingSection() {
  return (
    <section className="container py-12 sm:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Choose your audit depth
        </h2>

      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {plans.map((p) => (
          <PricingCard key={p.name} plan={p} />
        ))}
      </div>
    </section>
  )
}

