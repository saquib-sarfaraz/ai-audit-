import { AuditForm } from '@/components/audit/audit-form'

export function AuditPage() {
  return (
    <div className="container py-10">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Audit your AI spend
        </h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Add your subscriptions and monthly spend. We’ll generate a savings
          dashboard with recommendations.
        </p>
      </div>
      <AuditForm />
    </div>
  )
}
