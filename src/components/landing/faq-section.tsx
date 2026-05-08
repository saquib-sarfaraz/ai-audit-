import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    q: 'Is this connected to real billing systems?',
    a: 'Not yet. This MVP frontend uses mock pricing and local state only—no APIs, auth, or backend wiring.',
  },
  {
    q: 'Can I add multiple tools and seats?',
    a: 'Yes. The audit form supports adding/removing multiple tools with per-tool plan, seats, and spend.',
  },
  {
    q: 'How are savings calculated?',
    a: 'Using lightweight mock rules (e.g., right-sizing seats, swapping tiers, alternatives). You can replace these later with your real logic.',
  },
  {
    q: 'Does it support dark mode?',
    a: 'Yes—class-based dark mode with a theme switcher and system preference support.',
  },
  {
    q: 'Can I share a report link?',
    a: 'The shared report route exists. For now, it reads from local mock state; you can wire real share tokens later.',
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="container scroll-mt-24 py-12 sm:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          FAQ
        </h2>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Everything you need to know to get started.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-2xl rounded-2xl border bg-background/60 p-2 shadow-subtle">
        <Accordion type="single" collapsible>
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="px-4">{f.q}</AccordionTrigger>
              <AccordionContent className="px-4">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

