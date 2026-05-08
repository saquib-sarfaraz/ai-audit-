import { Card } from '@/components/ui/card'
import type { AuditResults } from '@/types/results'
import { RecommendationCard } from '@/components/results/recommendation-card'

export function RecommendationsSection({ results }: { results: AuditResults }) {
  return (
    <section id="recommendations" className="mt-6 scroll-mt-24">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">Recommendations</div>
          <div className="text-sm text-muted-foreground">
            Prioritized next actions based on your inputs.
          </div>
        </div>
      </div>

      {results.recommendations.length === 0 ? (
        <Card className="p-6 text-sm text-muted-foreground shadow-subtle">
          No recommendations generated. Try adjusting spend, seats, or adding
          more tools to see optimization ideas.
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {results.recommendations.map((r) => (
            <RecommendationCard key={r.id} rec={r} />
          ))}
        </div>
      )}
    </section>
  )
}

