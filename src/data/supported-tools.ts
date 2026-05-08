export const supportedToolIds = [
  'chatgpt',
  'claude',
  'cursor',
  'github_copilot',
  'gemini',
  'openai_api',
  'anthropic_api',
  'windsurf',
] as const

export type SupportedToolId = (typeof supportedToolIds)[number]

export type SupportedTool = {
  id: SupportedToolId
  name: string
  description: string
  badge?: string
  accent: {
    from: string
    to: string
  }
}

export const supportedTools: SupportedTool[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'General assistant + teams',
    badge: 'Popular',
    accent: { from: 'from-emerald-500', to: 'to-teal-500' },
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Reasoning + long context',
    badge: 'High quality',
    accent: { from: 'from-amber-500', to: 'to-orange-500' },
  },
  {
    id: 'cursor',
    name: 'Cursor',
    description: 'AI code editor seats',
    accent: { from: 'from-sky-500', to: 'to-indigo-500' },
  },
  {
    id: 'github_copilot',
    name: 'GitHub Copilot',
    description: 'Code completion + chat',
    accent: { from: 'from-slate-600', to: 'to-slate-900' },
  },
  {
    id: 'gemini',
    name: 'Gemini',
    description: 'Workspace assistant',
    accent: { from: 'from-blue-500', to: 'to-violet-500' },
  },
  {
    id: 'openai_api',
    name: 'OpenAI API',
    description: 'Usage-based API spend',
    badge: 'API',
    accent: { from: 'from-indigo-500', to: 'to-violet-500' },
  },
  {
    id: 'anthropic_api',
    name: 'Anthropic API',
    description: 'Usage-based API spend',
    badge: 'API',
    accent: { from: 'from-orange-500', to: 'to-rose-500' },
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    description: 'AI dev workspace',
    accent: { from: 'from-cyan-500', to: 'to-sky-500' },
  },
]
