import { Link } from 'react-router-dom'

import { Separator } from '@/components/ui/separator'

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-2">
            <div className="text-sm font-semibold">AI Spend Audit</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold">Product</div>
            <div className="grid gap-1 text-sm text-muted-foreground">
              <Link to="/audit" className="hover:text-foreground">
                Run an audit
              </Link>
              <Link to="/results" className="hover:text-foreground">
                Dashboard
              </Link>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold">Company</div>
            <div className="grid gap-1 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-foreground">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-foreground">
                Terms
              </Link>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold">Get started</div>
            <p className="text-sm text-muted-foreground">
              Audit your AI spend in under 2 minutes.
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
          <div>© {new Date().getFullYear()} AI Spend Audit</div>
        </div>
      </div>
    </footer>
  )
}

