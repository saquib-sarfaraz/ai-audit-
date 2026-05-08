import { z } from 'zod'

import { supportedToolIds } from '@/data/supported-tools'

export const primaryUseCases = [
  'coding',
  'research',
  'support',
  'content',
  'ops',
  'other',
] as const

export const auditToolEntrySchema = z.object({
  toolId: z.enum(supportedToolIds),
  planId: z.string().min(1, 'Select a plan'),
  monthlySpendUsd: z.coerce
    .number()
    .min(0, 'Monthly spend must be ≥ 0')
    .max(1_000_000, 'Monthly spend looks too high'),
  seats: z.coerce
    .number()
    .int('Seats must be a whole number')
    .min(1, 'Seats must be at least 1')
    .max(10_000, 'Seats looks too high'),
})

export const auditFormSchema = z.object({
  teamSize: z.coerce
    .number()
    .int('Team size must be a whole number')
    .min(1, 'Team size must be at least 1')
    .max(100_000, 'Team size looks too high'),
  primaryUseCase: z.enum(primaryUseCases, {
    required_error: 'Select a primary use case',
  }),
  tools: z.array(auditToolEntrySchema).min(1, 'Add at least one tool'),
  notes: z
    .string()
    .max(1000, 'Keep notes under 1000 characters')
    .optional()
    .or(z.literal('')),
})

export type AuditFormInput = z.output<typeof auditFormSchema>
export type AuditFormValues = z.input<typeof auditFormSchema>
