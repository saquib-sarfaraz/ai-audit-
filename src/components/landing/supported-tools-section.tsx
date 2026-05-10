import { supportedTools } from '@/data/supported-tools'
import { ToolCard } from '@/components/tool-card'

export function SupportedToolsSection() {
  return (
    <section className="container py-12 sm:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Supported tools
        </h2>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Model the subscriptions you already pay for, plus API spend. Add as
          many tools as you want.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {supportedTools.map((t) => (
          <ToolCard
            key={t.id}
            tool={{
              id: t.id,
              name: t.name,
              description: t.description,
              badge: t.badge,
              accent: t.accent,
            }}
          />
        ))}
      </div>
    </section>
  )
}

