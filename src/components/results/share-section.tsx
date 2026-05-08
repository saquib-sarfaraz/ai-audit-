import * as React from 'react'
import { Link } from 'react-router-dom'
import { Copy, ExternalLink, Share2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import type { AuditResults } from '@/types/results'

export function ShareSection({ results }: { results: AuditResults }) {
  const [copied, setCopied] = React.useState(false)
  const reportPath = `/report/${results.id}`
  const url =
    typeof window === 'undefined'
      ? reportPath
      : `${window.location.origin}${reportPath}`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section id="share" className="mt-6 scroll-mt-24">
      <Card className="flex flex-col gap-4 rounded-2xl border bg-muted/30 p-6 shadow-subtle sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-background shadow-subtle">
            <Share2 className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <div className="text-sm font-semibold">Share report</div>
            <div className="mt-1 text-sm text-muted-foreground">
              In this MVP, reports are stored locally. The link is best for demo
              purposes in the same browser.
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button asChild variant="outline">
            <Link to={reportPath}>
              Open report <ExternalLink />
            </Link>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                Copy link <Copy />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Share link</DialogTitle>
                <DialogDescription>
                  Copy the link below. This frontend MVP stores reports locally.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-3">
                <Input readOnly value={url} />
                <Button onClick={copy} type="button">
                  {copied ? 'Copied' : 'Copy to clipboard'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </Card>
    </section>
  )
}

