import { Link, useLocation } from 'react-router-dom'
import {
  BarChart3,
  Lightbulb,
  PieChart,
  Share2,
  Sparkles,
} from 'lucide-react'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const items = [
  { to: '/results#overview', label: 'Overview', icon: BarChart3 },
  { to: '/results#spend', label: 'Spend breakdown', icon: PieChart },
  { to: '/results#recommendations', label: 'Recommendations', icon: Sparkles },
  { to: '/results#insights', label: 'Insights', icon: Lightbulb },
  { to: '/results#share', label: 'Share report', icon: Share2 },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <Card className="p-2 shadow-subtle">
      <div className="px-3 py-3">
        <div className="text-xs font-semibold tracking-wide text-muted-foreground">
          Navigation
        </div>
      </div>
      <nav className="grid gap-1 p-2 pt-0">
        {items.map((item) => {
          const isActive = location.pathname + location.hash === item.to
          const Icon = item.icon
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
                isActive && 'bg-accent text-accent-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </Card>
  )
}

