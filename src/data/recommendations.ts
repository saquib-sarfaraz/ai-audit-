import type { Recommendation } from '@/types/results'
import type { SupportedToolId } from '@/data/supported-tools'

export type RecommendationTemplate = Omit<
  Recommendation,
  'estimatedMonthlySavingsUsd' | 'id'
> & {
  id: string
  savingsPercent?: number
  savingsFlatUsd?: number
  toolId?: SupportedToolId
}

export const recommendationTemplates: RecommendationTemplate[] = [
  {
    id: 'api-budgeting',
    type: 'budget',
    impact: 'medium',
    title: 'Add API budgets and caching',
    description:
      'Set project budgets, cache common prompts, and batch requests to reduce usage-based spend.',
    savingsPercent: 0.15,
  },
  {
    id: 'seat-rightsize',
    type: 'optimize',
    impact: 'high',
    title: 'Right-size seats to active users',
    description:
      'Reduce paid seats to match active usage. Review access every 30 days.',
    savingsPercent: 0.2,
  },
  {
    id: 'assistant-consolidation',
    type: 'consolidate',
    impact: 'medium',
    title: 'Consolidate overlapping assistants',
    description:
      'If multiple assistant subscriptions overlap, standardize on one for most seats and keep the other for niche workflows.',
    savingsPercent: 0.25,
  },
  {
    id: 'downgrade-plan',
    type: 'downgrade',
    impact: 'high',
    title: 'Downgrade plan tier for small teams',
    description:
      'Teams with a few power users can often use individual tiers instead of team plans.',
    savingsPercent: 0.3,
  },
]
