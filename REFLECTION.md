# Reflections

## Hardest UI/Debugging Issue
The hardest issue was a subtle data transformation bug between the frontend and backend. The frontend was sending `{ name, plan, monthlySpend }` while the backend expected `{ toolId, planId, monthlySpendUsd }`. After fixing the request payload, the frontend crashed on the Report page because it was expecting the old data shape back from the API (`TypeError: Cannot read properties of undefined (reading 'toLowerCase')`). This resulted in a deceptive "Report not found" fallback UI. Tracking this down required closely tracing the data flow from `audit-form.tsx` -> backend -> `report.tsx`.

## TypeScript Learning
Strict typing on the API boundaries is non-negotiable. Implementing the `AuditRequest` and `ToolPayload` interfaces immediately caught our mapping issues.

## Responsive Design Challenges
Making complex charts and data tables look good on mobile required utilizing Tailwind's CSS grid (`grid-cols-1 md:grid-cols-2`) and horizontal scrolling for wide tables.

## React Architecture Decisions
We chose Zustand over Redux or React Context. Zustand allowed us to easily auto-save form state to `localStorage` without writing boilerplate context providers.

## AI Tool Usage Honesty
Used AI coding assistants heavily to scaffold the `shadcn/ui` components and debug the tricky frontend-to-backend payload mismatch. AI accurately pinpointed the frontend UI mapping crash.
