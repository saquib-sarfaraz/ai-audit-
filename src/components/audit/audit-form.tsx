import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Plus, Trash2 } from 'lucide-react'

import { supportedTools, type SupportedToolId } from '@/data/supported-tools'
import { toolById } from '@/data/tool-pricing'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { defaultAuditInput, useAuditStore } from '@/lib/stores/audit-store'
import {
  auditFormSchema,
  primaryUseCases,
  type AuditFormInput,
  type AuditFormValues,
} from '@/lib/validation/audit'
import { runMockAudit } from '@/utils/mock-audit'
import { formatUsd } from '@/utils/format'

const useCaseLabels: Record<(typeof primaryUseCases)[number], string> = {
  coding: 'Coding / IDE',
  research: 'Research',
  support: 'Support',
  content: 'Content',
  ops: 'Ops / Admin',
  other: 'Other',
}

function safeNumber(value: unknown) {
  const n = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(n) ? n : 0
}

function sumMonthly(values: { tools?: Array<{ monthlySpendUsd?: unknown } | undefined> } | undefined) {
  return (values?.tools ?? []).reduce((acc, t) => acc + (Number(t?.monthlySpendUsd) || 0), 0)
}

export function AuditForm() {
  const navigate = useNavigate()

  const storedInput = useAuditStore((s) => s.input)
  const setInput = useAuditStore((s) => s.setInput)
  const resetInput = useAuditStore((s) => s.resetInput)
  const setResults = useAuditStore((s) => s.setResults)

  const form = useForm<AuditFormValues, undefined, AuditFormInput>({
    resolver: zodResolver(auditFormSchema),
    mode: 'onChange',
    defaultValues: storedInput,
  })

  const toolsArray = useFieldArray({
    control: form.control,
    name: 'tools',
    keyName: 'keyId',
  })

  const values = useWatch({
    control: form.control,
    defaultValue: storedInput,
  })
  const watchedTools = values.tools ?? []
  const totalMonthly = sumMonthly(values)

  React.useEffect(() => {
    const parsed = auditFormSchema.safeParse(values)
    if (parsed.success) setInput(parsed.data)
  }, [setInput, values])

  const addTool = () => {
    const teamSize = safeNumber(values.teamSize)
    toolsArray.append({
      toolId: 'chatgpt',
      planId: toolById.get('chatgpt')?.defaultPlanId ?? 'team',
      monthlySpendUsd: 0,
      seats: Math.max(1, Math.floor(teamSize || 1)),
    })
  }

  const removeTool = (index: number) => toolsArray.remove(index)

  const onSubmit = (data: AuditFormInput) => {
    const results = runMockAudit(data)
    setResults(results)
    navigate('/results')
  }

  return (
    <form
      className="grid gap-6 lg:grid-cols-[1fr_360px]"
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
    >
      <Card className="shadow-subtle">
        <CardHeader>
          <CardTitle>AI Spend Audit</CardTitle>
          <p className="text-sm text-muted-foreground">
            Add your AI tools, seats, and monthly spend. Your progress is saved
            automatically.
          </p>
        </CardHeader>
        <CardContent className="grid gap-8">
          <div className="grid gap-4 md:grid-cols-2">
            <Controller
              name="teamSize"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="teamSize">Team size</FieldLabel>
                  <Input
                    id="teamSize"
                    inputMode="numeric"
                    type="number"
                    min={1}
                    step={1}
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                  <FieldDescription>
                    Used to right-size seats and plan tiers.
                  </FieldDescription>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            <Controller
              name="primaryUseCase"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Primary use case</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Select a use case" />
                    </SelectTrigger>
                    <SelectContent>
                      {primaryUseCases.map((k) => (
                        <SelectItem key={k} value={k}>
                          {useCaseLabels[k]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldDescription>
                    Helps tailor recommendations.
                  </FieldDescription>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </div>

          <Separator />

          <div className="grid gap-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold">Tools</div>
                <div className="text-sm text-muted-foreground">
                  Add as many tools as you want. Include API spend if relevant.
                </div>
              </div>
              <Button type="button" variant="outline" onClick={addTool}>
                <Plus /> Add tool
              </Button>
            </div>

            <div className="grid gap-4">
              {toolsArray.fields.map((f, index) => {
                const toolId = watchedTools[index]?.toolId ?? f.toolId
                const tool = toolById.get(toolId)
                const plans = tool?.plans ?? []
                const planHint =
                  tool?.category === 'api'
                    ? 'Usage-based'
                    : 'Seats-based estimate'

                return (
                  <Card key={f.keyId} className="p-4 shadow-subtle">
                    <div className="grid gap-4 md:grid-cols-12 md:items-end">
                      <div className="md:col-span-4">
                        <Controller
                          name={`tools.${index}.toolId`}
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field>
                              <FieldLabel>Tool</FieldLabel>
                              <Select
                                value={field.value}
                                onValueChange={(next) => {
                                  field.onChange(next)
                                  const nextTool = toolById.get(next as SupportedToolId)
                                  if (nextTool) {
                                    form.setValue(
                                      `tools.${index}.planId`,
                                      nextTool.defaultPlanId,
                                      { shouldValidate: true, shouldDirty: true }
                                    )
                                  }
                                }}
                              >
                                <SelectTrigger aria-invalid={fieldState.invalid}>
                                  <SelectValue placeholder="Select a tool" />
                                </SelectTrigger>
                                <SelectContent>
                                  {supportedTools.map((t) => (
                                    <SelectItem key={t.id} value={t.id}>
                                      {t.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FieldError errors={[fieldState.error]} />
                            </Field>
                          )}
                        />
                      </div>

                      <div className="md:col-span-4">
                        <Controller
                          name={`tools.${index}.planId`}
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field>
                              <FieldLabel>Plan</FieldLabel>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger aria-invalid={fieldState.invalid}>
                                  <SelectValue placeholder="Select a plan" />
                                </SelectTrigger>
                                <SelectContent>
                                  {plans.map((p) => (
                                    <SelectItem key={p.id} value={p.id}>
                                      {p.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FieldDescription>{planHint}</FieldDescription>
                              <FieldError errors={[fieldState.error]} />
                            </Field>
                          )}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Controller
                          name={`tools.${index}.seats`}
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field>
                              <FieldLabel>Seats</FieldLabel>
                              <Input
                                type="number"
                                inputMode="numeric"
                                min={1}
                                step={1}
                                aria-invalid={fieldState.invalid}
                                {...field}
                              />
                              <FieldError errors={[fieldState.error]} />
                            </Field>
                          )}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Controller
                          name={`tools.${index}.monthlySpendUsd`}
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field>
                              <FieldLabel>Monthly spend</FieldLabel>
                              <Input
                                type="number"
                                inputMode="decimal"
                                min={0}
                                step={0.01}
                                aria-invalid={fieldState.invalid}
                                {...field}
                              />
                              <FieldError errors={[fieldState.error]} />
                            </Field>
                          )}
                        />
                      </div>

                      <div className="md:col-span-12 flex items-center justify-between gap-3">
                        <div className="text-xs text-muted-foreground">
                          {tool ? (
                            <>
                              <span className="font-medium text-foreground">
                                {tool.name}
                              </span>{' '}
                              • {tool.category.toUpperCase()}
                            </>
                          ) : (
                            'Select a tool to see plan options.'
                          )}
                        </div>

                        <Button
                          type="button"
                          variant="ghost"
                          className="text-destructive hover:text-destructive"
                          onClick={() => removeTool(index)}
                          disabled={toolsArray.fields.length <= 1}
                        >
                          <Trash2 />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </div>
                  </Card>
                )
              })}

              {form.formState.errors.tools ? (
                <div className="text-xs font-medium text-destructive">
                  {form.formState.errors.tools.message}
                </div>
              ) : null}
            </div>
          </div>

          <Separator />

          <Controller
            name="notes"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Notes (optional)</FieldLabel>
                <Textarea
                  placeholder="e.g. We use ChatGPT for support tickets, Copilot for most engineers, and Claude for research…"
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                <FieldDescription>
                  Anything that may influence recommendations (workflow, compliance, etc.)
                </FieldDescription>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetInput()
                form.reset(defaultAuditInput)
              }}
            >
              Reset to example
            </Button>
            <Button type="submit" size="lg">
              View results
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        <Card className="shadow-subtle">
          <CardHeader>
            <CardTitle className="text-base">Current snapshot</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="rounded-2xl border bg-muted/30 p-4">
              <div className="text-xs text-muted-foreground">Total monthly spend</div>
              <div className="mt-1 text-2xl font-semibold tracking-tight">
                {formatUsd(totalMonthly)}
              </div>
            </div>
            <div className="grid gap-2 text-sm text-muted-foreground">
              <div>• Inline validation with Zod</div>
              <div>• Auto-saved to localStorage</div>
              <div>• Results dashboard with charts</div>
              <div>• Shareable report route</div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-subtle">
          <CardHeader>
            <CardTitle className="text-base">What you’ll get</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm text-muted-foreground">
            <div>• Overspending signals and duplicate coverage</div>
            <div>• Plan downgrade opportunities</div>
            <div>• Alternative tools and consolidation ideas</div>
            <div>• Estimated monthly and annual savings</div>
          </CardContent>
        </Card>
      </div>
    </form>
  )
}
