import * as React from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipProps,
} from 'recharts'
import type {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { AuditResults } from '@/types/results'
import { formatCurrency } from '@/utils/format'

const palette = [
  '#6366F1', // indigo
  '#8B5CF6', // violet
  '#06B6D4', // cyan
  '#10B981', // emerald
  '#F59E0B', // amber
  '#F97316', // orange
  '#F43F5E', // rose
  '#94A3B8', // slate
]

function ChartTooltip({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) {
  if (!active || !payload || payload.length === 0) return null

  return (
    <div className="rounded-xl border bg-popover px-3 py-2 text-xs shadow-soft">
      <div className="font-medium">{String(label)}</div>
      <div className="mt-1 grid gap-1">
        {payload.map((p) => (
          <div key={String(p.dataKey)} className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">{String(p.name ?? p.dataKey)}</span>
            <span className="font-medium">{formatCurrency(Number(p.value) || 0)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ChartsSection({ results }: { results: AuditResults }) {
  const spendData = results.perTool
    .filter((t) => t.currentMonthlySpendUsd > 0)
    .map((t, i) => ({
      name: `${t.toolId} ${i > 0 ? `(${i})` : ''}`.trim(),
      value: t.currentMonthlySpendUsd,
    }))

  const compareData = results.perTool.slice(0, 8).map((t, i) => ({
    name: `${t.toolId} ${i > 0 ? `(${i})` : ''}`.trim(),
    Current: t.currentMonthlySpendUsd,
    Recommended: t.recommendedMonthlySpendUsd,
  }))

  const yearly = Array.from({ length: 12 }).map((_, idx) => ({
    month: `M${idx + 1}`,
    Current: results.totalCurrentMonthlyUsd,
    Recommended: results.totalRecommendedMonthlyUsd,
  }))

  const annualComparison = [
    { name: 'Current', value: results.totalCurrentMonthlyUsd * 12 },
    { name: 'Recommended', value: results.totalRecommendedMonthlyUsd * 12 },
  ]

  return (
    <section id="spend" className="mt-8 scroll-mt-24">
      <div className="mb-6 flex items-end justify-between gap-3">
        <div>
          <div className="text-lg font-bold tracking-tight">Charts</div>
          <div className="text-sm text-muted-foreground mt-1">
            Spending breakdown and current vs recommended spend.
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="shadow-sm border-primary/5 hover:border-primary/20 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Spending breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<ChartTooltip />} />
                  <Pie
                    data={spendData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius="60%"
                    outerRadius="80%"
                    paddingAngle={3}
                  >
                    {spendData.map((_, i) => (
                      <Cell key={i} fill={palette[i % palette.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-muted-foreground text-center">
              Current monthly spend by tool.
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-primary/5 hover:border-primary/20 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Current vs Recommended</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={compareData} margin={{ left: 0, right: 0 }}>
                  <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="4 4" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => formatCurrency(v, true)}
                    width={40}
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: 'hsl(var(--muted)/0.4)' }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                  <Bar dataKey="Current" fill={palette[0]} radius={[4, 4, 0, 0]} maxBarSize={40} />
                  <Bar
                    dataKey="Recommended"
                    fill={palette[3]}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
