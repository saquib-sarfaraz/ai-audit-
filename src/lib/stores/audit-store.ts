import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { AuditFormInput } from '@/lib/validation/audit'
import type { AuditResults } from '@/types/results'

export const defaultAuditInput: AuditFormInput = {
  teamSize: 12,
  primaryUseCase: 'coding',
  tools: [
    { toolId: 'chatgpt', planId: 'team', monthlySpendUsd: 300, seats: 12 },
  ],
  notes: '',
}

type AuditState = {
  input: AuditFormInput
  setInput: (input: AuditFormInput) => void
  resetInput: () => void
  results: AuditResults | null
  setResults: (results: AuditResults | null) => void
}

export const useAuditStore = create<AuditState>()(
  persist(
    (set) => ({
      input: defaultAuditInput,
      setInput: (input) => set({ input }),
      resetInput: () => set({ input: defaultAuditInput }),
      results: null,
      setResults: (results) => set({ results }),
    }),
    {
      name: 'ai-audit:state',
      partialize: (state) => ({ input: state.input, results: state.results }),
    }
  )
)

