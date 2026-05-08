import type { SupportedToolId } from '@/data/supported-tools'

export type PrimaryUseCase =
  | 'coding'
  | 'research'
  | 'support'
  | 'content'
  | 'ops'
  | 'other'

export type AuditToolEntry = {
  toolId: SupportedToolId
  planId: string
  monthlySpendUsd: number
  seats: number
}

export type AuditFormValues = {
  teamSize: number
  primaryUseCase: PrimaryUseCase
  tools: AuditToolEntry[]
  notes?: string
}

