import type { SupportedToolId } from '@/data/supported-tools'

export type ToolPlanPriceType = 'per_seat' | 'flat' | 'usage'

export type ToolPlan = {
  id: string
  name: string
  priceType: ToolPlanPriceType
  priceUsdPerSeat?: number
  priceUsdFlat?: number
  description?: string
}

export type ToolCatalogItem = {
  id: SupportedToolId
  name: string
  category: 'assistant' | 'editor' | 'copilot' | 'api'
  plans: ToolPlan[]
  defaultPlanId: string
  alternatives: SupportedToolId[]
}

export const toolCatalog: ToolCatalogItem[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'assistant',
    defaultPlanId: 'team',
    alternatives: ['claude', 'gemini'],
    plans: [
      {
        id: 'free',
        name: 'Free',
        priceType: 'flat',
        priceUsdFlat: 0,
        description: 'Light usage',
      },
      {
        id: 'plus',
        name: 'Plus',
        priceType: 'per_seat',
        priceUsdPerSeat: 20,
        description: 'Individual power users',
      },
      {
        id: 'team',
        name: 'Team',
        priceType: 'per_seat',
        priceUsdPerSeat: 25,
        description: 'Team seats + admin controls',
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        priceType: 'flat',
        description: 'Custom pricing',
      },
    ],
  },
  {
    id: 'claude',
    name: 'Claude',
    category: 'assistant',
    defaultPlanId: 'team',
    alternatives: ['chatgpt', 'gemini'],
    plans: [
      { id: 'free', name: 'Free', priceType: 'flat', priceUsdFlat: 0 },
      { id: 'pro', name: 'Pro', priceType: 'per_seat', priceUsdPerSeat: 20 },
      { id: 'team', name: 'Team', priceType: 'per_seat', priceUsdPerSeat: 25 },
      { id: 'enterprise', name: 'Enterprise', priceType: 'flat' },
    ],
  },
  {
    id: 'cursor',
    name: 'Cursor',
    category: 'editor',
    defaultPlanId: 'pro',
    alternatives: ['windsurf', 'github_copilot'],
    plans: [
      { id: 'free', name: 'Free', priceType: 'flat', priceUsdFlat: 0 },
      { id: 'pro', name: 'Pro', priceType: 'per_seat', priceUsdPerSeat: 20 },
      {
        id: 'business',
        name: 'Business',
        priceType: 'per_seat',
        priceUsdPerSeat: 40,
      },
    ],
  },
  {
    id: 'github_copilot',
    name: 'GitHub Copilot',
    category: 'copilot',
    defaultPlanId: 'business',
    alternatives: ['cursor', 'windsurf'],
    plans: [
      {
        id: 'individual',
        name: 'Individual',
        priceType: 'per_seat',
        priceUsdPerSeat: 10,
      },
      {
        id: 'business',
        name: 'Business',
        priceType: 'per_seat',
        priceUsdPerSeat: 19,
      },
      { id: 'enterprise', name: 'Enterprise', priceType: 'flat' },
    ],
  },
  {
    id: 'gemini',
    name: 'Gemini',
    category: 'assistant',
    defaultPlanId: 'business',
    alternatives: ['chatgpt', 'claude'],
    plans: [
      { id: 'free', name: 'Free', priceType: 'flat', priceUsdFlat: 0 },
      {
        id: 'business',
        name: 'Business',
        priceType: 'per_seat',
        priceUsdPerSeat: 20,
      },
      { id: 'enterprise', name: 'Enterprise', priceType: 'flat' },
    ],
  },
  {
    id: 'openai_api',
    name: 'OpenAI API',
    category: 'api',
    defaultPlanId: 'payg',
    alternatives: ['anthropic_api'],
    plans: [
      {
        id: 'payg',
        name: 'Pay as you go',
        priceType: 'usage',
        description: 'Usage-based',
      },
      { id: 'committed', name: 'Committed use', priceType: 'usage' },
    ],
  },
  {
    id: 'anthropic_api',
    name: 'Anthropic API',
    category: 'api',
    defaultPlanId: 'payg',
    alternatives: ['openai_api'],
    plans: [
      {
        id: 'payg',
        name: 'Pay as you go',
        priceType: 'usage',
        description: 'Usage-based',
      },
      { id: 'committed', name: 'Committed use', priceType: 'usage' },
    ],
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    category: 'editor',
    defaultPlanId: 'pro',
    alternatives: ['cursor', 'github_copilot'],
    plans: [
      { id: 'free', name: 'Free', priceType: 'flat', priceUsdFlat: 0 },
      { id: 'pro', name: 'Pro', priceType: 'per_seat', priceUsdPerSeat: 15 },
      {
        id: 'team',
        name: 'Team',
        priceType: 'per_seat',
        priceUsdPerSeat: 25,
      },
    ],
  },
]

export const toolById: Map<SupportedToolId, ToolCatalogItem> = new Map(
  toolCatalog.map((t) => [t.id, t] as const)
)
