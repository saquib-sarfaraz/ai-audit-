import { Quote } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'

const testimonials = [
  {
    name: 'Priya S.',
    title: 'Head of Ops',
    quote:
      'The dashboard made our AI stack feel as measurable as cloud spend. We found duplicate tools in minutes.',
  },
  {
    name: 'Jordan K.',
    title: 'Engineering Manager',
    quote:
      'We right-sized seats and standardized on one editor. The “downgrade” suggestions were spot on.',
  },
  {
    name: 'Mina R.',
    title: 'Finance Partner',
    quote:
      'Clear monthly and annual savings with a breakdown I can share internally. Clean and credible.',
  },
]

export function TestimonialsSection() {
  return (
    <section className="border-y bg-muted/30">
      <div className="container py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Designed to be shared
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            A dashboard that looks good in a screenshot and reads well in a
            meeting.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="p-6 shadow-subtle">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {t.name
                        .split(' ')
                        .map((p) => p[0])
                        .join('')
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.title}</div>
                  </div>
                </div>
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-background shadow-subtle">
                  <Quote className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">“{t.quote}”</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

