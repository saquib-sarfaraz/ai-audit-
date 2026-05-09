import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    q: 'How does the AI spend audit work?',
    a: "We analyze your tech stack and current AI subscriptions to identify overlapping tools, unused seats, and cheaper alternatives. Input your current tools, and we'll instantly generate a custom savings report.",
  },
  {
    q: 'Which AI tools do you support?',
    a: 'We track pricing, usage limits, and feature overlap for over 200 popular AI tools, including OpenAI, Anthropic, Midjourney, and GitHub Copilot. Our pricing database is updated weekly.',
  },
  {
    q: 'How accurate are the savings estimates?',
    a: 'Highly accurate. Our calculations use real-time public pricing, API cost structures, and typical usage patterns to recommend consolidated enterprise plans or alternatives with comparable feature parity.',
  },
  {
    q: "Is my company's stack data private?",
    a: "Yes. We don't connect to your billing accounts or require sensitive financial data. The tool configurations you input are used strictly to generate your audit report and are never shared.",
  },
  {
    q: 'Do I need to create an account?',
    a: 'No account or credit card is required to run an audit. You can view your top-level savings immediately. We only ask for an email if you want to save your stack or export the results.',
  },
  {
    q: 'Can I share the audit results with my team?',
    a: 'Yes. Every audit generates a unique, secure link. You can easily share the breakdown with your finance team, CTO, or engineering leads to streamline vendor consolidation.',
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

