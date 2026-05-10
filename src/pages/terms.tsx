import * as React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function TermsPage() {
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
          <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
          <p className="mt-2 text-muted-foreground">Last updated: May 10, 2026</p>
        </div>

        <div className="space-y-6 text-foreground/90 leading-relaxed">
          <p>
            Welcome to AI Spend Audit. By accessing or using our website and services, you agree to be bound by these Terms of Service. 
            Please read them carefully.
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">1. Acceptance of Terms</h2>
            <p>
              By utilizing the AI Spend Audit platform, you agree to these terms. If you do not agree, you may not use our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">2. Use of the Platform</h2>
            <p>
              AI Spend Audit provides tools to estimate and analyze SaaS spending. You agree to use the platform only for lawful purposes 
              and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use of the platform.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">3. Informational Purposes Only (Disclaimer)</h2>
            <p>
              <strong>AI Spend Audit is not a financial advisor.</strong> All savings estimates, plan comparisons, and AI-generated 
              recommendations are strictly for informational purposes. While we strive for accuracy based on public pricing data, 
              we do not guarantee the exact financial outcome of implementing our recommendations. Always verify pricing with the 
              respective vendors before making purchasing decisions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">4. User Responsibilities & Prohibited Activities</h2>
            <p>As a user of our platform, you agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Attempt to reverse engineer or scrape our pricing databases or audit engines.</li>
              <li>Submit false, misleading, or malicious data into our input forms.</li>
              <li>Use the service to distribute spam or unauthorized advertising.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">5. Intellectual Property</h2>
            <p>
              The AI Spend Audit platform, including its original content, features, functionality, and design, is owned by us and 
              is protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">6. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, AI Spend Audit shall not be liable for any indirect, incidental, special, 
              consequential, or punitive damages resulting from your use of or inability to use the service. We provide the service 
              "as is" without any express or implied warranties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">7. Termination</h2>
            <p>
              We reserve the right to terminate or suspend access to our service immediately, without prior notice or liability, 
              for any reason whatsoever, including without limitation if you breach these Terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">8. Changes to Terms</h2>
            <p>
              We may modify these terms at any time as our MVP evolves. We will notify users of any material changes by updating 
              the date at the top of this page. Your continued use of the platform constitutes acceptance of the updated terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">9. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at{' '}
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
