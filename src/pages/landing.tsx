import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import { FaqSection } from '@/components/landing/faq-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { HeroSection } from '@/components/landing/hero-section'
import { PricingSection } from '@/components/landing/pricing-section'
import { StatsSection } from '@/components/landing/stats-section'
import { SupportedToolsSection } from '@/components/landing/supported-tools-section'
import { TestimonialsSection } from '@/components/landing/testimonials-section'
import { Button } from '@/components/ui/button'

export function LandingPage() {
  return (
    <div>
      <HeroSection />
      <SupportedToolsSection />
      <FeaturesSection />
      <PricingSection />
      <StatsSection />
      <TestimonialsSection />

      <section className="container py-12 sm:py-16">
        <div className="rounded-2xl border bg-gradient-to-br from-indigo-500/10 to-violet-500/10 p-6 shadow-subtle sm:p-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Ready to reduce AI spend?
              </h2>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                Add your tools, enter monthly spend, and get a dashboard that’s
                designed for real teams—not spreadsheets.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/audit">
                  Start audit <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                <Link to="/results">See dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FaqSection />
    </div>
  )
}
