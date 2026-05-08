import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function DashboardSkeleton() {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 lg:grid-cols-4">
        <Card className="p-6 shadow-subtle lg:col-span-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="mt-4 h-10 w-56" />
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Skeleton className="h-20 w-full rounded-2xl" />
            <Skeleton className="h-20 w-full rounded-2xl" />
          </div>
        </Card>
        <Card className="p-6 shadow-subtle">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-4 h-5 w-40" />
          <Skeleton className="mt-3 h-4 w-full" />
        </Card>
        <Card className="p-6 shadow-subtle">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-4 h-10 w-16" />
          <Skeleton className="mt-3 h-4 w-full" />
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="p-5 shadow-subtle">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="mt-3 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-2/3" />
            <Skeleton className="mt-4 h-2 w-full rounded-full" />
          </Card>
        ))}
      </div>
    </div>
  )
}

