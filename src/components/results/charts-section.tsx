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
import { formatUsd } from '@/utils/format'

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
            <span className="font-medium">{formatUsd(Number(p.value) || 0)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ChartsSection({ results }: { results: AuditResults }) {
  const spendData = results.perTool
    .filter((t) => t.currentMonthlySpendUsd > 0)
    .map((t) => ({
      name: t.toolId,
      value: t.currentMonthlySpendUsd,
    }))

  const compareData = results.perTool.slice(0, 8).map((t) => ({
    name: t.toolId,
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
    <section id="spend" className="scroll-mt-24">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">Charts</div>
          <div className="text-sm text-muted-foreground">
            Spending breakdown, projected savings, and yearly comparison.
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="shadow-subtle">
          <CardHeader>
            <CardTitle className="text-base">Spending breakdown</CardTitle>
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
                    innerRadius="55%"
                    outerRadius="85%"
                    paddingAngle={2}
                  >
                    {spendData.map((_, i) => (
                      <Cell key={i} fill={palette[i % palette.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              Pie chart shows current monthly spend by tool.
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-subtle">
          <CardHeader>
            <CardTitle className="text-base">Projected monthly spend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yearly} margin={{ left: 8, right: 8 }}>
                  <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="4 4" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `$${v}`}
                    width={44}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="Current"
                    stroke={palette[0]}
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="Recommended"
                    stroke={palette[2]}
                    strokeWidth={2}
                    dot={false}
                  />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              A simple projection showing current vs recommended monthly spend.
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-subtle lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Current vs recommended by tool</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={compareData} margin={{ left: 8, right: 8 }}>
                  <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="4 4" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `$${v}`}
                    width={44}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend />
                  <Bar dataKey="Current" fill={palette[0]} radius={[8, 8, 0, 0]} />
                  <Bar
                    dataKey="Recommended"
                    fill={palette[2]}
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-subtle lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Yearly comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 lg:grid-cols-[1fr_280px] lg:items-center">
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={annualComparison} margin={{ left: 8, right: 8 }}>
                    <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="4 4" />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="value" fill={palette[1]} radius={[10, 10, 0, 0]}>
                      {annualComparison.map((_, i) => (
                        <Cell key={i} fill={palette[i % palette.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="rounded-2xl border bg-muted/30 p-4 text-sm text-muted-foreground">
                <div className="text-xs">Estimated annual savings</div>
                <div className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                  {formatUsd(results.totalAnnualSavingsUsd)}
                </div>
                <div className="mt-2 text-xs">
                  Based on current inputs and mock optimization rules.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
