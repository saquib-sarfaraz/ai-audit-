import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { 
  SiOpenai, 
  SiGooglegemini, 
  SiGithubcopilot, 
  SiClaude, 
  SiAnthropic, 
  SiWindsurf 
} from 'react-icons/si'
import { Code2, Terminal, Box } from 'lucide-react'

export type ToolCardModel = {
  id: string
  name: string
  description: string
  badge?: string
  accent: {
    from: string
    to: string
  }
}

const iconMap: Record<string, any> = {
  chatgpt: SiOpenai,
  claude: SiClaude,
  cursor: Code2,
  github_copilot: SiGithubcopilot,
  gemini: SiGooglegemini,
  openai_api: SiOpenai,
  anthropic_api: SiAnthropic,
  windsurf: SiWindsurf,
}

export function ToolCard({ tool }: { tool: ToolCardModel }) {
  const Icon = iconMap[tool.id] || Box

  return (
    <Card className="group relative overflow-hidden rounded-2xl border border-border/40 bg-background/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-md hover:bg-accent/5 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/[0.02] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      <div className="relative flex flex-col gap-4 p-6 h-full">
        <div className="flex items-start justify-between gap-3">
          <div
            className={cn(
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br p-2.5 text-white shadow-subtle transition-transform duration-300 group-hover:scale-105',
              tool.accent.from,
              tool.accent.to
            )}
            aria-hidden="true"
          >
            <Icon className="h-full w-full object-contain" />
          </div>
          
          {tool.badge && (
            <Badge 
              variant="outline" 
              className={cn(
                "px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-background/80 border-border/50 transition-colors group-hover:border-primary/30",
                tool.badge === 'Popular' && "text-emerald-600 dark:text-emerald-400",
                tool.badge === 'High quality' && "text-amber-600 dark:text-amber-400",
                tool.badge === 'API' && "text-indigo-600 dark:text-indigo-400"
              )}
            >
              {tool.badge}
            </Badge>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-1 flex-grow">
          <h3 className="text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary/90">
            {tool.name}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {tool.description}
          </p>
        </div>

        <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground/80 transition-colors group-hover:text-foreground">
          <Terminal className="h-3.5 w-3.5 opacity-50" />
          <span>Analyzed daily</span>
        </div>
      </div>
    </Card>
  )
}

