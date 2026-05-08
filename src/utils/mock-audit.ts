import type { AuditFormInput } from '@/lib/validation/audit'
import { toolById } from '@/data/tool-pricing'
import { recommendationTemplates } from '@/data/recommendations'
import type { AuditResults, Recommendation, ToolSavings } from '@/types/results'
import type { SupportedToolId } from '@/data/supported-tools'

function safeNumber(value: unknown) {
  const n = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(n) ? n : 0
}

function percentOf(value: number, pct: number) {
  return Math.max(0, value * pct)
}

function roundUsd(value: number) {
  return Math.round(value * 100) / 100
}

function makeRec(
  templateId: string,
  overrides: Partial<Recommendation> & Pick<Recommendation, 'estimatedMonthlySavingsUsd'>
): Recommendation | null {
  const tpl = recommendationTemplates.find((t) => t.id === templateId)
  if (!tpl) return null
  return {
    id: `${templateId}:${crypto.randomUUID()}`,
    type: tpl.type,
    impact: tpl.impact,
    title: tpl.title,
    description: tpl.description,
    toolId: tpl.toolId,
    ...overrides,
  }
}

function planBenchmark(
  toolId: SupportedToolId,
  planId: string,
  seats: number,
  fallback: number
) {
  const tool = toolById.get(toolId)
  const plan = tool?.plans.find((p) => p.id === planId)
  if (!tool || !plan) return { tool, plan: null, benchmarkMonthlyUsd: fallback }

  if (plan.priceType === 'per_seat' && typeof plan.priceUsdPerSeat === 'number') {
    return { tool, plan, benchmarkMonthlyUsd: plan.priceUsdPerSeat * seats }
  }
  if (plan.priceType === 'flat' && typeof plan.priceUsdFlat === 'number') {
    return { tool, plan, benchmarkMonthlyUsd: plan.priceUsdFlat }
  }
  return { tool, plan, benchmarkMonthlyUsd: fallback }
}

export function runMockAudit(input: AuditFormInput): AuditResults {
  const perTool: ToolSavings[] = []
  const recommendations: Recommendation[] = []

  const generatedAtIso = new Date().toISOString()
  const id = crypto.randomUUID()

  let totalCurrentMonthlyUsd = 0
  let totalRecommendedMonthlyUsd = 0

  const assistantSpend: Array<{ toolId: SupportedToolId; spend: number }> = []

  for (const entry of input.tools) {
    const current = safeNumber(entry.monthlySpendUsd)
    const seats = Math.max(1, Math.floor(safeNumber(entry.seats) || 1))
    const teamSize = Math.max(1, Math.floor(safeNumber(input.teamSize) || 1))
    totalCurrentMonthlyUsd += current

    const { tool, plan, benchmarkMonthlyUsd } = planBenchmark(
      entry.toolId,
      entry.planId,
      seats,
      current
    )

    let recommended = current
    const notes: string[] = []

    if (tool?.category === 'assistant') {
      assistantSpend.push({ toolId: entry.toolId, spend: current })
    }

    // Heuristic 1: seats exceed team size → suggest right-sizing.
    if (tool && plan?.priceType === 'per_seat' && seats > teamSize) {
      const benchTeam = planBenchmark(entry.toolId, entry.planId, teamSize, current)
      recommended = Math.min(recommended, benchTeam.benchmarkMonthlyUsd)
      notes.push('Seats exceed team size. Consider right-sizing paid seats.')

      const savings = Math.max(0, current - recommended)
      const rec = makeRec('seat-rightsize', {
        toolId: entry.toolId,
        estimatedMonthlySavingsUsd: roundUsd(savings),
        title: `Right-size ${tool.name} seats`,
        description:
          'Paid seats exceed team size. Reduce seats to active users and review access monthly.',
      })
      if (rec && rec.estimatedMonthlySavingsUsd > 0) recommendations.push(rec)
    }

    // Heuristic 2: spend exceeds plan benchmark (basic sanity check).
    if (tool && benchmarkMonthlyUsd > 0 && current > benchmarkMonthlyUsd * 1.1) {
      recommended = Math.min(recommended, benchmarkMonthlyUsd)
      notes.push('Spend is higher than a simple plan estimate. Verify billing + add-ons.')
    }

    // Heuristic 3: small seat count on team/business tiers → downgrade suggestion.
    if (tool && plan?.priceType === 'per_seat' && seats <= 3) {
      const cheaper = tool.plans
        .filter((p) => p.priceType === 'per_seat' && typeof p.priceUsdPerSeat === 'number')
        .sort((a, b) => (a.priceUsdPerSeat ?? 0) - (b.priceUsdPerSeat ?? 0))[0]

      if (cheaper && cheaper.id !== plan.id && (cheaper.priceUsdPerSeat ?? 0) < (plan.priceUsdPerSeat ?? 0)) {
        const downgradeBench = (cheaper.priceUsdPerSeat ?? 0) * seats
        if (current > downgradeBench) {
          recommended = Math.min(recommended, downgradeBench)
          notes.push(`Consider downgrading to ${cheaper.name} for small teams.`)
          const rec = makeRec('downgrade-plan', {
            toolId: entry.toolId,
            estimatedMonthlySavingsUsd: roundUsd(Math.max(0, current - recommended)),
            title: `Downgrade ${tool.name} plan`,
            description: `For ${seats} seats, ${cheaper.name} may be sufficient. Keep higher tiers for admin needs.`,
          })
          if (rec && rec.estimatedMonthlySavingsUsd > 0) recommendations.push(rec)
        }
      }
    }

    // Heuristic 4: API usage → budgeting & caching.
    if (tool?.category === 'api' && current >= 150) {
      const savings = percentOf(current, 0.15)
      const rec = makeRec('api-budgeting', {
        toolId: entry.toolId,
        estimatedMonthlySavingsUsd: roundUsd(savings),
      })
      if (rec && rec.estimatedMonthlySavingsUsd > 0) recommendations.push(rec)
      recommended = Math.min(recommended, current - savings)
      notes.push('Add budgets, caching, and batching to reduce usage-based spend.')
    }

    // Heuristic 5: suggest evaluating alternatives for high-spend tools.
    if (tool && tool.alternatives.length > 0 && current >= 250) {
      const alt = toolById.get(tool.alternatives[0])
      const savings = percentOf(current, 0.1)
      recommendations.push({
        id: `alternative:${crypto.randomUUID()}`,
        type: 'alternative',
        impact: 'medium',
        toolId: entry.toolId,
        title: alt ? `Evaluate ${alt.name} as an alternative` : 'Evaluate alternatives',
        description: alt
          ? `Depending on your workflow, you may consolidate seats or swap to ${alt.name} for parts of the team.`
          : 'Depending on your workflow, consolidating or swapping tools may reduce spend.',
        estimatedMonthlySavingsUsd: roundUsd(savings),
      })
      notes.push('Consider an alternative tool or consolidating overlapping spend.')
      recommended = Math.min(recommended, current - savings)
    }

    recommended = Math.max(0, recommended)
    totalRecommendedMonthlyUsd += recommended

    perTool.push({
      toolId: entry.toolId,
      currentMonthlySpendUsd: roundUsd(current),
      recommendedMonthlySpendUsd: roundUsd(recommended),
      monthlySavingsUsd: roundUsd(Math.max(0, current - recommended)),
      notes,
    })
  }

  // Cross-tool heuristic: assistant overlap.
  if (assistantSpend.length >= 2) {
    const combined = assistantSpend.reduce((acc, x) => acc + x.spend, 0)
    const savings = percentOf(combined, 0.15)
    const rec = makeRec('assistant-consolidation', {
      estimatedMonthlySavingsUsd: roundUsd(savings),
    })
    if (rec && rec.estimatedMonthlySavingsUsd > 0) recommendations.push(rec)
  }

  const totalMonthlySavingsUsd = roundUsd(
    Math.max(0, totalCurrentMonthlyUsd - totalRecommendedMonthlyUsd)
  )
  const totalAnnualSavingsUsd = roundUsd(totalMonthlySavingsUsd * 12)

  return {
    id,
    generatedAtIso,
    totalCurrentMonthlyUsd: roundUsd(totalCurrentMonthlyUsd),
    totalRecommendedMonthlyUsd: roundUsd(totalRecommendedMonthlyUsd),
    totalMonthlySavingsUsd,
    totalAnnualSavingsUsd,
    perTool: perTool.sort((a, b) => b.monthlySavingsUsd - a.monthlySavingsUsd),
    recommendations: recommendations
      .filter((r) => r.estimatedMonthlySavingsUsd > 0)
      .sort((a, b) => b.estimatedMonthlySavingsUsd - a.estimatedMonthlySavingsUsd)
      .slice(0, 8),
  }
}
