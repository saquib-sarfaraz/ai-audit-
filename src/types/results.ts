import type { SupportedToolId } from '@/data/supported-tools'

export type RecommendationImpact = 'low' | 'medium' | 'high'

export type RecommendationType =
  | 'downgrade'
  | 'consolidate'
  | 'alternative'
  | 'optimize'
  | 'budget'

export type Recommendation = {
  id: string
  type: RecommendationType
  impact: RecommendationImpact
  title: string
  description: string
  toolId?: SupportedToolId
  estimatedMonthlySavingsUsd: number
}

export type ToolSavings = {
  toolId: SupportedToolId
  currentMonthlySpendUsd: number
  recommendedMonthlySpendUsd: number
  monthlySavingsUsd: number
  notes: string[]
}

export type AuditResults = {
  id: string
  generatedAtIso: string
  totalCurrentMonthlyUsd: number
  totalRecommendedMonthlyUsd: number
  totalMonthlySavingsUsd: number
  totalAnnualSavingsUsd: number
  perTool: ToolSavings[]
  recommendations: Recommendation[]
}

