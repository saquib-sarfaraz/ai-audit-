import * as React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function PrivacyPage() {
  return (
    <div className="container max-w-3xl py-12 md:py-24">
      <Button asChild variant="ghost" className="mb-8 -ml-4 text-muted-foreground">
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>
      </Button>
      
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-2 text-muted-foreground">Last updated: May 10, 2026</p>
        </div>

        <div className="space-y-6 text-foreground/90 leading-relaxed">
          <p>
            At AI Spend Audit, we believe in being transparent about how we collect and use your data. 
            This Privacy Policy explains our practices in simple, readable terms.
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">1. Information We Collect</h2>
            <p>We collect information to provide and improve our audit services. This includes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Audit Input Data:</strong> The AI tools, usage metrics, and spend amounts you enter to generate your report.</li>
              <li><strong>Contact Information:</strong> If you choose to unlock full insights, we collect your email, role, and company name.</li>
              <li><strong>Usage Data:</strong> Basic analytics about how you interact with our website to help us improve the experience.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">2. How We Use Your Data</h2>
            <p>Your data is strictly used to deliver the core value of AI Spend Audit:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Generating accurate, personalized savings recommendations.</li>
              <li>Powering our AI-driven summaries using Groq AI.</li>
              <li>Sending you your saved reports or occasional product updates (only if you opt-in).</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">3. Public Shareable Reports</h2>
            <p>
              When you generate an audit, you may receive a shareable link. <strong>These public reports are anonymized 
              and strictly exclude sensitive personal information or billing details.</strong> Anyone with the link can 
              view the high-level spend breakdown, so please share responsibly.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">4. Third-Party Services & AI</h2>
            <p>
              We use trusted third-party providers (like MongoDB for database storage). To generate automated summaries, 
              we pass your anonymized stack data to Groq AI. We do not use your private financial data to train AI models.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">5. Data Protection</h2>
            <p>
              We implement modern security practices to protect your information. While no service is completely secure, 
              we treat your data with the highest level of care expected from a professional SaaS application.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">6. Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal information at any time. If you wish to have 
              your email or audit data removed from our systems, simply contact us.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">7. Contact Us</h2>
            <p>
              Have questions about this policy or your data? We're here to help. Contact us at{' '}
              <a href="mailto:saquibsarfaraz47@gmail.com" className="text-primary hover:underline">
                saquibsarfaraz47@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
