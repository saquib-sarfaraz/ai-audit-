import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { captureLead } from '@/lib/api'

export function LeadCaptureModal({ reportId }: { reportId: string }) {
  const [open, setOpen] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    try {
      await captureLead({
        email: formData.get('email') as string,
        company: formData.get('company') as string,
        role: formData.get('role') as string,
        teamSize: Number(formData.get('teamSize')) || 1,
        reportId,
      })
      setIsSuccess(true)
    } catch (err) {
      console.error(err)
      alert('Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full sm:w-auto">Unlock full insights</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Unlock Full Insights</DialogTitle>
          <DialogDescription>
            Enter your details to save this report and unlock personalized, actionable insights for your team.
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-6 text-center text-emerald-600 font-medium">
            Thanks! We've saved your details. You now have full access.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4 mt-4">
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium">Email address</label>
              <Input id="email" name="email" type="email" required placeholder="founder@startup.com" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="company" className="text-sm font-medium">Company name</label>
              <Input id="company" name="company" required placeholder="Tech Corp" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="role" className="text-sm font-medium">Role</label>
                <Input id="role" name="role" required placeholder="CTO" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="teamSize" className="text-sm font-medium">Team size</label>
                <Input id="teamSize" name="teamSize" type="number" required placeholder="8" />
              </div>
            </div>
            <Button type="submit" className="mt-2" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Unlock Insights'}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
