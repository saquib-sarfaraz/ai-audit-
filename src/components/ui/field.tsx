import * as React from 'react'
import type { FieldError as RhfFieldError } from 'react-hook-form'

import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'

const Field = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('grid gap-2', className)} {...props} />
  )
)
Field.displayName = 'Field'

const FieldLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => (
  <Label ref={ref} className={cn('text-sm font-medium', className)} {...props} />
))
FieldLabel.displayName = 'FieldLabel'

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-xs text-muted-foreground', className)}
    {...props}
  />
))
FieldDescription.displayName = 'FieldDescription'

function pickMessage(error: RhfFieldError | undefined) {
  if (!error) return null
  if (typeof error.message === 'string' && error.message.length > 0) {
    return error.message
  }
  return 'Invalid value'
}

function flattenErrors(errors: Array<RhfFieldError | undefined>) {
  const messages = errors.map(pickMessage).filter(Boolean)
  return Array.from(new Set(messages))
}

function FieldError({ errors }: { errors: Array<RhfFieldError | undefined> }) {
  const messages = flattenErrors(errors)
  if (messages.length === 0) return null
  return (
    <div className="text-xs font-medium text-destructive">
      {messages.join(' • ')}
    </div>
  )
}

export { Field, FieldLabel, FieldDescription, FieldError }

